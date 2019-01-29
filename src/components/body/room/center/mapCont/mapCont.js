import React, { Component } from 'react';
import { connect } from 'react-redux';

// Style
import './mapCont.scss';

// Component
import Map         from './map/map';
import Toolbar     from './toolbar/toolbar';
import MiniChatLog from './miniChatLog/miniChatLog';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { chatLog: state.chatLog };
};

class MapCont extends Component {
  render() {
    const miniChatLog = this.props.chatLog.slice(-3);

    return (
      <div className="map-cont d-flex f-dir-col f-grow-1">
        <Toolbar/>
        <Map/>
        { miniChatLog.length === 0
            ? null
            : <MiniChatLog miniChatLog={miniChatLog}/>}
      </div>
    );
  }
}

export default connect(mapStateToProps)(MapCont);
