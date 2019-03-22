import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MODAL_TYPE_EDIT_NOTE, MODAL_TYPE_CONFIRM } from '../../../../../../../constants/constants';
import { showModal, hideModal } from '../../../../../../../redux/actions/modal';
import { removeNote } from '../../../../../../../redux/actions/note';
import socket from '../../../../../../../socket/socketClient';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './note.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { global:   state.global };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    hideModal:  ()                     => dispatch(hideModal()),
    showModal:  (modalType, modalProp) => dispatch(showModal(modalType, modalProp)),
    removeNote: (noteId)               => dispatch(removeNote(noteId))
  };
};

class Note extends Component {
  constructor (props){
    super(props);
    this.noteRef = React.createRef();
    this.state = { isExpand: false };

    this.handleEditClick   = this.handleEditClick.bind(this);
    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  handleEditClick (e){
    e.preventDefault();
    this.props.showModal(MODAL_TYPE_EDIT_NOTE, {
      title:        'Edit Note',
      displayClose: false,
      noteId:       this.props.noteData.noteId
    });
  }

  handleRemoveClick (e){
    e.preventDefault();
    this.props.showModal(MODAL_TYPE_CONFIRM, {
      title:        '',
      displayClose: false,
      confirmText:  'Are you sure you want to delete this note?',
      accept:       [
        this.props.removeNote.bind(this, this.props.noteData.noteId),
        socket.emit.bind(socket, 'delNote', this.props.global.roomId, this.props.noteData.noteId),
        this.props.hideModal
      ],
      decline:      this.props.hideModal
    });
  }

  handleExpandClick (e){
    e.preventDefault();
    this.setState({ isExpand: !this.state.isExpand });
  }

  render() {
    const expandClass = this.state.isExpand ? 'is-expand' : '';

    return (
      <div className="note-cont">

        <div className={`note-body p-1 d-flex ${expandClass}`}>

          <div className="note-text-cont f-grow-1 pr-1">
            <div className="one-line-ellipsis font-size-xl font-weight-bold mb-1">{this.props.noteData.title}</div>
            <div class="font-size-sm" ref={this.noteRef}>{this.props.noteData.text}</div>
          </div>

          {this.props.noteData.ownerId === this.props.global.id &&
            (<div className="font-size-lg f-shrink-0 d-flex f-dir-col">
               <div className="note-btn cursor-pointer" onClick={this.handleRemoveClick}>
                 <FontAwesomeIcon icon="window-close"/>
               </div>
               <div className="note-btn cursor-pointer" onClick={this.handleEditClick}>
                 <FontAwesomeIcon icon="pen-square"/>
               </div>
             </div>)}
        </div>

        <div className="note-shrink-btn align-center cursor-pointer f-shrink-0" onClick={this.handleExpandClick}>
          {this.state.isExpand
             ? <span><FontAwesomeIcon icon="angle-up"/></span>
             : <span><FontAwesomeIcon icon="angle-down"/></span>}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Note);
