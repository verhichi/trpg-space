import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editGeo } from '../../../../../../../redux/actions/geo';
// import socket from '../../../../../../../socket/socketClient';

// Style
import './geo.scss';

// Component
import GeoCornerTopLeft from './geoCorner/geoCornerTopleft';
import GeoCornerTopRight from './geoCorner/geoCornerTopRight';
import GeoCornerBottomRight from './geoCorner/geoCornerBottomRight';
import GeoCornerBottomLeft from './geoCorner/geoCornerBottomLeft';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    global:         state.global,
    displaySetting: state.displaySetting
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editGeo: (geoData) => dispatch(editGeo(geoData))
  };
}

class Geo extends Component {
  constructor (props){
    super(props);
    this.state = {
      isGeoMoveMode: false,
      offsetX: 0,
      offsetY: 0
    };

    this.handleMouseDown  = this.handleMouseDown.bind(this);
    this.handleMouseMove  = this.handleMouseMove.bind(this);
    this.handleMouseUp    = this.handleMouseUp.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove  = this.handleTouchMove.bind(this);
    this.handleTouchEnd   = this.handleTouchEnd.bind(this);
    this.handleClick      = this.handleClick.bind(this);
  }

  handleClick (e){
    e.stopPropagation();
    e.preventDefault();
  }

  handleMouseDown (e){
    e.stopPropagation();
    e.preventDefault();

    this.setState({
      isGeoMoveMode: true,
      offsetX:       e.nativeEvent.offsetX,
      offsetY:       e.nativeEvent.offsetY
      // offsetX: Math.floor(e.nativeEvent.offsetX * this.props.mapData.scale),
      // offsetY: Math.floor(e.nativeEvent.offsetY * this.props.mapData.scale)
    });

    document.querySelector('.map-img-cont').addEventListener('mousemove', this.handleMouseMove);
    document.querySelector('.map-img-cont').addEventListener('mouseleave', this.handleMouseLeave);
  }

  handleMouseMove (e){
    e.stopPropagation();
    e.preventDefault();

    if (this.state.isGeoMoveMode){
      this.props.editGeo({
        geoId:  this.props.geoData.geoId,
        mapId:  this.props.geoData.mapId,
        left:   Math.floor((e.pageX - document.querySelector('.map-img-overlay').getBoundingClientRect().left) / this.props.mapData.scale) - this.state.offsetX,
        top:    Math.floor((e.pageY - document.querySelector('.map-img-overlay').getBoundingClientRect().top) / this.props.mapData.scale) - this.state.offsetY,
        width:  this.props.geoData.width,
        height: this.props.geoData.height
      });
    }
  }

  handleMouseUp (e){
    e.stopPropagation();
    e.preventDefault();

    if (this.state.isGeoMoveMode){
      document.querySelector('.map-img-cont').removeEventListener('mousemove', this.handleMouseMove);
      document.querySelector('.map-img-cont').removeEventListener('mouseleave', this.handleMouseLeave);
      this.setState({ isGeoMoveMode: false });
    }
  }

  handleMouseLeave (e){
    e.stopPropagation();
    e.preventDefault();

    if (this.state.isGeoMoveMode){
      document.querySelector('.map-img-cont').removeEventListener('mousemove', this.handleMouseMove);
      document.querySelector('.map-img-cont').removeEventListener('mouseleave', this.handleMouseLeave);
      this.setState({ isGeoMoveMode: false });
    }
  }

  handleTouchStart (e){
    e.stopPropagation();

    const header      = document.querySelector('header');
    const roomTopCont = document.querySelector('.room-top-cont');
    const mapTabCont  = document.querySelector('.map-tab-cont');
    const mapToolbar  = document.querySelector('.map-toolbar');

    const mapOffsetHeight = header.offsetHeight + roomTopCont.offsetHeight + mapToolbar.offsetHeight + mapTabCont.offsetHeight;
    const sidebarWidth    = this.props.displaySetting.displaySidebar ? document.querySelector('.list-cont').offsetWidth : 0;

    this.setState({
      isGeoMoveMode: true,
      offsetX:       Math.floor((e.touches[0].pageX - sidebarWidth    - this.props.mapData.left) / this.props.mapData.scale) - this.props.geoData.left,
      offsetY:       Math.floor((e.touches[0].pageY - mapOffsetHeight - this.props.mapData.top)  / this.props.mapData.scale) - this.props.geoData.top,
    });

    document.querySelector('.map-img-cont').addEventListener('touchmove', this.handleTouchMove);
  }


  handleTouchMove (e){
    e.stopPropagation();
    e.preventDefault();

    if (this.state.isGeoMoveMode){
      this.props.editGeo({
        geoId:  this.props.geoData.geoId,
        mapId:  this.props.geoData.mapId,
        left:   Math.floor((e.touches[0].pageX - document.querySelector('.map-img-overlay').getBoundingClientRect().left) / this.props.mapData.scale) - this.state.offsetX,
        top:    Math.floor((e.touches[0].pageY - document.querySelector('.map-img-overlay').getBoundingClientRect().top)  / this.props.mapData.scale) - this.state.offsetY,
        width:  this.props.geoData.width,
        height: this.props.geoData.height
      });
    }
  }

  handleTouchEnd (e){
    e.stopPropagation();

    if (this.state.isGeoMoveMode){
      document.querySelector('.map-img-cont').removeEventListener('touchmove', this.handleTouchMove);
      this.setState({ isGeoMoveMode: false });
    }
  }

  render() {
    return (
      <div className="map-geo" onClick={this.handleClick} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} onTouchStart={this.handleTouchStart} onTouchEnd={this.handleTouchEnd} style={{left: this.props.geoData.left, top: this.props.geoData.top, width: this.props.geoData.width, height: this.props.geoData.height}}>
        <GeoCornerBottomRight mapData={this.props.mapData} geoData={this.props.geoData}/>
        <GeoCornerBottomLeft  mapData={this.props.mapData} geoData={this.props.geoData}/>
        <GeoCornerTopRight    mapData={this.props.mapData} geoData={this.props.geoData}/>
        <GeoCornerTopLeft     mapData={this.props.mapData} geoData={this.props.geoData}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Geo);
