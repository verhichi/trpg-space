import React, { Component } from 'react';

// Style
import './chatLog.scss';

class ChatLog extends Component {
  render() {
    return (
      <div className="chat-log-cont h-100 w-100">
        <div className="chat-log">
          <div className="chat-log-head">
            <span className="chat-log-user">name</span>
            <span className="chat-log-time">4:21</span>
          </div>
          <div className="chat-log-body">
            Whats up nigga!
          </div>
        </div>
        <div className="chat-log">
          <div className="chat-log-head">
            <span className="chat-log-user">name2</span>
            <span className="chat-log-time">4:21</span>
          </div>
          <div className="chat-log-body">
            Hey!
          </div>
        </div>
      </div>
    );
  }
}

export default ChatLog;
