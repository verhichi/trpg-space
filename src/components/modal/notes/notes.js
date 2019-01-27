import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideModal, unlockNote, editNote } from '../../../redux/actions/action';
import socket from '../../../socket/socketClient';

// Style
import './notes.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    id:     state.id,
    roomId: state.roomId,
    notes:  state.notes
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    editNote:   (notes) => dispatch(editNote(notes)),
    hideModal:  ()      => dispatch(hideModal()),
    unlockNote: ()      => dispatch(unlockNote())
  };
};

class Notes extends Component {
  constructor (props){
    super(props);
    this.state = { notes: this.props.notes };

    this.handleChange      = this.handleChange.bind(this);
    this.handleCloseClick  = this.handleCloseClick.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  handleChange (e){
    this.setState({ notes: e.target.value });
  }

  handleCloseClick (e){
    socket.emit('unlockNote', this.props.roomId);
    this.props.unlockNote();
    this.props.hideModal();
  }

  handleSubmitClick (e){
    const notes = this.state.notes.trim();
    this.props.unlockNote();
    socket.emit('unlockNote', this.props.roomId);

    this.props.editNote(notes);
    socket.emit('editNote', this.props.roomId, notes);

    this.props.hideModal();
  }

  render() {
    return (
      <div className="d-flex f-dir-col f-grow-1">
        <div>Shared notes:</div>
        <textarea className="notes-textarea f-grow-1 p-1" value={this.state.notes} onChange={this.handleChange}></textarea>
        <div className="d-flex justify-content-around pt-2 f-shrink-0">
          <button className="notes-btn p-2 btn-danger align-center" onClick={this.handleCloseClick} >Close</button>
          <button className="notes-btn p-2 btn-hot align-center" onClick={this.handleSubmitClick}>Submit</button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
