import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MAP_MODE_PLACE_CHAR, MAP_MODE_PLACE_GEO, CHAR_PRIVACY_LEVEL_THREE } from '../../../../../../constants/constants';
import { setMapMode, setCharToPlace, editMapPosition, editMapScale } from '../../../../../../redux/actions/map';
import { addMapChar, editMapChar } from '../../../../../../redux/actions/mapChar';
import { addGeo } from '../../../../../../redux/actions/geo';
import socket from '../../../../../../socket/socketClient';
import uuid from 'uuid';

// Style
import './map.scss';

// Component
import CharDot from './charDot/charDot';
import Geo     from './geo/geo';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    global:         state.global,
    charList:       state.charList,
    mapCharList:    state.mapCharList,
    displaySetting: state.displaySetting,
    geoList:        state.geoList
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    setMapMode:      (mapId, mode)      => dispatch(setMapMode(mapId, mode)),
    addMapChar:      (mapCharData)      => dispatch(addMapChar(mapCharData)),
    editMapChar:     (mapCharData)      => dispatch(editMapChar(mapCharData)),
    setCharToPlace:  (mapId, charId)    => dispatch(setCharToPlace(mapId, charId)),
    editMapPosition: (mapId, left, top) => dispatch(editMapPosition(mapId, left, top)),
    editMapScale:    (mapId, scale)     => dispatch(editMapScale(mapId, scale)),
    addGeo:          (mapId, geoData)   => dispatch(addGeo(mapId, geoData))
  };
};

class Map extends Component {
  constructor (props){
    super(props);
    this.state = {
      isMapMoveMode: false,
      mouseOffset: {
        offsetX: 0,
        offsetY: 0
      }
    };

    this.handleImageClick = this.handleImageClick.bind(this);
    this.handleMouseDown  = this.handleMouseDown.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleMouseUp    = this.handleMouseUp.bind(this);
    this.handleTouchEnd   = this.handleTouchEnd.bind(this);
    this.handleMouseMove  = this.handleMouseMove.bind(this);
    this.handleTouchMove  = this.handleTouchMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleWheel      = this.handleWheel.bind(this);
  }

  componentWillUnmount (){
    document.querySelector('.map-img-cont').removeEventListener('mousemove', this.handleMouseMove);
    document.querySelector('.map-img-cont').removeEventListener('touchmove', this.handleTouchMove);
    document.querySelector('.map-img-cont').removeEventListener('mouseleave', this.handleMouseLeave);
  }

  handleMouseDown (e){
    e.stopPropagation();
    e.preventDefault();

    this.setState({
      isMapMoveMode: true,
      mouseOffset: {
        offsetX: Math.floor(e.nativeEvent.offsetX * this.props.mapData.scale),
        offsetY: Math.floor(e.nativeEvent.offsetY * this.props.mapData.scale)
      }
    });

    document.querySelector('.map-img-cont').addEventListener('mousemove', this.handleMouseMove);
    document.querySelector('.map-img-cont').addEventListener('mouseleave', this.handleMouseLeave);
  }

  handleTouchStart (e){
    if (this.props.mapData.mode === ''){
      const sidebar      = document.querySelector('.list-cont');
      const sidebarWidth = this.props.displaySetting.displaySidebar ? sidebar.offsetWidth : 0;

      const header      = document.querySelector('header');
      const roomTopCont = document.querySelector('.room-top-cont');
      const mapTabCont  = document.querySelector('.map-tab-cont');
      const mapToolbar  = document.querySelector('.map-toolbar');

      const mapOffsetHeight = header.offsetHeight + roomTopCont.offsetHeight + mapToolbar.offsetHeight + mapTabCont.offsetHeight;

      this.setState({
        isMapMoveMode: true,
        mouseOffset: {
          offsetX: e.touches[0].pageX - parseInt(e.target.style.left) - sidebarWidth,
          offsetY: e.touches[0].pageY - parseInt(e.target.style.top) - mapOffsetHeight
        }
      });

      document.querySelector('.map-img-cont').addEventListener('touchmove', this.handleTouchMove);
    }
  }

  handleMouseMove (e){
    e.stopPropagation();
    e.preventDefault();

    if (this.state.isMapMoveMode){
      this.props.editMapPosition(
        this.props.displaySetting.displayMap,
        e.pageX - document.querySelector('.map-img-cont').getBoundingClientRect().left - this.state.mouseOffset.offsetX,
        e.pageY - document.querySelector('.map-img-cont').getBoundingClientRect().top - this.state.mouseOffset.offsetY
      );
    }
  }

