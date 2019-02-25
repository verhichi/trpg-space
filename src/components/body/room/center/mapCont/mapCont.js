import React, { Component } from 'react';
import { connect } from 'react-redux';

// Style
import './mapCont.scss';

// Component
import Map         from './map/map';
import NoMap       from './noMap/noMap';
import MapTab      from './mapTab/mapTab';
import Toolbar     from './toolbar/toolbar';
import MiniChatLog from './miniChatLog/miniChatLog';


// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    displaySetting: state.displaySetting,
    mapList:        state.mapList
  };
};

class MapCont extends Component {
  render() {
    const mapData = this.props.mapList.find(map => map.mapId === this.props.displaySetting.displayMap);

    return (
      <div className="map-cont d-flex f-dir-col f-grow-1">
        <MapTab/>
        { this.props.displaySetting.displayMap.length !== 0 && <Toolbar mapData={mapData}/> }
        { this.props.displaySetting.displayMap.length !== 0 ? <Map mapData={mapData}/> : <NoMap/>}
        <MiniChatLog />
      </div>
    );
  }
}

export default connect(mapStateToProps)(MapCont);
