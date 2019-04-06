import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { hideModal } from '../../../redux/actions/modal';
import { addChar } from '../../../redux/actions/char';
import socket from '../../../socket/socketClient';
import { CHAR_PRIVACY_LEVEL_THREE } from '../../../constants/constants';
import { fileInpLabel, fileTypeError, fileContError, submitBtnLabel } from './importChar.i18n';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './importChar.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { global: state.global };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    addChar:   (charData) => dispatch(addChar(charData)),
    hideModal: ()         => dispatch(hideModal())
  };
};


class ImportChar extends Component {
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
      charData:      null
    };

    this.handleFile        = this.handleFile.bind(this);
    this.handleFileChange  = this.handleFileChange.bind(this);
    this.handleDrop        = this.handleDrop.bind(this);
    this.handleDragOver    = this.handleDragOver.bind(this);
    this.handleDragLeave   = this.handleDragLeave.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.validateCharData  = this.validateCharData.bind(this);
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
        if (file.kind === 'file' && file.type === 'application/json'){
          this.handleFile(file.getAsFile());
          break;
        }
      }
    }
  }

  handleFile (file){
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      const fileTypePattern = /\.json$/i;
      this.setState({
        fileExist: file.name.length !== 0,
        fileTypeError: !fileTypePattern.test(file.name),
        fileContError: !this.validateCharData(reader.result),
        fileName: file.name
      }, () => {
        if (!this.state.fileTypeError && !this.state.fileContError){
          this.setState({ charData: JSON.parse(reader.result) });
        }
      });
    }
  }

  validateCharData (objStr){
    try {
      var charData = JSON.parse(objStr)
    } catch (err){
      return false;
    }

    if (!(charData.hasOwnProperty('charId') && typeof charData['charId'] === 'string')){
      return false;
    }

    if (!(charData.hasOwnProperty('ownerId') && typeof charData['ownerId'] === 'string')){
      return false;
    }

    if (!(charData.hasOwnProperty('general') && typeof charData['general'] === 'object')){
      return false;
    }

    if (!(charData.hasOwnProperty('status') && charData['status'].constructor === Array)){
      return false;
    }

    if (!(charData.hasOwnProperty('detail') && charData['detail'].constructor === Array)){
      return false;
    }

    return true
  }

  handleSubmitClick (e){
    if (!this.state.submitted){
      this.setState({ submitted: true });

      const charData = {
        ...this.state.charData,
        charId:  uuid.v4(),
        ownerId: this.props.global.id,
      };

      this.props.addChar(charData);

      if (this.state.charData.general.privacy !== CHAR_PRIVACY_LEVEL_THREE){
        socket.emit('char', this.props.global.roomId, charData);
      }

      this.props.hideModal();
    }
  }

  render() {
    const dragOverClass = this.state.isDragOver ? 'is-dragover' : '';
    const isDisabled    = !this.state.fileExist || this.state.fileTypeError || this.state.fileContError || this.state.submitted;

    return (
      <div className="d-flex f-dir-col f-grow-1">
        <div className="f-grow-1 font-size-lg">
          <div>{fileInpLabel[this.props.global.lang]}:</div>
          <label class={`inp-file-cont d-flex w-100 cursor-pointer ${dragOverClass}`} onDragOver={this.handleDragOver} onDragLeave={this.handleDragLeave} onDrop={this.handleDrop}>
            <FontAwesomeIcon icon="upload"/>
            <div className="one-line-ellipsis f-grow-1 pl-3">{this.state.fileName.length === 0 ? 'Choose or Drag a Character File...' : this.state.fileName}</div>
            <input id="imageInput" className="d-none" type="file" accept=".json" ref={this.fileInput} onChange={this.handleFileChange}/>
          </label>
          {this.state.fileTypeError && (<div className="text-danger">{fileTypeError[this.props.global.lang]}</div>)}
          {this.state.fileContError && (<div className="text-danger">{fileContError[this.props.global.lang]}</div>)}
        </div>
        <button className="btn btn-hot cursor-pointer" disabled={isDisabled} onClick={this.handleSubmitClick}>
          <FontAwesomeIcon icon="check"/>
          <div className="btn-text">{submitBtnLabel[this.props.global.lang]}</div>
        </button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportChar);
