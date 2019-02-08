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
    mapSetting:   state.mapSetting,
    modalSetting: state.modalSetting,
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
    this.previousMapData = this.props.mapSetting.find(mapData => this.props.modalSetting.modalProp.mapId === mapData.mapId);
    this.state = {
      submitted:     false,
      src:           this.previousMapData.src,
      name:          this.previousMapData.name,
      shareWithAll:  this.previousMapData.shareWithAll,
      fileExist:     true,
      fileSizeError: false,
      fileTypeError: false,
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
    this.state.shareWithAll
      ? this.setState({ shareWithAll: false })
      : this.setState({ shareWithAll: true  });
  }

  handleFileChange (e){
    e.preventDefault();
    const imagePattern = /\.(jpg|jpeg|png|gif)$/i;
    const file = this.fileInput.current.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.fileInput.current.files[0]);

    reader.onload = () => {
      this.setState({
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
        mapId:        this.props.modalSetting.modalProp.mapId,
        ownerId:      this.props.global.id,
        src:          this.state.src,
        name:         this.state.name.trim(),
        shareWithAll: this.state.shareWithAll,
      };

      this.props.editMap(mapData);

      if (!this.state.shareWithAll){
        socket.emit('delMap', this.props.global.roomId, this.props.modalSetting.modalProp.mapId);
      } else {
        socket.emit('map', this.props.global.roomId, mapData);

        if (!this.previousMapData.shareWithAll){
          this.previousMapData.charDots.forEach(charDot => {
            if (charDot.privacy !== CHAR_PRIVACY_LEVEL_THREE){
              socket.emit('mapChar', this.props.global.roomId, this.props.modalSetting.modalProp.mapId, charDot);
            }
          });
        }
      }
    }

    this.props.hideModal();
  }


  render() {
    const isDisabled = !this.state.fileExist || this.state.fileTypeError || this.state.fileSizeError || this.state.name.trim().length === 0 || this.state.submitted;

    return (
      <div className="d-flex f-dir-col f-grow-1">

        <div className="d-flex f-dir-col f-grow-1">
          <div className="font-size-lg mb-2">
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

          <div className="mb-2 d-flex">
            <div className="char-inp-label pr-1">{mapNameLabel[this.props.global.lang]}:</div>
            <input className="inp f-grow-1" type="text" value={this.state.name} onChange={this.handleNameChange}/>
          </div>

          <div className="mb-2 d-flex">
            <div className="map-user one-line-ellipsis"><label><input type="checkbox" checked={this.state.shareWithAll} onChange={this.handleAllCheckChange}/>{mapPrivacyLabel[this.props.global.lang]}</label></div>
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
