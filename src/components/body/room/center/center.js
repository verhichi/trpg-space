import React, { Component } from 'react';

// Style
import './center.scss';

// Components
import CharList from './charList/charList';
import ChatLog from './chatLog/chatLog';

class Center extends Component {
  render() {
    return (
        <div className="room-center-cont d-flex f-grow-1">
          <CharList/>
          <ChatLog/>
        </div>
    );
  }
}

export default Center;
