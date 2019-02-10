import React, { Component } from 'react';
import { connect } from 'react-redux';

// Style
import './mapCont.scss';

// Component
import Map         from './map/map';
import MapTab      from './mapTab/mapTab';
import Toolbar     from './toolbar/toolbar';
import MiniChatLog from './miniChatLog/miniChatLog';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    chatLog:        state.chatLog,
    displaySetting: state.displaySetting,
    mapList:        state.mapList
  };
};

class MapCont extends Component {
  render() {
    const miniChatLog = this.props.chatLog.slice(-3);
    const mapData     = this.props.mapList.find(map => map.mapId === this.props.displaySetting.displayMap);

    return (
      <div className="map-cont d-flex f-dir-col f-grow-1">
        <MapTab/>
        { this.props.displaySetting.displayMap.length !== 0 && <Toolbar/> }
        { this.props.displaySetting.displayMap.length !== 0 && <Map mapData={mapData}/>}
        { miniChatLog.length > 1 && <MiniChatLog miniChatLog={miniChatLog}/>}
      </div>
    );
  }
}

export default connect(mapStateToProps)(MapCont);
