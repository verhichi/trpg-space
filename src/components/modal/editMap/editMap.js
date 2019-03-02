import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CHAR_PRIVACY_LEVEL_THREE } from '../../../constants/constants';
import { hideModal } from '../../../redux/actions/modal';
import { editMap } from '../../../redux/actions/map';
import socket from '../../../socket/socketClient';
import { fileInpLabel, mapNameLabel, mapPrivacyLabel, fileTypeError, fileSizeError, submitBtnLabel } from './editMap.i18n';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './editMap.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    global:       state.global,
    charList:     state.charList,
    geoList:      state.geoList,
    mapList:      state.mapList,
    modalSetting: state.modalSetting,
    mapCharList:  state.mapCharList,
    userList:     state.userList
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    editMap:   (mapData) => dispatch(editMap(mapData)),
    hideModal: ()        => dispatch(hideModal())
  };
};


class EditMap extends Component {
  constructor (props){
    super(props);
    this.previousMapData = this.props.mapList.find(mapData => this.props.modalSetting.modalProp.mapId === mapData.mapId);
    this.state = {
      submitted:     false,
      src:           this.previousMapData.src,
      name:          this.previousMapData.name,
      private:       this.previousMapData.private,
      fileName:      this.previousMapData.fileName,
      fileExist:     true,
      fileSizeError: false,
      fileTypeError: false,
      isDragOver:    false
    };

    this.fileInput             = React.createRef();
    this.handleNameChange      = this.handleNameChange.bind(this);
    this.handleAllCheckChange  = this.handleAllCheckChange.bind(this);
    this.handleFileChange      = this.handleFileChange.bind(this);
    this.handleButtonClick     = this.handleButtonClick.bind(this);
  }

  handleNameChange (e){
    this.setState({ name: e.target.value });
  }

  handleAllCheckChange (e){
    this.setState({ private: !this.state.private });
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
      const imageTypePattern = /^image\//;
      for (let file of e.dataTransfer.items){
        if (file.kind === 'file' && imageTypePattern.test(file.type)){
          this.handleFile(file.getAsFile());
          break;
        }
      }
    }
  }

  handleFile (file){
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const imagePattern = /\.(jpg|jpeg|png|gif)$/i;

      this.setState({
        fileName:      file.name,
        fileTypeError: !imagePattern.test(file.name),
        fileSizeError: file.size > 1000000,
      }, () => {
        if (!this.state.fileTypeError || !this.state.fileSizeError){
          this.setState({
            fileExist: true,
            src:       reader.result
          });
        }
      });
    }
  }

  handleButtonClick (e){
    if (!this.state.submitted){
      this.setState({ submitted: true });

      const mapData = {
        mapId:    this.props.modalSetting.modalProp.mapId,
        ownerId:  this.props.global.id,
        src:      this.state.src,
        name:     this.state.name.trim(),
        fileName: this.state.fileName,
        private:  this.state.private,
      };

      this.props.editMap(mapData);

      if (this.state.private){
        socket.emit('delMap', this.props.global.roomId, this.props.modalSetting.modalProp.mapId);
      } else {
        socket.emit('map', this.props.global.roomId, mapData);

        if (this.previousMapData.private){
          this.props.geoList.forEach(geo => {
            if (geo.mapId === this.props.modalSetting.modalProp.mapId){
              socket.emit('geo', this.props.global.roomId, geo);
            }
          });

          this.props.mapCharList.forEach(mapChar => {
            if (mapChar.mapId === this.props.modalSetting.modalProp.mapId && this.props.charList.find(char => char.charId === mapChar.charId).general.privacy !== CHAR_PRIVACY_LEVEL_THREE){
              socket.emit('mapChar', this.props.global.roomId, mapChar);
            }
          });
        }
      }
    }

    this.props.hideModal();
  }


  render() {
    const dragOverClass = this.state.isDragOver ? 'is-dragover' : '';
    const isDisabled    = !this.state.fileExist || this.state.fileTypeError || this.state.fileSizeError || this.state.name.trim().length === 0 || this.state.submitted;

    return (
      <div className="d-flex f-dir-col f-grow-1">

        <div className="d-flex f-dir-col f-grow-1">
          <div className="font-size-lg mb-2">
            <div>{fileInpLabel[this.props.global.lang]}:</div>
            <label class={`inp-file-cont d-flex w-100 cursor-pointer ${dragOverClass}`}  onDragOver={this.handleDragOver} onDragLeave={this.handleDragLeave} onDrop={this.handleDrop}>
              <FontAwesomeIcon icon="upload"/>
              <div className="one-line-ellipsis f-grow-1 pl-3">{this.state.fileName.length === 0 ? 'Choose or Drag an image...' : this.state.fileName}</div>
              <input id="imageInput" className="d-none" type="file" accept="image/*" ref={this.fileInput} onChange={this.handleFileChange}/>
            </label>
            {this.state.fileTypeError
              ? (<div className="text-danger">{fileTypeError[this.props.global.lang]}</div>)
              : null}
            {this.state.fileSizeError
              ? (<div className="text-danger">{fileSizeError[this.props.global.lang]}</div>)
              : null}
          </div>

          <div className="mb-2 d-flex">
            <div className="char-inp-label pr-1">{mapNameLabel[this.props.global.lang]}:</div>
            <input className="inp f-grow-1" type="text" value={this.state.name} onChange={this.handleNameChange}/>
          </div>

          <div className="mb-2 d-flex">
            <div className="map-user one-line-ellipsis"><label><input type="checkbox" checked={!this.state.private} onChange={this.handleAllCheckChange}/>{mapPrivacyLabel[this.props.global.lang]}</label></div>
          </div>
        </div>

        <button type="button" className="btn btn-hot w-100 cursor-pointer f-shrink-0 f-align-self-end" disabled={isDisabled} onClick={this.handleButtonClick}>
          <FontAwesomeIcon icon="check"/>
          <div className="btn-text">{submitBtnLabel[this.props.global.lang]}</div>
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMap);
