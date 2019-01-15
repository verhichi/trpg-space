import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { showModal, lockNote } from '../../../../../../redux/actions/action';
import socket from '../../../../../../socket/socketClient';


// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './notes.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    id: state.id,
    roomId: state.roomId,
    notes: state.notes,
    isNoteLocked: state.isNoteLocked
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    showModal: (modalType, modalProp) => dispatch(showModal(modalType, modalProp)),
    lockNote: (userId) => dispatch(lockNote(userId))
  };
};

class Notes extends Component {
  constructor (props){
    super(props);
    this.handleEditClick = this.handleEditClick.bind(this, this.props.id);
  }

  handleEditClick (userId, e){
    this.props.lockNote(userId);
    socket.emit('lockNote', this.props.roomId, this.props.id);

    this.props.showModal('notes', {
      title: 'Edit Shared Notes',
      displayClose: false
    });
  }

  render() {
    const isLocked = this.props.isNoteLocked.length !== 0;

    return (
      <Fragment>

        <button className="btn-slim btn-hot cursor-pointer align-center mb-2 mt-2 p-2 f-shrink-0" disabled={isLocked} onClick={this.handleEditClick}>
          <div>
            <span className={isLocked ? 'd-none' : ''}><FontAwesomeIcon icon="pen-square"/></span>
            <span className={!isLocked ? 'd-none' : ''}><FontAwesomeIcon icon="lock"/></span>
          </div>
          <div className="btn-text">Edit notes</div>
        </button>

        <div className="mb-2 f-grow-1">
          <div className="notes-label align-center font-weight-bold text-dec-underline pb-1">Shared Notes:</div>
          <div className="notes-cont">
            { this.props.notes }
          </div>
        </div>

       </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
