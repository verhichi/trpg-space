import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { setRoomId, setUserId } from '../../../redux/actions/action';
import socket from '../../../socket/socketClient';

// Style
import './room.scss';

// Components
import Top from './top/top';
import Center from './center/center';
import Bottom from './bottom/bottom';
import DiceBalloon from './diceBalloon/diceBalloon';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    id:       state.id,
    roomId:   state.roomId,
    userList: state.userList
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    setRoomId: (roomId) => dispatch(setRoomId(roomId)),
    setUserId: (userId) => dispatch(setUserId(userId))
  };
};

class Room extends Component {
  constructor (props){
    super(props);
    // this.props.setRoomId(this.props.match.params.roomId);
    // this.props.setUserId(uuid.v4());
    socket.connect();
  }

  componentDidMount (){
    socket.emit('join', this.props.match.params.roomId, this.props.userList.find((user) => user.id === this.props.id))
      .then(() => {
        socket.emit('chat', this.props.roomId, {
          type: 'join',
          name: this.props.userList.find((user) => user.id === this.props.id).name
        });
      });
  }

  componentWillUnmount (){
    socket.emit('chat', this.props.roomId, {
      type: 'leave',
      name: this.props.userList.find((user) => user.id === this.props.id).name
    });
    socket.disconnect();
  }

  render() {
    return (
      <div className="room-cont h-100">
        <Top/>
        <Center/>
        <Bottom/>
        <DiceBalloon/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
