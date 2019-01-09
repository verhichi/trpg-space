import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { setMapMode, addMapChar, editMapChar } from '../../../../../redux/actions/action';
// import socket from '../../../../../socket/socketClient';

// // Font Awesome Component
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './mapCont.scss';

// Component
import Map from './map/map';
import Toolbar from './toolbar/toolbar';

// // Redux Map State To Prop
// const mapStateToProps = (state) => {
//   return {
//     id: state.id,
//     roomId: state.roomId,
//     charList: state.charList,
//     isMobile: state.isMobile,
//     mapSetting: state.mapSetting,
//     displayPlaceChar: state.displayPlaceChar
//   };
// };
//
// // Redux Map Dispatch To Props
// const mapDispatchToProps = (dispatch) => {
//   return {
//     setMapMode: (mode) => dispatch(setMapMode(mode)),
//     addMapChar: (charData) => dispatch(addMapChar(charData)),
//     editMapChar: (charData) => dispatch(editMapChar(charData)),
//   };
// };

class MapCont extends Component {
  render() {
    return (
      <div className="map-cont f-grow-1">
        <Map/>
        <Toolbar/>
      </div>
    );
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(MapCont);
export default MapCont;