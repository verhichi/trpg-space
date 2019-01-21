import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser, editUser, removeUser, setRoomId, setUserId, userCleanup, addToChatLog, newHost, editMapImage, addMapChar, editMapChar, removeMapChar, removeAllMapChar, lockNote, unlockNote, editNote, editMapPosition } from '../../../redux/actions/action';
import socket from '../../../socket/socketClient';

// Style
import './room.scss';

// Components
import Top from './top/top';
import Center from './center/center';
import Bottom from './bottom/bottom';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    id:            state.id,
    roomId:        state.roomId,
    userList:      state.userList,
    charList:      state.charList,
    mapSetting:    state.mapSetting,
    isNoteLocked:  state.isNoteLocked,
    notes:         state.notes
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    addUser:          (user)     => dispatch(addUser(user)),
    editUser:         (user)     => dispatch(editUser(user)),
    removeUser:       (userId)   => dispatch(removeUser(userId)),
    setRoomId:        (roomId)   => dispatch(setRoomId(roomId)),
    setUserId:        (userId)   => dispatch(setUserId(userId)),
    userCleanup:      (id)       => dispatch(userCleanup(id)),
    addToChatLog:     (content)  => dispatch(addToChatLog(content)),
    newHost:          (id)       => dispatch(newHost(id)),
    editMapImage:     (src)      => dispatch(editMapImage(src)),
    addMapChar:       (charData) => dispatch(addMapChar(charData)),
    editMapChar:      (charData) => dispatch(editMapChar(charData)),
    removeMapChar:    (charId)   => dispatch(removeMapChar(charId)),
    removeAllMapChar: ()         => dispatch(removeAllMapChar()),
    editNote:         (notes)    => dispatch(editNote(notes)),
    lockNote:         (userId)   => dispatch(lockNote(userId)),
    unlockNote:       ()         => dispatch(unlockNote()),
    editMapPosition:  (left, top)=> dispatch(editMapPosition(left, top))
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

      socket.emit('mapImage', this.props.roomId, this.props.mapSetting.image);
      socket.emit('editNote', this.props.roomId, this.props.notes);

      this.props.charList.forEach((char) => {
        if (char.ownerId === this.props.id && char.general.privacy !== '3'){
          socket.emit('char', this.props.roomId, char);
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

      if (id === this.props.isNoteLocked){
        this.props.unlockNote();
      }

      this.props.userCleanup(id);
    });

    socket.on('mapImage', (imageData) => {
      if (this.props.mapSetting.image.id !== imageData.id){
        this.props.editMapImage(imageData);
        this.props.removeAllMapChar();
      }
    });

    socket.on('mapChar', (charData) => {
      if (this.props.charList.some(char => char.charId === charData.charId && char.onMap)){
        this.props.editMapChar(charData);
      } else {
        this.props.addMapChar(charData);
      }
    });

    socket.on('removeMapChar', (charId) => {
      this.props.removeMapChar(charId);
    });

    socket.on('lockNote', (userId) => {
      this.props.lockNote(userId);
    });

    socket.on('unlockNote', () => {
      this.props.unlockNote();
    });

    socket.on('editNote', (notes) => {
      this.props.editNote(notes);
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
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
