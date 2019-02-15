import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CHAT_TYPE_HOST, CHAT_TYPE_LEAVE, CHAT_TYPE_JOIN, CHAR_PRIVACY_LEVEL_THREE } from '../../../constants/constants';
import { setUserId, setRoomId, setRoomExpire } from '../../../redux/actions/global';
import { addUser, editUser, removeUser, newHost } from '../../../redux/actions/user';
import { addChat } from '../../../redux/actions/chatLog';
import { setDisplayMap } from '../../../redux/actions/display';
import { addChar, editChar, removeChar } from '../../../redux/actions/char';
import { addMap, editMap, removeMap, setMapMode, setCharToPlace } from '../../../redux/actions/map';
import { addMapChar, editMapChar, removeMapChar, removeAllCharFromSelMap, removeSelCharFromAllMap } from '../../../redux/actions/mapChar';
import { lockNote, unlockNote, editNote } from '../../../redux/actions/note';
import { removeSendMsgUser, checkSendMsgToAll } from '../../../redux/actions/chatSetting';
import { addGeo, editGeo, removeGeo, removeAllGeoFromSelMap } from '../../../redux/actions/geo';
import socket from '../../../socket/socketClient';

// Style
import './room.scss';

// Components
import Top    from './top/top';
import Center from './center/center';
import Bottom from './bottom/bottom';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    global:         state.global,
    userList:       state.userList,
    charList:       state.charList,
    displaySetting: state.displaySetting,
    geoList:        state.geoList,
    mapList:        state.mapList,
    mapCharList:    state.mapCharList,
    chatSetting:    state.chatSetting,
    noteSetting:    state.noteSetting
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    addUser:                 (user)          => dispatch(addUser(user)),
    editUser:                (user)          => dispatch(editUser(user)),
    removeUser:              (userId)        => dispatch(removeUser(userId)),
    setRoomId:               (roomId)        => dispatch(setRoomId(roomId)),
    setUserId:               (userId)        => dispatch(setUserId(userId)),
    addChat:                 (content)       => dispatch(addChat(content)),
    newHost:                 (id)            => dispatch(newHost(id)),
    addMapChar:              (mapCharData)   => dispatch(addMapChar(mapCharData)),
    editMapChar:             (mapCharData)   => dispatch(editMapChar(mapCharData)),
    removeMapChar:           (mapId, charId) => dispatch(removeMapChar(mapId, charId)),
    editNote:                (notes)         => dispatch(editNote(notes)),
    lockNote:                (userId)        => dispatch(lockNote(userId)),
    unlockNote:              ()              => dispatch(unlockNote()),
    removeSendMsgUser:       (userId)        => dispatch(removeSendMsgUser(userId)),
    checkSendMsgToAll:       ()              => dispatch(checkSendMsgToAll()),
    editChar:                (charData)      => dispatch(editChar(charData)),
    addChar:                 (charData)      => dispatch(addChar(charData)),
    removeChar:              (charId)        => dispatch(removeChar(charId)),
    addMap:                  (mapData)       => dispatch(addMap(mapData)),
    editMap:                 (mapData)       => dispatch(editMap(mapData)),
    removeMap:               (mapId)         => dispatch(removeMap(mapId)),
    setDisplayMap:           (mapId)         => dispatch(setDisplayMap(mapId)),
    setMapMode:              (mapId, mode)   => dispatch(setMapMode(mapId, mode)),
    setCharToPlace:          (mapId, charId) => dispatch(setCharToPlace(mapId, charId)),
    removeSelCharFromAllMap: (charId)        => dispatch(removeSelCharFromAllMap(charId)),
    removeAllCharFromSelMap: (mapId)         => dispatch(removeAllCharFromSelMap(mapId)),
    addGeo:                  (geoData)       => dispatch(addGeo(geoData)),
    editGeo:                 (geoData)       => dispatch(editGeo(geoData)),
    removeGeo:               (geoId, mapId)  => dispatch(removeGeo(geoId, mapId)),
    removeAllGeoFromSelMap:  (mapId)         => dispatch(removeAllGeoFromSelMap(mapId)),
    setRoomExpire: (roomExpireSettingHour, roomExpireTimestamp) => dispatch(setRoomExpire(roomExpireSettingHour, roomExpireTimestamp))
  };
};

class Room extends Component {
  constructor (props){
    super(props);
    socket.connect();

    this.onBeforeUnload = this.onBeforeUnload.bind(this);
    this.onUnload       = this.onUnload.bind(this);
  }

  onBeforeUnload (e){
    e.preventDefault();
    e.returnValue = ''; // for Chrome
  }

