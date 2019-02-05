import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { hideModal } from '../../../redux/actions/modal';
import socket from '../../../socket/socketClient';
import { fileInpLabel, fileTypeError, fileSizeError, submitBtnLabel } from './newMap.i18n';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './newMap.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { global: state.global };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    hideModal: ()         => dispatch(hideModal())
  };
};


class NewMap extends Component {
  constructor (props){
    super(props);
    this.state = {
      submitted:     false,
      src:           '',
      name:          '',
      privacy:       [],
      fileExist:     false,
      fileSizeError: false,
      fileTypeError: false,
    };
  }


  render() {
    return (
      <div className="d-flex f-dir-col f-grow-1">

        <div className="f-grow-1 font-size-lg">
          <div>{fileInpLabel[this.props.global.lang]}:</div>
          <label class="inp-file-cont d-flex w-100 cursor-pointer">
            <FontAwesomeIcon icon="upload"/>
            <div className="inp-file-text f-grow-1 pl-3">Choose an image...</div>
            <input id="imageInput" className="d-none" type="file" accept="image/*" ref={this.fileInput} onChange={this.handleFileChange}/>
          </label>
          {this.state.fileTypeError
            ? (<div className="text-danger">{fileTypeError[this.props.global.lang]}</div>)
            : null}
          {this.state.fileSizeError
            ? (<div className="text-danger">{fileSizeError[this.props.global.lang]}</div>)
            : null}
        </div>

        <button type="button" className="btn btn-hot w-100 cursor-pointer f-shrink-0 f-align-self-end">
          <FontAwesomeIcon icon="check"/>
          <div className="btn-text">{submitBtnLabel[this.props.global.lang]}</div>
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMap);
