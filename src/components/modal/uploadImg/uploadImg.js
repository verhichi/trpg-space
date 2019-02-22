import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CHAT_TYPE_IMAGE } from '../../../constants/constants';
import { addChat } from '../../../redux/actions/chatLog';
import { hideModal } from '../../../redux/actions/modal';
import socket from '../../../socket/socketClient';
import { fileInpLabel, fileTypeError, fileSizeError, submitBtnLabel } from './uploadImg.i18n';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './uploadImg.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    global:       state.global,
    userList:     state.userList,
    modalSetting: state.modalSetting
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    hideModal: ()        => dispatch(hideModal()),
    addChat:   (content) => dispatch(addChat(content))
  };
};


class UploadImg extends Component {
  constructor (props){
    super(props);
    this.state = {
      submitted:     false,
      fileExist:     false,
      fileSizeError: false,
      fileTypeError: false,
      fileName:      '',
      src:           '',
      height:        0,
      width:         0
    };

    this.fileInput         = React.createRef();
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleFileChange  = this.handleFileChange.bind(this);
  }

  handleButtonClick (e){
    if (!this.state.submitted){
      this.setState({ submitted: true });

      const name = this.props.userList.find((user) => this.props.global.id === user.id).name;
      const imgData = {
        type: CHAT_TYPE_IMAGE,
        src: this.state.src,
        height: this.state.height,
        width: this.state.width,
        name
      };

      this.props.addChat({ ...imgData, self: true });
      socket.emit('chat', this.props.global.roomId, { ...imgData, self: false });

      this.props.hideModal();
    }
  }

  handleFileChange (e){
    e.preventDefault();
    const imagePattern = /\.(jpg|jpeg|png|gif)$/i;
    const file = this.fileInput.current.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.fileInput.current.files[0]);

    reader.onload = () => {
      this.setState({
        fileExist:     file.name.length !== 0,
        fileTypeError: !imagePattern.test(file.name),
        fileSizeError: file.size > 1000000,
        fileName:      file.name
      });

      const image = new Image();
      image.onload = () => {
        this.setState({
          src:    reader.result,
          height: image.height,
          width:  image.width,
        });
      };
      image.src = reader.result;
    }
  }

  render() {
    const isDisabled = !this.state.fileExist || this.state.fileTypeError || this.state.fileSizeError || this.state.submitted;

    return (
      <div className="d-flex f-dir-col f-grow-1">
        <div className="f-grow-1 font-size-lg">
          <div>{fileInpLabel[this.props.global.lang]}:</div>
          <label class="inp-file-cont d-flex w-100 cursor-pointer">
            <FontAwesomeIcon icon="upload"/>
            <div className="inp-file-text f-grow-1 pl-3">{this.state.fileName.length === 0 ? 'Choose an image...' : this.state.fileName}</div>
            <input id="imageInput" className="d-none" type="file" accept="image/*" ref={this.fileInput} onChange={this.handleFileChange}/>
          </label>
          {this.state.fileTypeError
            ? (<div className="text-danger">{fileTypeError[this.props.global.lang]}</div>)
            : null}
          {this.state.fileSizeError
            ? (<div className="text-danger">{fileSizeError[this.props.global.lang]}</div>)
            : null}
        </div>
        <button className="btn btn-hot cursor-pointer" disabled={isDisabled} onClick={this.handleButtonClick}>
          <FontAwesomeIcon icon="check"/>
          <div className="btn-text">{submitBtnLabel[this.props.global.lang]}</div>
        </button>
      </div>
    );
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(UploadImg);
