import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { hideModal } from '../../../redux/actions/modal';
import { addMap } from '../../../redux/actions/map';
import { setDisplayMap } from '../../../redux/actions/display';
import socket from '../../../socket/socketClient';
import { fileInpLabel, mapNameLabel, mapPrivacyLabel, fileTypeError, fileSizeError, submitBtnLabel } from './newMap.i18n';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './newMap.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    global:   state.global,
    userList: state.userList
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    addMap:        (mapData) => dispatch(addMap(mapData)),
    hideModal:     ()        => dispatch(hideModal()),
    setDisplayMap: (mapId)   => dispatch(setDisplayMap(mapId))
  };
};


class NewMap extends Component {
  constructor (props){
    super(props);
    this.state = {
      submitted:     false,
      src:           '',
      name:          '',
      private:       false,
      fileName:      '',
      fileExist:     false,
      fileSizeError: false,
      fileTypeError: false,
      isDragOver:    false
    };

    this.fileInput            = React.createRef();
    this.handleNameChange     = this.handleNameChange.bind(this);
    this.handleAllCheckChange = this.handleAllCheckChange.bind(this);
    this.handleFileChange     = this.handleFileChange.bind(this);
    this.handleButtonClick    = this.handleButtonClick.bind(this);
    this.handleDrop           = this.handleDrop.bind(this);
    this.handleDragOver       = this.handleDragOver.bind(this);
    this.handleDragLeave      = this.handleDragLeave.bind(this);
    this.handleFile           = this.handleFile.bind(this);
  }

  handleNameChange (e){
    this.setState({ name: e.target.value });
  }

  handleAllCheckChange (e){
    this.state.private
      ? this.setState({ private: false })
      : this.setState({ private: true  });
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
        mapId:    uuid.v4(),
        ownerId:  this.props.global.id,
        src:      this.state.src,
        name:     this.state.name.trim(),
        fileName: this.state.fileName,
        private:  this.state.private
      };

      this.props.addMap(mapData);
      this.props.setDisplayMap(mapData.mapId);

      if (!this.state.private){
        socket.emit('map', this.props.global.roomId, mapData);
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

export default connect(mapStateToProps, mapDispatchToProps)(NewMap);
