import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { MODAL_TYPE_NOTES } from '../../../../../../../constants/constants';
import { showModal } from '../../../../../../../redux/actions/modal';
import socket from '../../../../../../../socket/socketClient';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './note.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    global:   state.global,
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    showModal: (modalType, modalProp) => dispatch(showModal(modalType, modalProp)),
  };
};

class Note extends Component {
  render() {
    return (
      <div>NOTE WORKS</div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Note);
