import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CHAR_PRIVACY_LEVEL_ZERO, CHAR_PRIVACY_LEVEL_ONE, CHAR_PRIVACY_LEVEL_THREE, STATUS_TYPE_VALUE, STATUS_TYPE_PARAM } from '../../../../../../../constants/constants';
import { editMapChar } from '../../../../../../../redux/actions/mapChar';
import socket from '../../../../../../../socket/socketClient';

// Style
import './charDot.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    global:         state.global,
    displaySetting: state.displaySetting
  };
};

const mapDispatchToProps = (dispatch) => {
  return { editMapChar: (mapCharData) => dispatch(editMapChar(mapCharData)) };
}

class CharDot extends Component {
  constructor (props){
    super(props);
    this.state = {
      isCharMoveMode: false,
      offsetX: 0,
      offsetY: 0
    };

    this.handleMouseDown  = this.handleMouseDown.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleMouseUp    = this.handleMouseUp.bind(this);
    this.handleTouchEnd   = this.handleTouchEnd.bind(this);
    this.handleMouseMove  = this.handleMouseMove.bind(this);
    this.handleTouchMove  = this.handleTouchMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  componentWillUnmount (){
    document.querySelector('.map-img-overlay').removeEventListener('mousemove', this.handleMouseMove);
    document.querySelector('.map-img-overlay').removeEventListener('touchmove', this.handleMouseMove);
    document.querySelector('.map-img-cont').removeEventListener('mouseleave', this.handleMouseLeave);
  }

  handleMouseDown (e){
    e.stopPropagation();
    e.preventDefault();

    const adjustOffsetX = e.nativeEvent.offsetX <= 10 ? 10 : e.nativeEvent.offsetX; // prevent mouse from falling outside the charDot
    const adjustOffsetY = e.nativeEvent.offsetY <= 10 ? 10 : e.nativeEvent.offsetY; // prevent mouse from falling outside the charDot

    this.setState({
      isCharMoveMode: true,
      offsetX:        adjustOffsetX,
      offsetY:        adjustOffsetY
    });

    document.querySelector('.map-img-overlay').addEventListener('mousemove', this.handleMouseMove);
    document.querySelector('.map-img-cont').addEventListener('mouseleave', this.handleMouseLeave);
  }

  handleMouseMove (e){
    e.stopPropagation();
    e.preventDefault();

    if (this.state.isCharMoveMode){
      this.props.editMapChar({
        mapId:  this.props.displaySetting.displayMap,
        charId: this.props.charData.charId,
        left:   Math.floor((e.pageX - document.querySelector('.map-img-overlay').getBoundingClientRect().left) / this.props.mapScale) - this.state.offsetX,
        top:    Math.floor((e.pageY - document.querySelector('.map-img-overlay').getBoundingClientRect().top)  / this.props.mapScale) - this.state.offsetY
      });
    }
  }

  handleMouseUp (e){
    e.stopPropagation();
    e.preventDefault();

    if (this.state.isCharMoveMode && this.props.charData.general.privacy !== CHAR_PRIVACY_LEVEL_THREE && !this.props.mapPrivate){
      socket.emit('mapChar', this.props.global.roomId, {
        mapId:  this.props.displaySetting.displayMap,
        charId: this.props.charData.charId,
        left:   this.props.charPlot.left,
        top:    this.props.charPlot.top
      });
    }
    document.querySelector('.map-img-overlay').removeEventListener('mousemove', this.handleMouseMove);
    document.querySelector('.map-img-cont').removeEventListener('mouseleave', this.handleMouseLeave);
    this.setState({ isCharMoveMode: false });
  }


  handleMouseLeave (e){
    e.stopPropagation();
    e.preventDefault();

    if (this.state.isCharMoveMode && this.props.charData.general.privacy !== CHAR_PRIVACY_LEVEL_THREE && !this.props.mapPrivate){
      socket.emit('mapChar', this.props.global.roomId, {
        mapId:  this.props.displaySetting.displayMap,
        charId: this.props.charData.charId,
        left:   this.props.charPlot.left,
        top:    this.props.charPlot.top
      });
    }

    this.setState({ isCharMoveMode: false });
    document.querySelector('.map-img-overlay').removeEventListener('mousemove', this.handleMouseMove);
    document.querySelector('.map-img-cont').removeEventListener('mouseleave', this.handleMouseLeave);
  }

  handleTouchStart (e){
    e.stopPropagation();

    this.setState({
      isCharMoveMode: true,
      offsetX: Math.floor(e.target.offsetWidth / 2),
      offsetY: Math.floor(e.target.offsetHeight / 2)
    });

    document.querySelector('.map-img-overlay').addEventListener('touchmove', this.handleTouchMove);
  }

  handleTouchMove (e){
    e.stopPropagation();
    e.preventDefault();

    if (this.state.isCharMoveMode){
      this.props.editMapChar({
        mapId:  this.props.displaySetting.displayMap,
        charId: this.props.charData.charId,
        left:    Math.floor((e.touches[0].pageX - document.querySelector('.map-img-overlay').getBoundingClientRect().left - this.state.offsetX) / this.props.mapScale),
        top:     Math.floor((e.touches[0].pageY - document.querySelector('.map-img-overlay').getBoundingClientRect().top - this.state.offsetY) / this.props.mapScale)
      });
    }
  }

  handleTouchEnd (e){
    e.stopPropagation();

    if (this.state.isCharMoveMode && this.props.charData.general.privacy !== CHAR_PRIVACY_LEVEL_THREE && !this.props.mapPrivate){
      socket.emit('mapChar', this.props.global.roomId, {
        mapId:  this.props.displaySetting.displayMap,
        charId: this.props.charData.charId,
        left:   this.props.charPlot.left,
        top:    this.props.charPlot.top
      });
    }
    document.querySelector('.map-img-overlay').removeEventListener('touchmove', this.handleTouchMove);
    this.setState({ isCharMoveMode: false });
  }

  render() {
    const isMovingClass = this.state.isCharMoveMode ? 'is-moving' : 'is-static';
    const showName      = this.props.charData.general.privacy <= CHAR_PRIVACY_LEVEL_ONE || this.props.charData.ownerId === this.props.global.id;
    const showStat      = this.props.charData.general.privacy <= CHAR_PRIVACY_LEVEL_ZERO || this.props.charData.ownerId === this.props.global.id;
    const charName      = showName ? this.props.charData.general.name : 'UNKNOWN';

    const charDataType = {
      [STATUS_TYPE_VALUE]: (status) => (<div className="font-size-sm one-line-ellipsis">{status.label}: {showStat ? status.value : '???'}</div>),
      [STATUS_TYPE_PARAM]: (status) => (<div className="font-size-sm one-line-ellipsis">{status.label}: {showStat ? status.value : '???'} / {showStat ? status.maxValue : '???'}</div>)
    }

    const statList = this.props.charData.status.map(status => charDataType[status.type](status));

    return (
      <div className={`map-char-profile cursor-grabbable ${isMovingClass}`} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} onTouchStart={this.handleTouchStart} onTouchEnd={this.handleTouchEnd} style={{borderColor: this.props.charData.general.color, backgroundImage: `url(${this.props.charData.general.image})`, left: this.props.charPlot.left, top: this.props.charPlot.top}}>
        <div className="map-char-balloon p-absolute p-1 align-left cursor-default">
          <div className="font-size-md font-weight-bold pb-1 one-line-ellipsis">{charName}</div>
          { statList }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharDot);
