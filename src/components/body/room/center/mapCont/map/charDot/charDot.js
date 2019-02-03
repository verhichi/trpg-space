import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CHAR_PRIVACY_LEVEL_ZERO, CHAR_PRIVACY_LEVEL_ONE, STATUS_TYPE_VALUE, STATUS_TYPE_PARAM } from '../../../../../../../constants/constants';
import { editMapChar } from '../../../../../../../redux/actions/char';
import socket from '../../../../../../../socket/socketClient';

// Style
import './charDot.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    global:     state.global,
    mapSetting: state.mapSetting
  };
};

const mapDispatchToProps = (dispatch) => {
  return { editMapChar: (charData) => dispatch(editMapChar(charData)) };
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
      offsetX: Math.floor(adjustOffsetX * this.props.mapSetting.image.scale),
      offsetY: Math.floor(adjustOffsetY * this.props.mapSetting.image.scale)
    });
    document.querySelector('.map-img-overlay').addEventListener('mousemove', this.handleMouseMove);
    document.querySelector('.map-img-cont').addEventListener('mouseleave', this.handleMouseLeave);
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

  handleMouseMove (e){
    e.stopPropagation();
    e.preventDefault();

    if (this.state.isCharMoveMode){
      this.props.editMapChar({
        charId: this.props.charData.charId,
        x: Math.floor((e.pageX - document.querySelector('.map-img-overlay').getBoundingClientRect().left - this.state.offsetX) / this.props.mapSetting.image.scale),
        y: Math.floor((e.pageY - document.querySelector('.map-img-overlay').getBoundingClientRect().top - this.state.offsetY) / this.props.mapSetting.image.scale)
      });
    }
  }

  handleTouchMove (e){
    e.stopPropagation();
    e.preventDefault();

    if (this.state.isCharMoveMode){
      this.props.editMapChar({
        charId: this.props.charData.charId,
        x: Math.floor((e.touches[0].pageX - document.querySelector('.map-img-overlay').getBoundingClientRect().left - this.state.offsetX) / this.props.mapSetting.image.scale),
        y: Math.floor((e.touches[0].pageY - document.querySelector('.map-img-overlay').getBoundingClientRect().top - this.state.offsetY) / this.props.mapSetting.image.scale)
      });
    }
  }

  handleMouseUp (e){
    e.stopPropagation();
    e.preventDefault();

    if (this.state.isCharMoveMode){
      socket.emit('mapChar', this.props.global.roomId, {
        charId: this.props.charData.charId,
        x: this.props.charData.map.x,
        y: this.props.charData.map.y
      });
    }
    document.querySelector('.map-img-overlay').removeEventListener('mousemove', this.handleMouseMove);
    document.querySelector('.map-img-cont').removeEventListener('mouseleave', this.handleMouseLeave);
    this.setState({ isCharMoveMode: false });
  }

  handleTouchEnd (e){
    e.stopPropagation();

    if (this.state.isCharMoveMode){
      socket.emit('mapChar', this.props.global.roomId, {
        charId: this.props.charData.charId,
        x: this.props.charData.map.x,
        y: this.props.charData.map.y
      });
    }
    document.querySelector('.map-img-overlay').removeEventListener('touchmove', this.handleTouchMove);
    this.setState({ isCharMoveMode: false });
  }

  handleMouseLeave (e){
    e.stopPropagation();
    e.preventDefault();

    console.log('mouseleave event fired!');

    if (this.state.isCharMoveMode){
      socket.emit('mapChar', this.props.global.roomId, {
        charId: this.props.charData.charId,
        x: this.props.charData.map.x,
        y: this.props.charData.map.y
      });
    }

    this.setState({ isCharMoveMode: false });
    document.querySelector('.map-img-overlay').removeEventListener('mousemove', this.handleMouseMove);
    document.querySelector('.map-img-cont').removeEventListener('mouseleave', this.handleMouseLeave);
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
      <div className={`map-char-profile cursor-grabbable ${isMovingClass}`} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} onTouchStart={this.handleTouchStart} onTouchEnd={this.handleTouchEnd} style={{borderColor: this.props.charData.general.color, backgroundImage: `url(${this.props.charData.general.image})`, left: this.props.charData.map.x, top: this.props.charData.map.y}}>
        <div className="map-char-balloon p-absolute p-1 align-left cursor-default">
          <div className="font-size-md font-weight-bold pb-1 one-line-ellipsis">{charName}</div>
          { statList }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharDot);
