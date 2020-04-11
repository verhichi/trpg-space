import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { addAudio } from '../../../redux/actions/audio';
import { hideModal } from '../../../redux/actions/modal';
import { audioUrlInpLabel, audioTitleInpLabel, urlFormatError, submitBtnLabel, audioTypeLabel, audioTypeSe, audioTypeBgm } from './newAudio.i18n';
import { YOUTUBE_IFRAME_URL_PREFIX, AUDIO_TYPE_BGM, AUDIO_TYPE_SE } from '../../../constants/constants';
import { isYoutubeUrl } from '../../../utils/validate';
import { extractYoutubeId } from '../../../utils/extract';
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
      url:           '',
      youtubeId:     '',
      title:         '',
      isLoading:     false,
      isUrlFormatError: false,
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleUrlChange   = this.handleUrlChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleTypeChange  = this.handleTypeChange.bind(this);
  }

  handleTitleChange (e) {
    this.setState({ title: e.target.value });
  }

  handleTypeChange (e) {
    this.setState({ type: e.target.value });
  }

  handleUrlChange (e) {
    const url = e.target.value.trim()
    this.setState({ url, isUrlFormatError: !isYoutubeUrl(url), youtubeId: extractYoutubeId(url) });
  }

  handleButtonClick (e){
    if (!this.state.submitted){
      this.setState({ submitted: true });

      const audioData = {
        audioId: uuid.v4(),
        ownerId: this.props.global.id,
        title: this.state.title,
        type: this.state.type,
        url: this.state.url,
        youtubeId: this.state.youtubeId,
      };

      this.props.addAudio(audioData);
      socket.emit('audio', this.props.global.roomId, audioData);
      this.props.hideModal();
    }
  }



  render() {
    const isDisabled = this.isLoading || !this.state.title.length || !this.state.url || this.state.submitted;

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
          <div>{audioUrlInpLabel[this.props.global.lang]}</div>
          <input className="inp w-100" type="text" placeholder="https://youtu.be/XXXXXXXXXXX" value={this.state.url} onChange={this.handleUrlChange} />
          {this.state.isUrlFormatError && <div className="text-danger">{urlFormatError[this.props.global.lang]}</div>}
        </div>
        {!this.state.isUrlFormatError && this.state.url && this.state.youtubeId && <div className="iframe-cont"><iframe className="iframe-youtube" title="sample" frameBorder="0" iv_load_policy="3" loop="1" src={`${YOUTUBE_IFRAME_URL_PREFIX}${this.state.youtubeId}`}></iframe></div>}
        <button className="btn btn-hot cursor-pointer" disabled={isDisabled} onClick={this.handleButtonClick}>
          <span className="mr-3"><FontAwesomeIcon icon="check"/></span>
          {submitBtnLabel[this.props.global.lang]}
        </button>
      </div>
    );
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(NewAudio);
