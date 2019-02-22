import React, { Component } from 'react';
import { connect } from 'react-redux';
import { roomSettingLabel, userRoomLabel, extendRoomLifeBtnLabel } from './roomSetting.i18n';
import { setRoomExpireTime, setRoomExpireNoticeFalse } from '../../../redux/actions/expire';
import socket from '../../../socket/socketClient';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './roomSetting.scss';

// Component
import User from './user/user';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    global:        state.global,
    userList:      state.userList,
    modalSetting:  state.modalSetting,
    expireSetting: state.expireSetting
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    setRoomExpireTime:        (roomExpireSettingHour, roomExpireTimestamp) => dispatch(setRoomExpireTime(roomExpireSettingHour, roomExpireTimestamp)),
    setRoomExpireNoticeFalse: () => dispatch(setRoomExpireNoticeFalse())
  };
};

class RoomSetting extends Component {
  constructor (props){
    super(props);
    this.state = { submitted: false };
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick (e){
    e.preventDefault();
    if (!this.state.submitted){
      this.setState({ submitted: true });
      const newRoomExpireSettingHour = this.props.expireSetting.roomExpireSettingHour + 1;
      const newExpireTimestamp       = this.props.expireSetting.roomExpireTimestamp + (60 * 60 * 1000);
      this.props.setRoomExpireTime(newRoomExpireSettingHour, newExpireTimestamp);
      this.props.setRoomExpireNoticeFalse();
      socket.emit('extendRoomExpire', this.props.global.roomId);
    }
  }

  render() {
    const userList = this.props.userList.map((user) => {
      return ( <User key={user.id} userData={user}/> );
    });

    const hostName = this.props.userList.find(user => user.host).name;
    const isHost   = this.props.userList.find(user => user.id === this.props.global.id).host;

    const curDate      = new Date();
    const curTimestamp = curDate.getTime();
    const hourLeft     = Math.floor((this.props.expireSetting.roomExpireTimestamp - curTimestamp) / (60 * 60 * 1000));
    const minLeft      = Math.floor(((this.props.expireSetting.roomExpireTimestamp - curTimestamp) % (60 * 60 * 1000)) / (60 * 1000));
    const timeLeft     = this.props.expireSetting.roomExpireTimestamp <= curTimestamp ? 'EXPIRED' : `${hourLeft}h ${minLeft}min`;

    const isDisabled = this.props.expireSetting.hasRoomExpired || this.state.submitted || this.props.expireSetting.roomExpireTimestamp - curTimestamp > (60 * 60 * 1000);

    return (
      <div className="d-flex f-dir-col f-grow-1">
        <div className="mb-1">
          <div className="setting-title font-weight-bold mb-1">{roomSettingLabel[this.props.global.lang]}</div>
          <div className="setting-detail">Room ID: {this.props.global.roomId}</div>
          <div className="setting-detail">Room Host: {hostName}</div>
          <div className="setting-detail">Room Expires in: {timeLeft}</div>
        </div>
        {isHost && (<button type="button" className="btn btn-hot w-100 cursor-pointer f-shrink-0 f-align-self-end mb-3" disabled={isDisabled} onClick={this.handleButtonClick}>
          <FontAwesomeIcon icon="plus"/>
          <div className="btn-text">{extendRoomLifeBtnLabel[this.props.global.lang]}</div>
        </button>)}
        <div>
          <div className="setting-title font-weight-bold mb-2">{userRoomLabel[this.props.global.lang]}</div>
          { userList }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomSetting);
