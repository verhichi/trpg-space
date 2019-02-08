import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MAP_MODE_PLACE_CHAR,  CHAR_PRIVACY_LEVEL_THREE } from '../../../../../../constants/constants';
import { setMapMode, setCharToPlace, editMapPosition, editMapScale, addMapChar, editMapChar } from '../../../../../../redux/actions/map';
import socket from '../../../../../../socket/socketClient';

// Style
import './map.scss';

// Component
import CharDot from './charDot/charDot';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    global:         state.global,
    charList:       state.charList,
    mapSetting:     state.mapSetting,
    displaySetting: state.displaySetting
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    setMapMode:      (mapId, mode)      => dispatch(setMapMode(mapId, mode)),
    addMapChar:      (mapId, charData)  => dispatch(addMapChar(mapId, charData)),
    editMapChar:     (mapId, charData)  => dispatch(editMapChar(mapId, charData)),
    setCharToPlace:  (mapId, charId)    => dispatch(setCharToPlace(mapId, charId)),
    editMapPosition: (mapId, left, top) => dispatch(editMapPosition(mapId, left, top)),
    editMapScale:    (mapId, scale)     => dispatch(editMapScale(mapId, scale))
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
      const charDot = {
        ownerId: charData.ownerId,
        charId:  this.props.mapData.charToPlace,
        privacy: charData.general.privacy,
        left:    e.nativeEvent.offsetX,
        top:     e.nativeEvent.offsetY
      };

      if (this.props.mapData.charDots.some(char => char.charId === charDot.charId)){
        this.props.editMapChar(this.props.mapData.mapId, charDot);
      } else {
        this.props.addMapChar(this.props.mapData.mapId, charDot);
      }

      if (charData.general.privacy !== CHAR_PRIVACY_LEVEL_THREE && this.props.mapData.shareWithAll){
        socket.emit('mapChar', this.props.global.roomId, this.props.mapData.mapId, charDot);
      }
    }

    this.props.setCharToPlace(this.props.mapData.mapId, '');
    this.props.setMapMode(this.props.mapData.mapId, '');
  }

  render() {
    const togglePlaceCharClass = this.props.mapData.mode === MAP_MODE_PLACE_CHAR ? 'is-place-char-active' : '';
    const toggleMapGridClass   = this.props.mapData.displayMapGrid ? 'is-grid-active' : '';

    const mapCharDots = this.props.mapData.charDots.map(mapChar => {
      return <CharDot key={mapChar.charId} mapShareWithAll={this.props.mapData.shareWithAll} charPlot={mapChar} charData={this.props.charList.find(char => mapChar.charId === char.charId)}/>;
    });

    return (
      <div className="map-img-cont p-relative f-grow-1 p-1" onWheel={this.handleWheel}>
        <div className={`map-img-overlay font-size-lg font-weight-bold d-inline-block p-absolute align-center ${togglePlaceCharClass} ${toggleMapGridClass}`}  onClick={this.handleImageClick} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} onTouchStart={this.handleTouchStart} onTouchEnd={this.handleTouchEnd} style={{ left: this.props.mapData.left, top: this.props.mapData.top, transform: `scale(${this.props.mapData.scale})`}}>
          {mapCharDots}
          <img className="map-img p-relative align-center" src={this.props.mapData.src} alt={this.props.mapData.name}/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
