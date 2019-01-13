import React, { Component } from 'react';
import { connect } from 'react-redux';

// Style
import './roomSetting.scss';

// Component
import User from './user/user';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    id:           state.id,
    roomId:       state.roomId,
    userList:     state.userList,
    modalSetting: state.modalSetting
  };
};

class RoomSetting extends Component {
  render() {

    const userList = this.props.userList.map((user) => {
      return ( <User key={user.id} userData={user}/> );
    });

    return (
      <div className="d-flex f-dir-col f-grow-1">
        <div className="mb-3">
          <div className="setting-title font-weight-bold mb-1">Room Setting:</div>
          <div className="setting-detail">Room ID: {this.props.roomId}</div>
        </div>
        <div>
          <div className="setting-title font-weight-bold mb-2">Users in Room:</div>
          { userList }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, /*mapDispatchToProps*/)(RoomSetting);
