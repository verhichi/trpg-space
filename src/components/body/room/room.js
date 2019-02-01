import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CHAT_TYPE_HOST, CHAT_TYPE_LEAVE, CHAT_TYPE_JOIN, CHAR_PRIVACY_LEVEL_THREE } from '../../../constants/constants';
import { setUserId, setRoomId } from '../../../redux/actions/global';
import { addUser, editUser, removeUser, newHost } from '../../../redux/actions/user';
import { addChat } from '../../../redux/actions/chatLog';
import { addChar, editChar, removeChar, addMapChar, editMapChar, removeMapChar, removeAllMapChar } from '../../../redux/actions/char';
import { editMapImage } from '../../../redux/actions/map';
import { lockNote, unlockNote, editNote } from '../../../redux/actions/note';
import { removeSendMsgUser, checkSendMsgToAll } from '../../../redux/actions/chatSetting';
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
    global:      state.global,
    userList:    state.userList,
    charList:    state.charList,
    mapSetting:  state.mapSetting,
    chatSetting: state.chatSetting,
    noteSetting: state.noteSetting
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    addUser:            (user)      => dispatch(addUser(user)),
    editUser:           (user)      => dispatch(editUser(user)),
    removeUser:         (userId)    => dispatch(removeUser(userId)),
    setRoomId:          (roomId)    => dispatch(setRoomId(roomId)),
    setUserId:          (userId)    => dispatch(setUserId(userId)),
    addChat:            (content)   => dispatch(addChat(content)),
    newHost:            (id)        => dispatch(newHost(id)),
    editMapImage:       (src)       => dispatch(editMapImage(src)),
    addMapChar:         (charData)  => dispatch(addMapChar(charData)),
    editMapChar:        (charData)  => dispatch(editMapChar(charData)),
    removeMapChar:      (charId)    => dispatch(removeMapChar(charId)),
    removeAllMapChar:   ()          => dispatch(removeAllMapChar()),
    editNote:           (notes)     => dispatch(editNote(notes)),
    lockNote:           (userId)    => dispatch(lockNote(userId)),
    unlockNote:         ()          => dispatch(unlockNote()),
    removeSendMsgUser:  (userId)    => dispatch(removeSendMsgUser(userId)),
    checkSendMsgToAll:  ()          => dispatch(checkSendMsgToAll()),
    editChar:           (charData)  => dispatch(editChar(charData)),
    addChar:            (charData)  => dispatch(addChar(charData)),
    removeChar:         (charId)    => dispatch(removeChar(charId)),
  };
};

class Room extends Component {
  constructor (props){
    super(props);
    socket.connect();

    this.onBeforeUnload = this.onBeforeUnload.bind(this);
    this.onUnload = this.onUnload.bind(this);
  }

  onBeforeUnload (e){
    e.preventDefault();
    e.returnValue = ''; // for Chrome
  }

  onUnload (e){
    socket.emit('leave', this.props.global.roomId, this.props.global.id);

    // If the user that left was host, get new host
    if (this.props.userList.find(user => user.id === this.props.global.id).host && this.props.userList.length >= 2){
      socket.emit('newHost', this.props.global.roomId, this.props.userList[1].id);
    }

    socket.disconnect();
  }

  componentDidMount (){
    window.addEventListener('beforeunload', this.onBeforeUnload);
    window.addEventListener('unload', this.onUnload);

    socket.on('user', (content) => {
      if (this.props.userList.some((user) => user.id === content.id)){
        this.props.editUser(content);
      } else {
        this.props.addUser(content);
      }
    });

    socket.on('delUser', (id) => {
      if (id === this.props.global.id){
        this.props.history.push('/');
      }
      this.props.removeUser(id);
    });

    socket.on('char', (content) => {
      if (this.props.charList.some((char) => char.charId === content.charId)){
        this.props.editChar(content);
      } else {
        this.props.addChar(content);
      }
    });

    socket.on('delChar', (charId) => {
      this.props.removeChar(charId);
      this.props.removeMapChar(charId);
    });

    socket.on('chat', (content) => {
      this.props.addChat(content);
    });

    socket.on('join', (content) => {
      this.props.addUser(content);
      socket.emit('user', this.props.global.roomId, this.props.userList.find(user => user.id === this.props.global.id));

      socket.emit('mapImage', this.props.global.roomId, this.props.mapSetting.image);
      socket.emit('editNote', this.props.global.roomId, this.props.noteSetting.notes);

      this.props.charList.forEach((char) => {
        if (char.ownerId === this.props.global.id && char.general.privacy !== CHAR_PRIVACY_LEVEL_THREE){
          socket.emit('char', this.props.global.roomId, char);
        }
      });
    });

    socket.on('newHost', (id) => {
      this.props.addChat({
        type: CHAT_TYPE_HOST,
        name: this.props.userList.find((user) => user.id === id).name
      });

      this.props.newHost(id);
    });

    socket.on('leave', (id) => {
      this.props.addChat({
        type: CHAT_TYPE_LEAVE,
        name: this.props.userList.find((user) => user.id === id).name
      });

      this.props.charList.forEach(char => {
        if (char.ownerId === id){
          this.props.removeChar(char.charId);
        }
      });

      if (this.props.chatSetting.sendTo.sendToUsers.includes(id)){
        this.props.removeSendMsgUser(id);
        if (this.props.chatSetting.sendTo.sendToUsers.length === 0){
          this.props.checkSendMsgToAll();
        }
      }

      if (id === this.props.noteSetting.isNoteLocked){
        this.props.unlockNote();
      }

      this.props.removeUser(id);
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

    socket.emit('join', this.props.match.params.roomId, this.props.userList.find((user) => user.id === this.props.global.id))
      .then(() => {
        socket.emit('chat', this.props.global.roomId, {
          type: CHAT_TYPE_JOIN,
          name: this.props.userList.find(user => user.id === this.props.global.id).name
        });
      });


  }

  componentWillUnmount (){
    window.removeEventListener('beforeunload', this.onBeforeUnload);
    window.removeEventListener('unload', this.onUnload);

    socket.emit('leave', this.props.global.roomId, this.props.global.id);

    // If the user that left was host, get new host
    if (this.props.userList.find(user => user.id === this.props.global.id).host && this.props.userList.length >= 2){
      socket.emit('newHost', this.props.global.roomId, this.props.userList[1].id);
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
