import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { addAudio } from '../../../redux/actions/audio';
import { hideModal } from '../../../redux/actions/modal';
import { fileInpLabel, audioTitleInpLabel, fileTypeError, fileSizeError, submitBtnLabel, audioTypeLabel, audioTypeSe, audioTypeBgm } from './newAudio.i18n';
import { AUDIO_TYPE_BGM, AUDIO_TYPE_SE } from '../../../constants/constants';
import socket from '../../../socket/socketClient';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import AppRadio from '../../partials/appRadio/appRadio'

// Style
import './newAudio.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    global:       state.global,
    audioList:    state.audioList,
    modalSetting: state.modalSetting
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    hideModal: ()          => dispatch(hideModal()),
    addAudio:  (audioData) => dispatch(addAudio(audioData))
  };
};


class NewAudio extends Component {
  constructor (props){
    super(props);
    this.audioRef = React.createRef();
    this.state = {
      submitted:     false,
      type:          AUDIO_TYPE_BGM,
      fileExist:     false,
      fileSizeError: false,
      fileTypeError: false,
      fileName:      '',
      src:           '',
      title:         '',
      duration:      0,
      isDragOver:    false,
      isLoading:     false
    };

    this.fileInput         = React.createRef();
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleFileChange  = this.handleFileChange.bind(this);
    this.handleDrop        = this.handleDrop.bind(this);
    this.handleDragOver    = this.handleDragOver.bind(this);
    this.handleDragLeave   = this.handleDragLeave.bind(this);
    this.handleFile        = this.handleFile.bind(this);
    this.handleTypeChange  = this.handleTypeChange.bind(this);
  }

  componentDidMount () {
    this.audioRef.current.addEventListener('loadedmetadata', (e) => {
      e.stopPropagation();
      this.setState({ duration: Math.floor(this.audioRef.current.duration) })
    })
  }

  handleTitleChange (e) {
    this.setState({ title: e.target.value });
  }

  handleTypeChange (e) {
    this.setState({ type: e.target.value });
  }

  handleButtonClick (e){
    if (!this.state.submitted){
      this.setState({ submitted: true });

      const audioData = {
        audioId: uuid.v4(),
        ownerId: this.props.global.id,
        title: this.state.title,
        type: this.state.type,
        src: this.state.src,
        duration: this.state.duration
      };

      this.props.addAudio(audioData);
      socket.emit('audio', this.props.global.roomId, audioData);
      this.props.hideModal();
    }
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
      // const fileTypePattern = /^image\//;
      for (let file of e.dataTransfer.items){
        // if (file.kind === 'file' && imageTypePattern.test(file.type)){
        if (file.kind === 'file'){
          this.handleFile(file.getAsFile());
          break;
        }
      }
    }
  }

  handleFile (file){
    this.setState({ isLoading: true });
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const filePattern = /\.(mp3|wav|pcm|flac|alac)$/i;
      this.audioRef.current.src = reader.result

      this.setState({
        fileExist:     file.name.length !== 0,
        fileTypeError: !filePattern.test(file.name),
        fileSizeError: file.size > 5000000,
        fileName:      file.name,
        src:           reader.result,
        isLoading:     false
      });
    }
  }

  render() {
    const dragOverClass = this.state.isDragOver ? 'is-dragover' : '';
    const isDisabled    = this.isLoading || !this.state.title.length || !this.state.fileExist || this.state.fileTypeError || this.state.fileSizeError || this.state.submitted;

    return (
      <div className="d-flex f-dir-col f-grow-1">
        <div className="mb-2 d-flex">
          <div className="char-inp-label pr-1">{audioTypeLabel[this.props.global.lang]}:</div>
          <AppRadio id={AUDIO_TYPE_BGM} className={'mr-1'} value={AUDIO_TYPE_BGM} checked={this.state.type === AUDIO_TYPE_BGM} handleChange={this.handleTypeChange} label={audioTypeBgm[this.props.global.lang]}/>
          <AppRadio id={AUDIO_TYPE_SE} value={AUDIO_TYPE_SE} checked={this.state.type === AUDIO_TYPE_SE} handleChange={this.handleTypeChange} label={audioTypeSe[this.props.global.lang]}/>
        </div>
        <div className="mb-2 font-size-lg">
          <div>{audioTitleInpLabel[this.props.global.lang]}</div>
          <input className="inp w-100" type="text" placeholder="Enter audio title..." value={this.state.title} onChange={this.handleTitleChange} />
        </div>
        <div className="f-grow-1 font-size-lg">
          <div>{fileInpLabel[this.props.global.lang]}:</div>
          <label class={`inp-file-cont d-flex w-100 cursor-pointer ${dragOverClass}`} onDragOver={this.handleDragOver} onDragLeave={this.handleDragLeave} onDrop={this.handleDrop}>
            <FontAwesomeIcon icon="upload"/>
            <div className="one-line-ellipsis f-grow-1 pl-3">
              {this.state.isLoading ? (<div className="spinner-sm"></div>) : this.state.fileName.length === 0 ? 'Choose or Drag an image...' : this.state.fileName}
            </div>
            <input id="imageInput" className="d-none" type="file" ref={this.fileInput} onChange={this.handleFileChange}/>
          </label>
          {this.state.fileTypeError
            ? (<div className="text-danger">{fileTypeError[this.props.global.lang]}</div>)
            : null}
          {this.state.fileSizeError
            ? (<div className="text-danger">{fileSizeError[this.props.global.lang]}</div>)
            : null}
        </div>
        <button className="btn btn-hot cursor-pointer" disabled={isDisabled} onClick={this.handleButtonClick}>
          <span class="mr-3"><FontAwesomeIcon icon="check"/></span>
          {submitBtnLabel[this.props.global.lang]}
        </button>
        <audio ref={this.audioRef}></audio>
      </div>
    );
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(NewAudio);
