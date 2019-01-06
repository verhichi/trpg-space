import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { showModal } from '../../../../../redux/actions/action';

// Style
import './map.scss';

// // Redux Map State To Prop
// const mapStateToProps = (state) => {
//   return {
//     isMobile: state.isMobile,
//     chatLog: state.chatLog
//   };
// };

// // Redux Map Dispatch To Props
// const mapDispatchToProps = (dispatch) => {
//   return { showModal: (modalType, modalProp) => dispatch(showModal(modalType, modalProp)) };
// };

class Map extends Component {
  render() {
    return (
      <div className="chat-log-cont f-grow-1">
        MAP WORKS
      </div>
    );
  }
}

export default Map;
