import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { hideModal } from '../../../redux/actions/modal';
import { addMap } from '../../../redux/actions/map';
import { addGeo } from '../../../redux/actions/geo';
import socket from '../../../socket/socketClient';
import { fileInpLabel, fileTypeError, fileContError, submitBtnLabel } from './importMap.i18n';
import jszip from 'jszip';


// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './importMap.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { global: state.global };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    addMap:    (mapData) => dispatch(addMap(mapData)),
    addGeo:    (geoData) => dispatch(addGeo(geoData)),
    hideModal: ()        => dispatch(hideModal())
  };
};


class ImportMap extends Component {
  constructor (props){
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      submitted:     false,
      fileExist:     false,
      fileTypeError: false,
      fileContError: false,
      fileName:      '',
      isDragOver:    false,
      mapData:       null,
      geoData:       null
    };

    this.handleFile        = this.handleFile.bind(this);
    this.handleFileChange  = this.handleFileChange.bind(this);
    this.handleDrop        = this.handleDrop.bind(this);
    this.handleDragOver    = this.handleDragOver.bind(this);
    this.handleDragLeave   = this.handleDragLeave.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.validateMapData   = this.validateMapData.bind(this);
  }

  handleFileChange (e){
    e.preventDefault();

    this.handleFile(this.fileInput.current.files[0]);
  }

  handleDragOver (e){
    e.preventDefault();
    e.stopPropagation();

    if (!this.state.isDragOver){
      this.setState({ isDragOver: true });
    }
  }

  handleDragLeave (e){
    e.preventDefault();
    e.stopPropagation();

    this.setState({ isDragOver: false });
  }

  handleDrop (e){
    e.preventDefault();
    e.stopPropagation();

    this.setState({ isDragOver: false });
    if (e.dataTransfer.items){
      for (let file of e.dataTransfer.items){
        if (file.kind === 'file' && file.type === 'application/x-zip-compressed'){
          this.handleFile(file.getAsFile());
          break;
        }
      }
    }
  }

  handleFile (zipFile){
    jszip
      .loadAsync(zipFile)
      .then(content => {
        const file = content.files[Object.keys(content.files)[0]];
        this.setState({
          fileExist: file.name.length !== 0,
          fileTypeError: !/\.json$/i.test(file.name),
          fileName: zipFile.name
        })
        return file.async('string')
      })
      .then(data => {
        this.setState({
          fileContError: !this.validateMapData(data)
        }, () => {
          if (!this.state.fileTypeError && !this.state.fileContError){
            const mapData = JSON.parse(data).mapData;
            const geoData = JSON.parse(data).geoList;
            this.setState({ mapData, geoData });
          } else {
            this.setState({ mapData: null, geoData: null });
          }
        });
      })
      .catch(() => {
        this.setState({ fileTypeError: true })
      })
  }

  validateMapData (objStr){
    try {
      var data = JSON.parse(objStr)
    } catch (err){
      return false;
    }

    if (!(data.hasOwnProperty('mapData') && typeof data['mapData'] === 'object')){
      return false;
    }

    if (!(data.mapData.hasOwnProperty('ownerId') && typeof data.mapData['ownerId'] === 'string')){
      return false;
    }

    if (!(data.mapData.hasOwnProperty('mapId') && typeof data.mapData['mapId'] === 'string')){
      return false;
    }

    if (!(data.mapData.hasOwnProperty('src') && typeof data.mapData['src'] === 'string')){
      return false;
    }

    if (!(data.mapData.hasOwnProperty('name') && typeof data.mapData['name'] === 'string')){
      return false;
    }

    if (!(data.mapData.hasOwnProperty('fileName') && typeof data.mapData['fileName'] === 'string')){
      return false;
    }

    if (!(data.mapData.hasOwnProperty('private') && typeof data.mapData['private'] === 'boolean')){
      return false;
    }

    if (!(data.hasOwnProperty('geoList') && data['geoList'].constructor === Array)){
      return false;
    }

    return true
  }

  handleSubmitClick (e){
    if (!this.state.submitted){
      this.setState({ submitted: true });

      const mapData = {
        ...this.state.mapData,
        mapId:  uuid.v4(),
        ownerId: this.props.global.id,
      };

      this.props.addMap(mapData);
      this.state.geoData.forEach(geo => {
        this.props.addGeo({ ...geo, mapId: mapData.mapId });
      });

      if (!mapData.private){
        socket.emit('note', this.props.global.roomId, mapData);
        this.state.geoData.forEach(geo => {
          socket.emit('geo', this.props.global.roomId, { ...geo, mapId: mapData.mapId });
        })
      }

      this.props.hideModal();
    }
  }

  render() {
    const dragOverClass = this.state.isDragOver ? 'is-dragover' : '';
    const isDisabled    = !this.state.fileExist || this.state.fileTypeError || this.state.fileContError || this.state.submitted;

    return (
      <div className="d-flex f-dir-col f-grow-1">
        <div className="d-flex f-dir-col f-grow-1 font-size-lg">
          <div>{fileInpLabel[this.props.global.lang]}:</div>
          <label class={`inp-file-cont d-flex w-100 cursor-pointer ${dragOverClass}`} onDragOver={this.handleDragOver} onDragLeave={this.handleDragLeave} onDrop={this.handleDrop}>
            <FontAwesomeIcon icon="upload"/>
            <div className="one-line-ellipsis f-grow-1 pl-3">{this.state.fileName.length === 0 ? 'Choose or Drag a Map File...' : this.state.fileName}</div>
            <input id="imageInput" className="d-none" type="file" accept=".zip" ref={this.fileInput} onChange={this.handleFileChange}/>
          </label>
          {this.state.fileTypeError && (<div className="text-danger">{fileTypeError[this.props.global.lang]}</div>)}
          {this.state.fileContError && (<div className="text-danger">{fileContError[this.props.global.lang]}</div>)}

          { this.state.mapData !== null
            && (
              <div className="f-grow-1 d-flex f-dir-col p-1">
                <div className="map-preview f-grow-1" style={{ backgroundImage: `url(${this.state.mapData.src})` }}>
                </div>
              </div>
          )}
        </div>

        <button className="btn btn-hot cursor-pointer" disabled={isDisabled} onClick={this.handleSubmitClick}>
          <FontAwesomeIcon icon="check"/>
          <div className="btn-text">{submitBtnLabel[this.props.global.lang]}</div>
        </button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportMap);
