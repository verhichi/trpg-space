import React, { Component } from 'react';
import uuid from 'uuid';

// Style
import './miniChatLog.scss';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class MiniChatLog extends Component {
  render() {
    const contKey = uuid.v4();

    const miniChatType = {
      text:  (chatData) => <div className="mini-chat" key={chatData.id}><FontAwesomeIcon icon="comment"/> [{chatData.name}] {chatData.text}</div>,
      roll:  (chatData) => <div className="mini-chat" key={chatData.id}><FontAwesomeIcon icon="dice"/>[{chatData.name}] [{chatData.diceSetting}] {chatData.result} - {chatData.total}</div>,
      image: (chatData) => <div className="mini-chat" key={chatData.id}><FontAwesomeIcon icon="file-image"/>[{chatData.name}] -Check chat to view image-</div>,
      join:  (chatData) => <div className="mini-chat" key={chatData.id}>{chatData.name} has joined the room</div>,
      leave: (chatData) => <div className="mini-chat" key={chatData.id}>{chatData.name} has left the room</div>
    };

    const miniChatLog = this.props.miniChatLog.map(chatData => {
      return miniChatType[chatData.type](chatData);
    });

    return (
      <div className="mini-chat-cont font-weight-bold p-1 p-absolute cursor-pointer" key={contKey}>
        {miniChatLog}
      </div>
    );
  }
}

export default MiniChatLog;
