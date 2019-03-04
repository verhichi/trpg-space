import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { hideModal } from '../../../redux/actions/modal';
import { addNote } from '../../../redux/actions/note';
import socket from '../../../socket/socketClient';
import { titleInpLabel, sharedNotesInpLabel, closeBtnLabel, submitBtnLabel } from './newNote.i18n';

// Style
import './newNote.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { global: state.global };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    addNote:   (noteData) => dispatch(addNote(noteData)),
    hideModal: ()         => dispatch(hideModal())
  };
};

class NewNote extends Component {
  constructor (props){
    super(props);
    this.state = {
      title:     '',
      text:      '',
      submitted: false
    };

    this.handleTextChange  = this.handleTextChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleCloseClick  = this.handleCloseClick.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  handleNoteChange (e){
    this.setState({ text: e.target.value });
  }

  handleTitleChange (e){
    this.setState({ title: e.target.value });
  }

  handleCloseClick (e){
    this.props.hideModal();
  }

  handleSubmitClick (e){
    if (!this.state.submitted){
      this.setState({ submitted: true });

      const noteData = {
        noteId:  uuid.v4(),
        ownerId: this.props.global.id,
        title:   this.state.title.trim(),
        text:    this.state.text.trim()
      };

      this.props.addNote(noteData);
      socket.emit('note', this.props.global.roomId, noteData);

      this.props.hideModal();
    }
  }

  render() {
    const isDisabled = this.state.submitted;

    return (
      <div className="d-flex f-dir-col f-grow-1">

        <div className="mb-2">
          <div className="char-inp-label pr-1">{titleInpLabel[this.props.global.lang]}:</div>
          <input className="inp f-grow-1" type="text" value={this.state.title} onChange={this.handleTitleChange}/>
        </div>

        <div>{sharedNotesInpLabel[this.props.global.lang]}:</div>
        <textarea className="notes-textarea f-grow-1 p-1" value={this.state.text} onChange={this.handleTextChange}></textarea>
        
        <div className="d-flex justify-content-around pt-2 f-shrink-0">
          <button className="notes-btn p-2 btn-danger align-center cursor-pointer" onClick={this.handleCloseClick} >{closeBtnLabel[this.props.global.lang]}</button>
          <button className="notes-btn p-2 btn-hot align-center cursor-pointer" onClick={this.handleSubmitClick} disabled={isDisabled}>{submitBtnLabel[this.props.global.lang]}</button>
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewNote);