  onUnload (e){
    socket.emit('leave', this.props.global.roomId, {
      id:             this.props.global.id,
      appointNewHost: this.props.userList.find(user => user.id === this.props.global.id).host,
      newHost:        this.props.userList.length >= 2 ? this.props.userList[1].id : ''
    });

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
      this.props.mapList.forEach(map => {
        if (map.charToPlace === charId){
          this.props.setCharToPlace(map.mapId, '');
          this.props.setMapMode(map.mapId, '');
        }
      });

      this.props.removeSelCharFromAllMap(charId);
      this.props.removeChar(charId);
    });

    socket.on('chat', (content) => {
      this.props.addChat(content);
    });

    socket.on('join', (content) => {
      this.props.addUser(content);
      socket.emit('user', this.props.global.roomId, this.props.userList.find(user => user.id === this.props.global.id));

      const curDate = new Date();
      const curTimestamp = curDate.getTime();
      socket.emit('roomExpire', this.props.global.roomId, {
        roomExpireSettingHour: this.props.global.roomExpireSettingHour,
        roomExpireTimestamp:   this.props.global.roomExpireTimestamp,
        hostCurTimestamp:      curTimestamp
      });

      socket.emit('editNote', this.props.global.roomId, this.props.noteSetting.notes);

      this.props.charList.forEach((char) => {
        if (char.ownerId === this.props.global.id && char.general.privacy !== CHAR_PRIVACY_LEVEL_THREE){
          socket.emit('char', this.props.global.roomId, char);
        }
      });

      this.props.mapList.forEach(map => {
        if (!map.private){
          if (map.ownerId === this.props.global.id){
            socket.emit('map', this.props.global.roomId, {
              mapId:   map.mapId,
              ownerId: map.ownerId,
              src:     map.src,
              name:    map.name,
              private: map.private
            });

            this.props.geoList.forEach(geo => {
              if (geo.mapId === map.mapId){
                socket.emit('geo', this.props.global.roomId, geo);
              }
            });
          }

          this.props.mapCharList.forEach(mapChar => {
            if (mapChar.mapId === map.mapId && this.props.charList.find(char => char.charId === mapChar.charId).general.privacy !== CHAR_PRIVACY_LEVEL_THREE){
              socket.emit('mapChar', this.props.global.roomId, mapChar);
            }
          });
        }

      });
    });

    socket.on('leave', leaveData => {
      this.props.addChat({
        type: CHAT_TYPE_LEAVE,
        name: this.props.userList.find((user) => user.id === leaveData.id).name
      });

      if (leaveData.appointNewHost){
        this.props.addChat({
          type: CHAT_TYPE_HOST,
          name: this.props.userList.find((user) => user.id === leaveData.newHost).name
        });

        this.props.newHost(leaveData.newHost);
      }

      this.props.mapList.forEach(map => {
        if (map.ownerId === leaveData.id){
          if (map.mapId === this.props.displaySetting.displayMap){
            this.props.setDisplayMap('');
          }
          this.props.removeAllGeoFromSelMap(map.mapId);
          this.props.removeAllCharFromSelMap(map.mapId);
          this.props.removeMap(map.mapId);
        }
      });

      this.props.charList.forEach(char => {
        if (char.ownerId === leaveData.id){
          this.props.removeSelCharFromAllMap(char.charId);
          this.props.removeChar(char.charId);
        }
      });

      if (this.props.chatSetting.sendTo.sendToUsers.includes(leaveData.id)){
        this.props.removeSendMsgUser(leaveData.id);
        if (this.props.chatSetting.sendTo.sendToUsers.length === 0){
          this.props.checkSendMsgToAll();
        }
      }

      if (leaveData.id === this.props.noteSetting.isNoteLocked){
        this.props.unlockNote();
      }

      this.props.removeUser(leaveData.id);
    });

    socket.on('map', mapData => {
      if (this.props.mapList.some(map => map.mapId === mapData.mapId)){
        this.props.editMap(mapData);
      } else {
        this.props.addMap(mapData);
      }
    });

    socket.on('delMap', mapId => {
      if (mapId === this.props.displaySetting.displayMap){
        this.props.setDisplayMap('');
      }

      this.props.removeAllGeoFromSelMap(mapId);
      this.props.removeAllCharFromSelMap(mapId);
      this.props.removeMap(mapId);
    });

    socket.on('mapChar', (mapCharData) => {
      if (this.props.mapCharList.some(mapChar => mapChar.mapId === mapCharData.mapId && mapChar.charId === mapCharData.charId)){
        this.props.editMapChar(mapCharData);
      } else {
        this.props.addMapChar(mapCharData);
      }
    });

    socket.on('removeMapChar', (mapId, charId) => {
      this.props.removeMapChar(mapId, charId);
    });

    socket.on('geo', geoData => {
      if (this.props.geoList.some(geo => geo.geoId === geoData.geoId && geo.mapId === geoData.mapId)){
        this.props.editGeo(geoData);
      } else {
        this.props.addGeo(geoData);
      }
    });

    socket.on('delGeo', (geoId, mapId) => {
      this.props.removeGeo(geoId, mapId);
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

    socket.on('roomExpire', roomExpireSettingData => {
      if (this.props.global.roomExpireSettingHour !== roomExpireSettingData.roomExpireSettingHour){
        const curDate      = new Date();
        const curTimestamp = curDate.getTime()
        const timeDif      = roomExpireSettingData.hostCurTimestamp - curTimestamp;
        this.props.setRoomExpire(roomExpireSettingData.roomExpireSettingHour, roomExpireSettingData.roomExpireTimestamp - timeDif);
      }
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

    socket.emit('leave', this.props.global.roomId, {
      id:             this.props.global.id,
      appointNewHost: this.props.userList.find(user => user.id === this.props.global.id).host,
      newHost:        this.props.userList.length >= 2 ? this.props.userList[1].id : ''
    });

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
