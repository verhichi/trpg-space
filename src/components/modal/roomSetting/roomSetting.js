import React, { Component } from 'react';
import { connect } from 'react-redux';
import { roomSettingLabel, userRoomLabel } from './roomSetting.i18n';

// Style
import './roomSetting.scss';

// Component
import User from './user/user';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    global:       state.global,
    userList:     state.userList,
    modalSetting: state.modalSetting
  };
};

class RoomSetting extends Component {
  render() {
    const userList = this.props.userList.map((user) => {
      return ( <User key={user.id} userData={user}/> );
    });

    const hostName = this.props.userList.find(user => user.host).name;

    return (
      <div className="d-flex f-dir-col f-grow-1">
        <div className="mb-3">
          <div className="setting-title font-weight-bold mb-1">{roomSettingLabel[this.props.global.lang]}</div>
          <div className="setting-detail">Room ID: {this.props.global.roomId}</div>
          <div className="setting-detail">Room Host: {hostName}</div>
        </div>
        <div>
          <div className="setting-title font-weight-bold mb-2">{userRoomLabel[this.props.global.lang]}</div>
          { userList }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, /*mapDispatchToProps*/)(RoomSetting);
