import React, { Component } from 'react';

// Style
import './chatImage.scss';

class ChatImage extends Component {
  render() {
    return(
      <div className="chat-log mb-3">
        <div className="chat-log-head">
          <span className="chat-log-user">{this.props.chatData.name}</span>
          <span className="chat-log-time">{this.props.chatData.time}</span>
        </div>
        <div className="chat-log-body p-2 ml-3">
          <img className="chat-img" src={this.props.chatData.src} />
        </div>
      </div>
    );

  }
}

export default ChatImage;