  handleTouchMove (e){
    e.stopPropagation();
    e.preventDefault();

    if (this.state.isMapMoveMode){
      this.props.editMapPosition(
        this.props.displaySetting.displayMap,
        e.touches[0].pageX - document.querySelector('.map-img-cont').getBoundingClientRect().left - this.state.mouseOffset.offsetX,
        e.touches[0].pageY - document.querySelector('.map-img-cont').getBoundingClientRect().top - this.state.mouseOffset.offsetY
      );
    }
  }

  handleMouseUp (e){
    e.stopPropagation();
    e.preventDefault();

    this.setState({ isMapMoveMode: false });
    document.querySelector('.map-img-cont').removeEventListener('mousemove', this.handleMouseMove);
  }

  handleTouchEnd (e){
    this.setState({ isMapMoveMode: false });
    document.querySelector('.map-img-cont').removeEventListener('touchmove', this.handleTouchMove);
  }

  handleMouseLeave (e){
    e.stopPropagation();
    e.preventDefault();

    this.setState({ isMapMoveMode: false });
    document.querySelector('.map-img-cont').removeEventListener('mousemove', this.handleMouseMove);
    document.querySelector('.map-img-cont').removeEventListener('mouseleave', this.handleMouseLeave);
  }

  handleWheel (e){
    let curScale = parseFloat(this.props.mapData.scale);
    if (e.nativeEvent.deltaY > 0){
      curScale = (curScale - 0.1) < 0.1 ? 0.1 : curScale - 0.1;
    } else if (e.nativeEvent.deltaY < 0){
      curScale = (curScale + 0.1) > 2 ? 2 : curScale + 0.1;
    }

    this.props.editMapScale(this.props.mapData.mapId, curScale)
  }

  handleImageClick (e){
    if (this.props.mapData.mode === MAP_MODE_PLACE_CHAR){
      const charData = this.props.charList.find(char => char.charId === this.props.mapData.charToPlace);
      const mapCharData = {
        mapId:  this.props.mapData.mapId,
        charId: this.props.mapData.charToPlace,
        left:   e.nativeEvent.offsetX,
        top:    e.nativeEvent.offsetY
      };

      if (this.props.mapCharList.some(mapChar => mapChar.mapId === mapCharData.mapId && mapChar.charId === mapCharData.charId)){
        this.props.editMapChar(mapCharData);
      } else {
        this.props.addMapChar(mapCharData);
      }

      if (charData.general.privacy !== CHAR_PRIVACY_LEVEL_THREE && !this.props.mapData.private){
        socket.emit('mapChar', this.props.global.roomId, mapCharData);
      }
    } else if (this.props.mapData.mode === MAP_MODE_PLACE_GEO){
      const geoData = {
        geoId:  uuid.v4(),
        mapId:  this.props.mapData.mapId,
        left:   e.nativeEvent.offsetX,
        top:    e.nativeEvent.offsetY,
        width:  100,
        height: 100
      };

      this.props.addGeo(geoData);
    }

    this.props.setCharToPlace(this.props.mapData.mapId, '');
    this.props.setMapMode(this.props.mapData.mapId, '');
  }

  render() {
    const togglePlaceCharClass = this.props.mapData.mode === MAP_MODE_PLACE_CHAR ? 'is-place-char-active' : '';
    const togglePlaceGeoClass  = this.props.mapData.mode === MAP_MODE_PLACE_GEO ? 'is-place-geo-active' : '';
    const toggleMapGridClass   = this.props.mapData.displayMapGrid ? 'is-grid-active' : '';

    const mapChar = this.props.mapCharList.filter(mapChar => mapChar.mapId === this.props.mapData.mapId).map(mapChar => {
      return <CharDot key={mapChar.charId} mapScale={this.props.mapData.scale} mapPrivate={this.props.mapData.private} charPlot={mapChar} charData={this.props.charList.find(char => mapChar.charId === char.charId)}/>;
    });

    const geo = this.props.geoList.filter(geo => geo.mapId === this.props.mapData.mapId).map(geo => {
      return <Geo key={geo.geoId} geoData={geo}/>;
    });

    return (
      <div className="map-img-cont p-relative f-grow-1 p-1" onWheel={this.handleWheel}>
        <div className={`map-img-overlay font-size-lg font-weight-bold d-inline-block p-absolute align-center ${togglePlaceCharClass} ${togglePlaceGeoClass} ${toggleMapGridClass}`} onClick={this.handleImageClick} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} onTouchStart={this.handleTouchStart} onTouchEnd={this.handleTouchEnd} style={{ left: this.props.mapData.left, top: this.props.mapData.top, transform: `scale(${this.props.mapData.scale})`}}>
          {geo}
          {mapChar}
          <img className="map-img p-relative align-center" src={this.props.mapData.src} alt={this.props.mapData.name}/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
