import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { MODAL_TYPE_EDIT_NOTE, MODAL_TYPE_CONFIRM } from '../../../../../../../constants/constants';
// import { showModal, hideModal } from '../../../../../../../redux/actions/modal';
// import { removeNote } from '../../../../../../../redux/actions/note';
// import { deleteNoteMessage, editNoteModalTitle } from './note.i18n'
// import socket from '../../../../../../../socket/socketClient';
// import jszip from 'jszip';
// import { saveAs } from 'file-saver';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './audio.scss';

// Components
import StatusMeter from '../../../../../../partials/statusMeter/statusMeter'

// // Redux Map State To Prop
// const mapStateToProps = (state) => {
//   return { global:   state.global };
// };

// // Redux Map Dispatch To Props
// const mapDispatchToProps = (dispatch) => {
//   return {
//     hideModal:  ()                     => dispatch(hideModal()),
//     showModal:  (modalType, modalProp) => dispatch(showModal(modalType, modalProp)),
//     removeNote: (noteId)               => dispatch(removeNote(noteId))
//   };
// };

// const DragHandle = SortableHandle(() => {
//   return (
//     <div className="drag-handle p-1">
//       <FontAwesomeIcon icon="bars"/>
//     </div>
//   );
// });

// CREATE mi:ss FORMAT STRING FROM SECOND
function formatAudioDuration(audio_duration_sec){
  const minute = Math.floor(audio_duration_sec / 60).toString().padStart(2, '0');
  const second = Math.floor(audio_duration_sec % 60).toString().padStart(2, '0');
  return `${minute}:${second}`;
}

class Audio extends Component {
  constructor (props){
    super(props);
    this.audioRef = React.createRef();
    this.fileInput = React.createRef();
    this.state = {
      isPlaying: false,
      isMuted: false,
      curTime: 0,
      endTime: 0,
      isPauseBeforeSeek: false
    }

    this.handleValueChange     = this.handleValueChange.bind(this);
    this.handleValueChangeEnd  = this.handleValueChangeEnd.bind(this);
    this.handlePlayClickToggle = this.handlePlayClickToggle.bind(this);
    this.handleMuteClickToggle = this.handleMuteClickToggle.bind(this);
    this.handleFileChange      = this.handleFileChange.bind(this);
    this.handleSeekStart       = this.handleSeekStart.bind(this);
    this.handleSeekEnd         = this.handleSeekEnd.bind(this);
  }

  componentDidMount () {
    // this.audioRef.current.src = this.props.src

    this.audioRef.current.addEventListener('loadedmetadata', (e) => {
      e.stopPropagation();
      this.setState({ curTime: Math.floor(this.audioRef.current.currentTime) })
      this.setState({ endTime: Math.floor(this.audioRef.current.duration) })
    })

    this.audioRef.current.addEventListener('timeupdate', (e) => {
      e.stopPropagation();
      this.setState({ curTime: Math.floor(this.audioRef.current.currentTime) })
    })
  }

  handleValueChange (statId, value){
    this.audioRef.current.currentTime = Math.floor(value)
    this.setState({ curTime: Math.floor(value) })
  }

  handleValueChangeEnd (statId, value){
    this.audioRef.current.currentTime = Math.floor(value)
    this.setState({ curTime: Math.floor(value) })
  }

  handlePlayClickToggle (e) {
    e.stopPropagation();
    this.setState({ isPlaying: !this.state.isPlaying }, () => {
      this.state.isPlaying ? this.audioRef.current.play() : this.audioRef.current.pause();
    });
  }

  handleMuteClickToggle (e) {
    e.stopPropagation();
    this.setState({ isMuted: !this.state.isMuted }, () => {
      this.audioRef.current.muted = this.state.isMuted
    });
  }

  handleSeekStart () {
    this.setState({ isPauseBeforeSeek: this.audioRef.current.paused });
    this.audioRef.current.pause();
  }

  handleSeekEnd () {
    this.state.isPauseBeforeSeek ? this.audioRef.current.pause() : this.audioRef.current.play();
  }

  handleFileChange (e){
    e.preventDefault();

    const reader = new FileReader();
    reader.readAsDataURL(this.fileInput.current.files[0]);

    reader.onload = () => {
      this.audioRef.current.src = reader.result
    }
  }

  // handleRemoveClick (e){
  //   e.preventDefault();
  //   this.props.showModal(MODAL_TYPE_CONFIRM, {
  //     title:        '',
  //     displayClose: false,
  //     confirmText:  deleteNoteMessage[this.props.global.lang],
  //     accept:       [
  //       this.props.removeNote.bind(this, this.props.noteData.noteId),
  //       socket.emit.bind(socket, 'delNote', this.props.global.roomId, this.props.noteData.noteId),
  //       this.props.hideModal
  //     ],
  //     decline:      this.props.hideModal
  //   });
  // }

  render() {
    const isOwnAudio = true
    const playIcon = this.state.isPlaying ? 'pause' : 'play'
    const muteIcon = this.state.isMuted ? 'volume-mute' : 'volume-up'
    const curTime = formatAudioDuration(this.state.curTime)
    const endTime = formatAudioDuration(this.state.endTime)

    return (
      <div className="audio-cont d-flex">
        <div className="f-grow-1 p-1">
          <label className="inp-file-cont d-flex w-100 cursor-pointer">
            <FontAwesomeIcon icon="upload"/>
            <div className="one-line-ellipsis f-grow-1 pl-3"></div>
            <input id="imageInput" className="d-none" type="file" ref={this.fileInput} onChange={this.handleFileChange}/>
          </label>
          <div className="audio-owner one-line-ellipsis font-size-sm font-weight-bold">Daichi</div>
          <div className="one-line-ellipsis font-size-lg font-weight-bold mb-2">Audio Title</div>
          <div className="audio-meter-cont d-flex">
            <div className="cursor-pointer mr-2" onClick={this.handlePlayClickToggle}>
              <FontAwesomeIcon icon={playIcon} />
            </div>
            <div className="cursor-pointer mr-2" onClick={this.handleMuteClickToggle}>
              <FontAwesomeIcon icon={muteIcon} />
            </div>
            <span className="mr-2">{ curTime }</span>
            <StatusMeter statId={'123'} color={'#F00'} value={this.state.curTime} maxValue={this.state.endTime} editable={true} onChange={this.handleValueChange} onChangeEnd={this.handleValueChangeEnd} onDown={this.handleSeekStart} onUp={this.handleSeekEnd} />
            <span className="ml-2">{ endTime }</span>
          </div>
        </div>
        <div className="font-size-lg d-flex f-dir-col f-shrink-0 pr-1 pt-1">
          {isOwnAudio
            && (<div className="audio-btn cursor-pointer align-center">
                 <FontAwesomeIcon icon="window-close"/>
                </div>)}
        </div>

        <audio ref={this.audioRef}></audio>
      </div>
    );
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(Note);
export default Audio;
