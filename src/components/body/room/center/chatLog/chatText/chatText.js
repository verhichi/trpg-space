import React, { Component } from 'react';

// Style
import './chatText.scss';

class ChatText extends Component {
  render() {
    return(
      <div className="chat-log mb-3">
        <div className="chat-log-head">
          <span className="chat-log-user">{this.props.chatData.name}</span>
          <span className="chat-log-time">{this.props.chatData.time}</span>
        </div>
        <div className="chat-log-body p-2 ml-3">
          {this.props.chatData.text}
        </div>
      </div>
    );

  }
}

export default ChatText;
