import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { showModal } from '../../../../../redux/actions/action';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      <div className="map-cont f-grow-1">
        <div className="map-toolbar d-inline-block">
          <div className="map-toolbar-btn d-inline-block p-3 cursor-pointer">
            <FontAwesomeIcon icon="street-view"/>
          </div>
          <div className="map-toolbar-btn d-inline-block p-3 cursor-pointer">
            <FontAwesomeIcon icon="user-times"/>
          </div>
          <div className="map-toolbar-btn d-inline-block p-3 cursor-pointer">
            <FontAwesomeIcon icon="file-image"/>
          </div>
          <div className="map-toolbar-btn d-inline-block p-3 cursor-pointer">
            <FontAwesomeIcon icon="ruler-combined"/>
          </div>
          <div className="map-toolbar-btn d-inline-block p-3 cursor-pointer">
            <FontAwesomeIcon icon="th"/>
          </div>
        </div>
      </div>
    );
  }
}

export default Map;
