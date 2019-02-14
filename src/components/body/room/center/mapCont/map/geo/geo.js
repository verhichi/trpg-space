import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editGeo, removeGeo } from '../../../../../../../redux/actions/geo';
import { setSelGeo, editGeoOn, editGeoOff } from '../../../../../../../redux/actions/map';
import socket from '../../../../../../../socket/socketClient';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './geo.scss';

// Component
import GeoCornerTopLeft     from './geoCorner/geoCornerTopleft';
import GeoCornerTopRight    from './geoCorner/geoCornerTopRight';
import GeoCornerBottomRight from './geoCorner/geoCornerBottomRight';
import GeoCornerBottomLeft  from './geoCorner/geoCornerBottomLeft';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    global:         state.global,
    displaySetting: state.displaySetting
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editGeo:    (geoData)      => dispatch(editGeo(geoData)),
    removeGeo:  (geoId, mapId) => dispatch(removeGeo(geoId, mapId)),
    setSelGeo:  (mapId, geoId) => dispatch(setSelGeo(mapId, geoId)),
    editGeoOn:  (mapId)        => dispatch(editGeoOn(mapId)),
    editGeoOff: (mapId)        => dispatch(editGeoOff(mapId))
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

    this.geoRef                = React.createRef();
    this.handleMouseDown       = this.handleMouseDown.bind(this);
    this.handleMouseMove       = this.handleMouseMove.bind(this);
    this.handleMouseUp         = this.handleMouseUp.bind(this);
    this.handleMouseLeave      = this.handleMouseLeave.bind(this);
    this.handleTouchStart      = this.handleTouchStart.bind(this);
    this.handleTouchMove       = this.handleTouchMove.bind(this);
    this.handleTouchEnd        = this.handleTouchEnd.bind(this);
    this.handleGeoClick        = this.handleGeoClick.bind(this);
    this.handleToggleEditClick = this.handleToggleEditClick.bind(this);
    this.handleRemoveGeoClick  = this.handleRemoveGeoClick.bind(this);
    this.handleOutsideClick    = this.handleOutsideClick.bind(this);
  }

  componentWillUnmount (){
    window.removeEventListener('click', this.handleOutsideClick, false);
  }

  handleGeoClick (e){
    e.stopPropagation();
    e.preventDefault();

    if (this.props.global.id === this.props.mapData.ownerId && !this.props.mapData.isGeoEdit && this.geoRef.current.id !== this.props.mapData.selGeo){
      this.props.setSelGeo(this.props.mapData.mapId, this.props.geoData.geoId);
      window.addEventListener('click', this.handleOutsideClick, false);
    }
  }

  handleOutsideClick (e){
    if (this.geoRef.current.contains(e.target)) return;

    if (!this.props.mapData.isGeoEdit){
      this.props.setSelGeo(this.props.mapData.mapId, '');
      window.removeEventListener('click', this.handleOutsideClick, false);
    }
  }

  handleToggleEditClick (e){
    e.stopPropagation();
    e.preventDefault();

    if (this.props.mapData.isGeoEdit){
      if (!this.props.mapData.private){
        socket.emit('geo', this.props.global.roomId, this.props.geoData);
      }
      this.props.setSelGeo(this.props.mapData.mapId, '');
      window.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.props.mapData.isGeoEdit
      ? this.props.editGeoOff(this.props.mapData.mapId)
      : this.props.editGeoOn(this.props.mapData.mapId);
  }

  handleRemoveGeoClick (e){
    e.stopPropagation();
    e.preventDefault();

    this.props.editGeoOff(this.props.mapData.mapId);
    this.props.removeGeo(this.props.geoData.geoId, this.props.mapData.mapId);
    if (!this.props.mapData.private){
      socket.emit('geo', this.props.global.roomId, this.props.geoData.geoId, this.props.mapData.mapId);
    }
  }

  handleMouseDown (e){
    e.preventDefault();

    if (this.props.global.id === this.props.mapData.ownerId && this.props.mapData.isGeoEdit && this.props.mapData.selGeo === this.props.geoData.geoId){
      e.stopPropagation();

      this.setState({
        isGeoMoveMode: true,
        offsetX:       e.nativeEvent.offsetX,
        offsetY:       e.nativeEvent.offsetY
      });

      document.querySelector('.map-img-cont').addEventListener('mousemove', this.handleMouseMove);
      document.querySelector('.map-img-cont').addEventListener('mouseleave', this.handleMouseLeave);
    }
  }

  handleMouseMove (e){
    e.preventDefault();

    if (this.props.mapData.isGeoEdit){
      e.stopPropagation();

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
  }

  handleMouseUp (e){
    e.preventDefault();

    if (this.props.mapData.isGeoEdit && this.props.mapData.selGeo === this.props.geoData.geoId){
      e.stopPropagation();

      if (this.state.isGeoMoveMode){
        document.querySelector('.map-img-cont').removeEventListener('mousemove', this.handleMouseMove);
        document.querySelector('.map-img-cont').removeEventListener('mouseleave', this.handleMouseLeave);
        this.setState({ isGeoMoveMode: false });
      }
    }
  }

  handleMouseLeave (e){
    e.stopPropagation();
    e.preventDefault();

    if (this.state.isGeoMoveMode){
      if (!this.props.mapData.private){
        socket.emit('geo', this.props.global.roomId, this.props.geoData);
      }

      this.props.editGeoOff(this.props.mapData.mapId);
      this.props.setSelGeo(this.props.mapData.mapId, '');
      this.setState({ isGeoMoveMode: false });

      document.querySelector('.map-img-cont').removeEventListener('mousemove', this.handleMouseMove);
      document.querySelector('.map-img-cont').removeEventListener('mouseleave', this.handleMouseLeave);
    }
  }

  handleTouchStart (e){
    if (this.props.global.id === this.props.mapData.ownerId && this.props.mapData.isGeoEdit && this.props.mapData.selGeo === this.props.geoData.geoId){
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

  }


  handleTouchMove (e){
    e.preventDefault();

    if (this.props.mapData.isGeoEdit && this.props.mapData.selGeo === this.props.geoData.geoId){
      e.stopPropagation();

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
  }

  handleTouchEnd (e){
    e.stopPropagation();

    if (this.state.isGeoMoveMode && this.props.mapData.selGeo === this.props.geoData.geoId){
      document.querySelector('.map-img-cont').removeEventListener('touchmove', this.handleTouchMove);
      this.setState({ isGeoMoveMode: false });
    }
  }

  render() {
    const selectClass = this.props.mapData.selGeo === this.props.geoData.geoId ? 'is-selected' : '';
    const editClass   = this.props.mapData.isGeoEdit && this.props.mapData.selGeo === this.props.geoData.geoId ? 'is-editable' : '';

    const toolbarIconEditClass   = this.props.mapData.isGeoEdit ? 'd-none' : '';
    const toolbarIconSubmitClass = this.props.mapData.isGeoEdit ? '' : 'd-none';

    return (
      <div className={`map-geo-cont ${selectClass} ${editClass}`} style={{left: this.props.geoData.left, top: this.props.geoData.top, width: this.props.geoData.width, height: this.props.geoData.height}}>
        <div id={this.props.geoData.geoId} className="h-100 w-100 p-absolute" onClick={this.handleGeoClick} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} onTouchStart={this.handleTouchStart} onTouchEnd={this.handleTouchEnd} ref={this.geoRef}>
          <GeoCornerBottomRight mapData={this.props.mapData} geoData={this.props.geoData}/>
          <GeoCornerBottomLeft  mapData={this.props.mapData} geoData={this.props.geoData}/>
          <GeoCornerTopRight    mapData={this.props.mapData} geoData={this.props.geoData}/>
          <GeoCornerTopLeft     mapData={this.props.mapData} geoData={this.props.geoData}/>
        </div>

        <div className="map-geo-toolbar">
          <div className="p-1 cursor-pointer" onClick={this.handleToggleEditClick}>
            <span className={toolbarIconEditClass}><FontAwesomeIcon icon="arrows-alt"/></span>
            <span className={toolbarIconSubmitClass}><FontAwesomeIcon icon="check"/></span>
          </div>
          <div className="p-1 cursor-pointer" onClick={this.handleRemoveGeoClick}>
            <FontAwesomeIcon icon="trash"/>
          </div>
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Geo);
