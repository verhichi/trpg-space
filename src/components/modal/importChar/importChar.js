import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { hideModal } from '../../../redux/actions/modal';
import { addChar } from '../../../redux/actions/char';
import socket from '../../../socket/socketClient';
import { fileInpLabel, fileTypeError, submitBtnLabel } from './importChar.i18n';

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
      fileName:      '',
      src:           '',
      isDragOver:    false,
      charData:      null
    };
  }



  render() {
    const dragOverClass = this.state.isDragOver ? 'is-dragover' : '';
    const isDisabled    = !this.state.fileExist || this.state.fileTypeError || this.state.submitted;

    return (
      <div className="d-flex f-dir-col f-grow-1">
        <div className="f-grow-1 font-size-lg">
          <div>{fileInpLabel[this.props.global.lang]}:</div>
          <label class={`inp-file-cont d-flex w-100 cursor-pointer ${dragOverClass}`} onDragOver={this.handleDragOver} onDragLeave={this.handleDragLeave} onDrop={this.handleDrop}>
            <FontAwesomeIcon icon="upload"/>
            <div className="one-line-ellipsis f-grow-1 pl-3">{this.state.fileName.length === 0 ? 'Choose or Drag a Character File...' : this.state.fileName}</div>
            <input id="imageInput" className="d-none" type="file" accept="image/*" ref={this.fileInput} onChange={this.handleFileChange}/>
          </label>
          {this.state.fileTypeError
            ? (<div className="text-danger">{fileTypeError[this.props.global.lang]}</div>)
            : null}
        </div>
        <button className="btn btn-hot cursor-pointer" disabled={isDisabled} onClick={this.handleButtonClick}>
          <FontAwesomeIcon icon="check"/>
          <div className="btn-text">{submitBtnLabel[this.props.global.lang]}</div>
        </button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportChar);
