import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { MODAL_TYPE_CONFIRM } from '../../../../../../../constants/constants';
import { showModal, hideModal } from '../../../../../../../redux/actions/modal';
import { removeAudio, setAudio, unsetAudio } from '../../../../../../../redux/actions/audio';
import { deleteAudioMessage, groupPlayAudioMessage } from './audio.i18n'
import socket from '../../../../../../../socket/socketClient';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './audio.scss';

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
    unsetAudio: (audioId) => dispatch(unsetAudio(audioId)),
    removeAudio: (audioId) => dispatch(removeAudio(audioId)),
  };
};

class Audio extends Component {
  constructor (props){
    super(props);
    this.state = { isPlayingBeforeSeek: false }

    this.handlePlayClickToggle = this.handlePlayClickToggle.bind(this);
    this.handleGroupPlay       = this.handleGroupPlay.bind(this);
    this.handleRemoveClick     = this.handleRemoveClick.bind(this);
  }

  handlePlayClickToggle (e) {
    e.stopPropagation();
    this.props.audio.isPlaying
      ? this.props.unsetAudio(this.props.audio.audioId)
      : this.props.setAudio(this.props.audio.audioId)
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
        this.props.hideModal
      ],
      decline:      this.props.hideModal
    });
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
    const setText = this.props.audio.isPlaying ? 'Stop' : 'Play'
    const userName = this.props.userList.find(user => user.id === this.props.audio.ownerId).name;

    return (
      <div className="audio-cont d-flex">
        <div className="f-grow-1 p-1">
          <div className="audio-owner one-line-ellipsis font-size-sm font-weight-bold">{ userName }</div>
          <div className="one-line-ellipsis font-size-lg font-weight-bold mb-2">{ this.props.audio.title }</div>
          <div>
            <button className="set-btn btn-slim btn-hot font-size-sm mr-1" onClick={this.handlePlayClickToggle}>
              {setText}
            </button>
            { isOwnAudio &&
              <button className="set-btn btn-slim btn-hot font-size-sm" onClick={this.handleGroupPlay}>
                Play for Everyone
              </button>
            }
          </div>
        </div>
        <div className="font-size-lg d-flex f-dir-col f-shrink-0 pr-1 pt-1">
          { isOwnAudio
            && (
              <Fragment>
                <div className="audio-btn cursor-pointer align-center" onClick={this.handleRemoveClick}>
                 <FontAwesomeIcon icon="window-close"/>
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
