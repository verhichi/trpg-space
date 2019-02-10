import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editGeo } from '../../../../../../../redux/actions/geo';
// import socket from '../../../../../../../socket/socketClient';

// Style
import './geo.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { global: state.global };
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
      offsetX: Math.floor(e.nativeEvent.offsetX * this.props.mapScale),
      offsetY: Math.floor(e.nativeEvent.offsetY * this.props.mapScale)
    });

    document.querySelector('.map-img-cont').addEventListener('mousemove', this.handleMouseMove);
    document.querySelector('.map-img-cont').addEventListener('mouseleave', this.handleMouseLeave);
  }

  handleTouchStart (e){
    e.stopPropagation();
    e.preventDefault();

    this.setState({
      isGeoMoveMode: true,
      offsetX: Math.floor(e.target.offsetWidth / 2),
      offsetY: Math.floor(e.target.offsetHeight / 2)
    });

    document.querySelector('.map-img-cont').addEventListener('touchmove', this.handleTouchMove);
  }

  handleMouseMove (e){
    e.stopPropagation();
    e.preventDefault();

    if (this.state.isGeoMoveMode){
      this.props.editGeo({
        geoId:  this.props.geoData.geoId,
        mapId:  this.props.geoData.mapId,
        left:   Math.floor((e.pageX - document.querySelector('.map-img-overlay').getBoundingClientRect().left - this.state.offsetX) / this.props.mapScale),
        top:    Math.floor((e.pageY - document.querySelector('.map-img-overlay').getBoundingClientRect().top - this.state.offsetY) / this.props.mapScale),
        width:  this.props.geoData.width,
        height: this.props.geoData.height
      });
    }
  }

  handleTouchMove (e){
    e.stopPropagation();
    e.preventDefault();

    if (this.state.isGeoMoveMode){
      this.props.editGeo({
        geoId:  this.props.geoData.geoId,
        mapId:  this.props.geoData.mapId,
        left:   Math.floor((e.touches[0].pageX - document.querySelector('.map-img-overlay').getBoundingClientRect().left - this.state.offsetX) / this.props.mapScale),
        top:    Math.floor((e.touches[0].pageY - document.querySelector('.map-img-overlay').getBoundingClientRect().top - this.state.offsetY) / this.props.mapScale),
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

  handleTouchEnd (e){
    e.stopPropagation();
    e.preventDefault();

    if (this.state.isGeoMoveMode){
      document.querySelector('.map-img-cont').removeEventListener('touchmove', this.handleTouchMove);
      this.setState({ isGeoMoveMode: false });
    }
  }

  render() {
    return (
      <div className="map-geo" onClick={this.handleClick} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} onTouchStart={this.handleTouchStart} onTouchEnd={this.handleTouchEnd} style={{left: this.props.geoData.left, top: this.props.geoData.top, width: this.props.geoData.width, height: this.props.geoData.height}}>
        <div className="map-geo-corner map-geo-corner-top-left"></div>
        <div className="map-geo-corner map-geo-corner-top-right"></div>
        <div className="map-geo-corner map-geo-corner-bottom-left"></div>
        <div className="map-geo-corner map-geo-corner-bottom-right"></div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Geo);
