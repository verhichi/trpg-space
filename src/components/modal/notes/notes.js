import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../../redux/actions/modal';
import { unlockNote, editNote } from '../../../redux/actions/note';
import socket from '../../../socket/socketClient';
import { sharedNotesInpLabel, closeBtnLabel, submitBtnLabel } from './notes.i18n';

// Style
import './notes.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    global:      state.global,
    noteSetting: state.noteSetting
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    editNote:   (note) => dispatch(editNote(note)),
    hideModal:  ()      => dispatch(hideModal()),
    unlockNote: ()      => dispatch(unlockNote())
  };
};

class Notes extends Component {
  constructor (props){
    super(props);
    this.state = {
      note:      this.props.noteSetting.note,
      submitted: false
    };

    this.handleChange      = this.handleChange.bind(this);
    this.handleCloseClick  = this.handleCloseClick.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  handleChange (e){
    this.setState({ note: e.target.value });
  }

  handleCloseClick (e){
    socket.emit('unlockNote', this.props.global.roomId);
    this.props.unlockNote();
    this.props.hideModal();
  }

  handleSubmitClick (e){
    if (!this.state.submitted){
      this.setState({ submitted: true });

      const note = this.state.note.trim();

      this.props.unlockNote();
      socket.emit('unlockNote', this.props.global.roomId);

      this.props.editNote(note);
      socket.emit('editNote', this.props.global.roomId, note);

      this.props.hideModal();
    }
  }

  render() {
    const isDisabled = this.state.submitted;

    return (
      <div className="d-flex f-dir-col f-grow-1">
        <div>{sharedNotesInpLabel[this.props.global.lang]}:</div>
        <textarea className="notes-textarea f-grow-1 p-1" value={this.state.note} onChange={this.handleChange}></textarea>
        <div className="d-flex justify-content-around pt-2 f-shrink-0">
          <button className="notes-btn p-2 btn-danger align-center cursor-pointer" onClick={this.handleCloseClick} >{closeBtnLabel[this.props.global.lang]}</button>
          <button className="notes-btn p-2 btn-hot align-center cursor-pointer" onClick={this.handleSubmitClick} disabled={isDisabled}>{submitBtnLabel[this.props.global.lang]}</button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
