import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser, editUser, removeUser, setRoomId, setUserId, userCleanup, addToChatLog, newHost } from '../../../redux/actions/action';
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
    userList: state.userList,
    enemyList: state.enemyList,
    charList: state.charList
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    addUser:  (user) => dispatch(addUser(user)),
    editUser: (user) => dispatch(editUser(user)),
    removeUser: (userId) => dispatch(removeUser(userId)),
    setRoomId: (roomId) => dispatch(setRoomId(roomId)),
    setUserId: (userId) => dispatch(setUserId(userId)),
    userCleanup: (id) => dispatch(userCleanup(id)),
    addToChatLog: (content) => dispatch(addToChatLog(content)),
    newHost: (id) => dispatch(newHost(id))
  };
};

class Room extends Component {
  constructor (props){
    super(props);
    socket.connect();

    // this.onUnload = this.onUnload.bind(this);
  }

  // onUnload (){
  //   socket.emit('leave', this.props.roomId, this.props.id);
  //
  //   // If the user that left was host, get new host
  //   if (this.props.userList.find(user => user.id === this.props.id).host){
  //     for (let idx = 0; idx < this.props.userList.length; idx++){
  //       if (this.props.userList[idx].id === this.props.id) continue; // can't set user that's leaving as host
  //
  //       socket.emit('newHost', this.props.roomId, this.props.userList[idx].id);
  //       break;
  //     }
  //   }
  //   socket.disconnect();
  // }

  componentDidMount (){
    // window.addEventListener('beforeunload', this.onUnload);

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

      this.props.charList.forEach((char) => {
        if (char.ownerId === this.props.id){
          socket.emit('char', this.props.roomId, char);
        }
      });

      this.props.enemyList.forEach((enemy) => {
        if (enemy.ownerId === this.props.id){
          socket.emit('enemy', this.props.roomId, enemy)
        }
      });
    });

    socket.on('newHost', (id) => {
      this.props.addToChatLog({
        type: 'newHost',
        name: this.props.userList.find((user) => user.id === id).name
      });

      this.props.newHost(id);
    });

    socket.on('leave', (id) => {
      this.props.addToChatLog({
        type: 'leave',
        name: this.props.userList.find((user) => user.id === id).name
      });

      this.props.userCleanup(id);
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
    // window.removeEventListener('beforeunload', this.onUnload);
    //
    // this.onUnload();
    socket.emit('leave', this.props.roomId, this.props.id);

    // If the user that left was host, get new host
    if (this.props.userList.find(user => user.id === this.props.id).host){
      for (let idx = 0; idx < this.props.userList.length; idx++){
        if (this.props.userList[idx].id === this.props.id) continue; // can't set user that's leaving as host

        socket.emit('newHost', this.props.roomId, this.props.userList[idx].id);
        break;
      }
    }
    socket.disconnect();
  }

  render() {
    return (
      <div className="room-cont h-100">
        <Top redirect={this.props.history.push.bind(this, '/')}/>
        <Center/>
        <Bottom/>
        <DiceBalloon/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
