import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { setMapMode, addMapChar, editMapChar } from '../../../../../redux/actions/action';
// import socket from '../../../../../socket/socketClient';

// // Font Awesome Component
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './mapCont.scss';

// Component
import Map from './map/map';
import Toolbar from './toolbar/toolbar';
import MiniChatLog from './miniChatLog/miniChatLog';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { chatLog: state.chatLog };
};

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
    const miniChatLog = this.props.chatLog.slice(-3);

    return (
      <div className="map-cont f-grow-1">
        <Map/>
        <Toolbar/>
        { miniChatLog.length === 0
            ? null
            : <MiniChatLog miniChatLog={miniChatLog}/>}
      </div>
    );
  }
}

export default connect(mapStateToProps)(MapCont);
// export default MapCont;
