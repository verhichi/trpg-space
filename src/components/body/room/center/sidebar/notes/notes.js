import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { MODAL_TYPE_NOTES } from '../../../../../../constants/constants';
import { showModal } from '../../../../../../redux/actions/modal';
import { lockNote } from '../../../../../../redux/actions/note';
import socket from '../../../../../../socket/socketClient';
import { noteEditBtnLabel, sharedNotesLabel } from './notes.i18n';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    showModal: (modalType, modalProp) => dispatch(showModal(modalType, modalProp)),
    lockNote:  (userId)               => dispatch(lockNote(userId))
  };
};

class Notes extends Component {
  constructor (props){
    super(props);

    this.handleEditClick = this.handleEditClick.bind(this, this.props.global.id);
  }

  handleEditClick (userId, e){
    this.props.lockNote(userId);
    socket.emit('lockNote', this.props.global.roomId, this.props.global.id);

    this.props.showModal(MODAL_TYPE_NOTES, {
      title:        'Edit Shared Notes',
      displayClose: false
    });
  }

  render() {
    const isLocked = this.props.noteSetting.isNoteLocked.length !== 0;

    return (
      <Fragment>

        <button className="btn-slim btn-hot cursor-pointer align-center mb-2 mt-2 p-2 f-shrink-0" disabled={isLocked} onClick={this.handleEditClick}>
          <div>
            <span className={isLocked ? 'd-none' : ''}><FontAwesomeIcon icon="pen-square"/></span>
            <span className={!isLocked ? 'd-none' : ''}><FontAwesomeIcon icon="lock"/></span>
          </div>
          <div className="btn-text">{noteEditBtnLabel[this.props.global.lang]}</div>
        </button>

        <div className="mb-2 f-grow-1">
          <div className="notes-label align-center font-weight-bold text-dec-underline pb-1">{sharedNotesLabel[this.props.global.lang]}</div>
          <div className="notes-cont">
            { this.props.noteSetting.note }
          </div>
        </div>

       </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
