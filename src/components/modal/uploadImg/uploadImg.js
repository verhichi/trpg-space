import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../../redux/actions/action';
import socket from '../../../socket/socketClient';


// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './uploadImg.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    id:           state.id,
    roomId:       state.roomId,
    userList:     state.userList,
    modalSetting: state.modalSetting
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return { hideModal: () => dispatch(hideModal()) };
};


class UploadImg extends Component {
  constructor (props){
    super(props);

    this.state = {
      fileExist: false,
      fileSizeError: false,
      fileTypeError: false
    };

    this.fileInput = React.createRef();
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  handleButtonClick (e){
    e.preventDefault();

    const reader = new FileReader();
    reader.readAsDataURL(this.fileInput.current.files[0]);

    // reader.onload = function () {
    //  console.log(reader.result);
    // };

    reader.onload = () => {
      const name = this.props.userList.find((user) => this.props.id === user.id).name;

      const now = new Date();
      const hour = now.getHours().toString().padStart(2, '0');
      const min = now.getMinutes().toString().padStart(2, '0');
      const time = `${hour}:${min}`;

      socket.emit('chat', this.props.roomId, {
        type: 'image',
        src: reader.result,
        name,
        time
      });

      this.props.hideModal();
    };
  }

  handleFileChange (e){
    e.preventDefault();
    const imagePattern = /\.(jpg|jpeg|png|gif)$/i;
    const file = this.fileInput.current.files[0];
    this.setState({
      fileExist: file.name.length !== 0,
      fileTypeError: !imagePattern.test(file.name),
      fileSizeError: file.size > 2000000
    });
  }

  render() {
    const isDisabled = !this.state.fileExist || this.state.fileTypeError || this.state.fileSizeError;

    return (
      <div className="d-flex f-dir-col f-grow-1">
        <div className="f-grow-1 font-size-lg">
          <div>Select an image to send:</div>
          <label class="inp-file-cont d-flex w-100 cursor-pointer">
            <FontAwesomeIcon icon="upload"/>
            <div className="inp-file-text f-grow-1 pl-3">{this.fileInput.current ? this.fileInput.current.files[0].name : 'Choose an image...'}</div>
            <input id="imageInput" className="d-none" type="file" accept="image/*" ref={this.fileInput} onChange={this.handleFileChange}/>
          </label>
        </div>
        {this.state.fileTypeError
          ? (<div className="text-danger">File must be in jpg/png/gif format</div>)
          : null}
        {this.state.fileSizeError
          ? (<div className="text-danger">File must be smaller than 2MB</div>)
          : null}
        <button className="btn btn-hot cursor-pointer" disabled={isDisabled} onClick={this.handleButtonClick}>
          <FontAwesomeIcon icon="check"/>
          <div className="btn-text">Submit</div>
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadImg);
