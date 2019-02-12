import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editGeo } from '../../../../../../../../redux/actions/geo';
import { MIN_GEO_LENGTH } from '../../../../../../../../constants/constants';
// import socket from '../../../../../../../socket/socketClient';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { displaySetting: state.displaySetting };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editGeo: (geoData) => dispatch(editGeo(geoData))
  };
}

class GeoCornerBottomLeft extends Component {
  constructor (props){
    super(props);
    this.state = {
      isGeoResizeMode: false,
      originalLeft:    0,
      originalWidth:   0
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
      isGeoResizeMode: true,
      originalLeft:    this.props.geoData.left,
      originalWidth:   this.props.geoData.width
    });
    document.querySelector('.map-img-cont').addEventListener('mousemove', this.handleMouseMove);
    document.querySelector('.map-img-cont').addEventListener('mouseup', this.handleMouseUp);
    document.querySelector('.map-img-cont').addEventListener('mouseleave', this.handleMouseLeave);
  }

  handleMouseMove (e){
    e.stopPropagation();
    e.preventDefault();

    if (this.state.isGeoResizeMode){
      const header      = document.querySelector('header');
      const roomTopCont = document.querySelector('.room-top-cont');
      const mapTabCont  = document.querySelector('.map-tab-cont');
      const mapToolbar  = document.querySelector('.map-toolbar');

      const mapOffsetHeight = header.offsetHeight + roomTopCont.offsetHeight + mapToolbar.offsetHeight + mapTabCont.offsetHeight;
      const sidebarWidth    = this.props.displaySetting.displaySidebar ? document.querySelector('.list-cont').offsetWidth : 0;

      const calcLeft   = Math.floor((e.pageX - this.props.mapData.left - sidebarWidth) / this.props.mapData.scale);
      const calcWidth  = this.state.originalWidth + this.state.originalLeft + Math.floor((this.props.mapData.left - (e.pageX - sidebarWidth)) / this.props.mapData.scale);
      const calcHeight = Math.floor((e.pageY - this.props.mapData.top - mapOffsetHeight) / this.props.mapData.scale) - this.props.geoData.top;

      const newHeight = calcHeight < MIN_GEO_LENGTH
                          ? MIN_GEO_LENGTH
                          : calcHeight;

      const newWidth = calcWidth < MIN_GEO_LENGTH
                         ? MIN_GEO_LENGTH
                         : calcWidth;

      const newLeft  = calcWidth < MIN_GEO_LENGTH
                         ? this.props.geoData.left
                         : calcLeft;

      this.props.editGeo({
        geoId:  this.props.geoData.geoId,
        mapId:  this.props.geoData.mapId,
        left:   newLeft,
        top:    this.props.geoData.top,
        width:  newWidth,
        height: newHeight
      });
    }
  }

  handleMouseUp (e){
    e.stopPropagation();
    e.preventDefault();

    if (this.state.isGeoResizeMode){
      document.querySelector('.map-img-cont').removeEventListener('mousemove', this.handleMouseMove);
      document.querySelector('.map-img-cont').removeEventListener('mouseup', this.handleMouseUp);
      document.querySelector('.map-img-cont').removeEventListener('mouseleave', this.handleMouseLeave);
      this.setState({ isGeoResizeMode: false });
    }
  }

  handleMouseLeave (e){
    e.stopPropagation();
    e.preventDefault();

    if (this.state.isGeoResizeMode){
      document.querySelector('.map-img-cont').removeEventListener('mousemove', this.handleMouseMove);
      document.querySelector('.map-img-cont').removeEventListener('mouseup', this.handleMouseUp);
      document.querySelector('.map-img-cont').removeEventListener('mouseleave', this.handleMouseLeave);
      this.setState({ isGeoResizeMode: false });
    }
  }

  handleTouchStart (e){
    e.stopPropagation();

    this.setState({
      isGeoResizeMode: true,
      originalLeft:    this.props.geoData.left,
      originalWidth:   this.props.geoData.width
    });
    document.querySelector('.map-img-cont').addEventListener('touchmove', this.handleTouchMove);
    document.querySelector('.map-img-cont').addEventListener('touchend',  this.handleTouchEnd);
  }

  handleTouchMove (e){
    e.stopPropagation();
    e.preventDefault();

    if (this.state.isGeoResizeMode){
      const header      = document.querySelector('header');
      const roomTopCont = document.querySelector('.room-top-cont');
      const mapTabCont  = document.querySelector('.map-tab-cont');
      const mapToolbar  = document.querySelector('.map-toolbar');

      const mapOffsetHeight = header.offsetHeight + roomTopCont.offsetHeight + mapToolbar.offsetHeight + mapTabCont.offsetHeight;
      const sidebarWidth    = this.props.displaySetting.displaySidebar ? document.querySelector('.list-cont').offsetWidth : 0;

      const calcLeft   = Math.floor((e.touches[0].pageX - this.props.mapData.left - sidebarWidth) / this.props.mapData.scale);
      const calcWidth  = this.state.originalWidth + this.state.originalLeft + Math.floor((this.props.mapData.left - (e.touches[0].pageX - sidebarWidth)) / this.props.mapData.scale);
      const calcHeight = Math.floor((e.touches[0].pageY - this.props.mapData.top - mapOffsetHeight) / this.props.mapData.scale) - this.props.geoData.top;

      const newHeight = calcHeight < MIN_GEO_LENGTH
                          ? MIN_GEO_LENGTH
                          : calcHeight;

      const newWidth = calcWidth < MIN_GEO_LENGTH
                         ? MIN_GEO_LENGTH
                         : calcWidth;

      const newLeft  = calcWidth < MIN_GEO_LENGTH
                         ? this.props.geoData.left
                         : calcLeft;

      this.props.editGeo({
        geoId:  this.props.geoData.geoId,
        mapId:  this.props.geoData.mapId,
        left:   newLeft,
        top:    this.props.geoData.top,
        width:  newWidth,
        height: newHeight
      });
    }
  }

  handleTouchEnd (e){
    e.stopPropagation();

    if (this.state.isGeoResizeMode){
      document.querySelector('.map-img-cont').removeEventListener('touchmove', this.handleTouchMove);
      document.querySelector('.map-img-cont').removeEventListener('touchend', this.handleTouchEnd);
      this.setState({ isGeoResizeMode: false });
    }
  }

  render() {
    return (
      <div className="map-geo-corner map-geo-corner-bottom-left" onMouseDown={this.handleMouseDown} onTouchStart={this.handleTouchStart}></div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GeoCornerBottomLeft);
