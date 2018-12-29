import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { addUser, editUser, removeUser, setRoomId, setUserId } from '../../../redux/actions/action';
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
    addUser:  (user) => dispatch(addUser(user)),
    editUser: (user) => dispatch(editUser(user)),
    removeUser: (userId) => dispatch(removeUser(userId)),
    setRoomId: (roomId) => dispatch(setRoomId(roomId)),
    setUserId: (userId) => dispatch(setUserId(userId))
  };
};

class Room extends Component {
  constructor (props){
    super(props);
    socket.connect();
  }

  componentDidMount (){
    socket.on('user', (content) => {
      if (this.props.userList.some((user) => user.id === content.id)){
        this.props.editUser(content);
      } else {
        this.props.addUser(content);
      }
    });

    socket.on('delUser', (id) => {
      if (id === this.props.id){
        this.props.history.push('/');
      }
      this.props.removeUser(id);
    });

    socket.on('join', (content) => {
      this.props.addUser(content);
      socket.emit('user', this.props.roomId, this.props.userList.find((user) => user.id === this.props.id));
    });


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
