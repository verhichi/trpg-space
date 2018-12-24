import React, { Component } from 'react';

// Style
import './center.scss';

// Components
import CharList from './charList/charList';
import UserList from './userList/userList';
import ChatLog from './chatLog/chatLog';

class Center extends Component {
  render() {
    return (
        <div className="room-center-cont d-flex f-grow-1">
          <CharList/>
          <ChatLog/>
          <UserList/>
        </div>
    );
  }
}

export default Center;
