import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { MODAL_TYPE_CONFIRM } from '../../../../../../../constants/constants';
import { showModal, hideModal } from '../../../../../../../redux/actions/modal';
import { removeAudio, setAudio, playAudio, pauseAudio, muteAudio, unmuteAudio, timeUpdateAudio } from '../../../../../../../redux/actions/audio';
import { deleteAudioMessage, groupPlayAudioMessage } from './audio.i18n'
import socket from '../../../../../../../socket/socketClient';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './audio.scss';

// Components
import StatusMeter from '../../../../../../partials/statusMeter/statusMeter'

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    global: state.global,
    userList: state.userList
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    showModal:  (modalType, modalProp) => dispatch(showModal(modalType, modalProp)),
    hideModal: () => dispatch(hideModal()),
    setAudio: (audioId) => dispatch(setAudio(audioId)),
    playAudio: (audioId) => dispatch(playAudio(audioId)),
    removeAudio: (audioId) => dispatch(removeAudio(audioId)),
    pauseAudio: (audioId) => dispatch(pauseAudio(audioId)),
    muteAudio: (audioId) => dispatch(muteAudio(audioId)),
    unmuteAudio: (audioId) => dispatch(unmuteAudio(audioId)),
    timeUpdateAudio: (audioId, curTime) => dispatch(timeUpdateAudio(audioId, curTime))
  };
};

// CREATE mi:ss FORMAT STRING FROM SECOND
function formatAudioDuration(audio_duration_sec){
  const minute = Math.floor(audio_duration_sec / 60).toString().padStart(2, '0');
  const second = Math.floor(audio_duration_sec % 60).toString().padStart(2, '0');
  return `${minute}:${second}`;
}

class Audio extends Component {
  constructor (props){
    super(props);
    this.state = { isPlayingBeforeSeek: false }

    this.handleValueChange     = this.handleValueChange.bind(this);
    this.handleValueChangeEnd  = this.handleValueChangeEnd.bind(this);
    this.handlePlayClickToggle = this.handlePlayClickToggle.bind(this);
    this.handleGroupPlay       = this.handleGroupPlay.bind(this);
    this.handleMuteClickToggle = this.handleMuteClickToggle.bind(this);
    this.handleSeekStart       = this.handleSeekStart.bind(this);
    this.handleSeekEnd         = this.handleSeekEnd.bind(this);
    this.handleRemoveClick     = this.handleRemoveClick.bind(this);
  }

  handleValueChange (statId, value){
    this.props.timeUpdateAudio(this.props.audio.audioId, Math.floor(value))
  }

  handleValueChangeEnd (statId, value){
    this.props.timeUpdateAudio(this.props.audio.audioId, Math.floor(value))
  }

  handlePlayClickToggle (e) {
    e.stopPropagation();
    if (this.props.audio.isPlaying) {
      this.props.pauseAudio(this.props.audio.audioId)
    } else {
      this.props.setAudio(this.props.audio.audioId)
      this.props.playAudio(this.props.audio.audioId)
    }
  }

  handleGroupPlay (e) {
    e.stopPropagation();
    this.props.showModal(MODAL_TYPE_CONFIRM, {
      title:        '',
      displayClose: false,
      confirmText:  groupPlayAudioMessage[this.props.global.lang] + this.props.audio.title,
      accept:       [
        socket.emit.bind(socket, 'groupPlayAudio', this.props.global.roomId, this.props.audio.audioId),
        this.props.setAudio.bind(this, this.props.audio.audioId),
        this.props.playAudio.bind(this, this.props.audio.audioId),
        this.props.hideModal
      ],
      decline:      this.props.hideModal
    });
  }

  handleMuteClickToggle (e) {
    e.stopPropagation();
    this.props.audio.isMuted
      ? this.props.unmuteAudio(this.props.audio.audioId)
      : this.props.muteAudio(this.props.audio.audioId)
  }

  handleSeekStart () {
    if (this.props.audio.isPlaying) {
      this.setState({ isPlayingBeforeSeek: true });
      this.props.pauseAudio(this.props.audio.audioId);
    }
  }

  handleSeekEnd () {
    if (this.state.isPlayingBeforeSeek) {
      this.setState({ isPlayingBeforeSeek: false });
      this.props.playAudio(this.props.audio.audioId);
    }
  }

  handleRemoveClick (e){
    e.preventDefault();
    this.props.showModal(MODAL_TYPE_CONFIRM, {
      title:        '',
      displayClose: false,
      confirmText:  deleteAudioMessage[this.props.global.lang] + this.props.audio.title,
      accept:       [
        this.props.removeAudio.bind(this, this.props.audio.audioId),
        socket.emit.bind(socket, 'delAudio', this.props.global.roomId, this.props.audio.audioId),
        this.props.hideModal
      ],
      decline:      this.props.hideModal
    });
  }

  render() {
    const isOwnAudio = this.props.audio.ownerId === this.props.global.id
    const playIcon = this.props.audio.isPlaying ? 'pause' : 'play'
    const muteIcon = this.props.audio.isMuted ? 'volume-mute' : 'volume-up'
    const curTime = formatAudioDuration(this.props.audio.curTime)
    const endTime = formatAudioDuration(this.props.audio.duration)
    const userName = this.props.userList.find(user => user.id === this.props.audio.ownerId).name;

    return (
      <div className="audio-cont d-flex">
        <div className="f-grow-1 p-1">
          <div className="audio-owner one-line-ellipsis font-size-sm font-weight-bold">{ userName }</div>
          <div className="one-line-ellipsis font-size-lg font-weight-bold mb-2">{ this.props.audio.title }</div>
          <div className="audio-meter-cont d-flex">
            <div className="cursor-pointer mr-2" onClick={this.handlePlayClickToggle}>
              <FontAwesomeIcon icon={ playIcon } />
            </div>
            <div className="cursor-pointer mr-2" onClick={this.handleMuteClickToggle}>
              <FontAwesomeIcon icon={ muteIcon } />
            </div>
            <span className="mr-2">{ curTime }</span>
            <StatusMeter statId={this.props.audio.audioId} color={'#3697EA'} value={this.props.audio.curTime} maxValue={this.props.audio.duration} editable={true} onChange={this.handleValueChange} onChangeEnd={this.handleValueChangeEnd} onDown={this.handleSeekStart} onUp={this.handleSeekEnd} />
            <span className="ml-2">{ endTime }</span>
          </div>
        </div>
        <div className="font-size-lg d-flex f-dir-col f-shrink-0 pr-1 pt-1">
          { isOwnAudio
            && (
              <Fragment>
                <div className="audio-btn cursor-pointer align-center" onClick={this.handleRemoveClick}>
                 <FontAwesomeIcon icon="window-close"/>
                </div>
                <div className="audio-btn cursor-pointer" onClick={this.handleGroupPlay}>
                  <FontAwesomeIcon icon="podcast" />
                </div>
              </Fragment>
            )
          }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Audio);
