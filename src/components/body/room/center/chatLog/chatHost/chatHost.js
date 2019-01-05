import React, { Component } from 'react';

// Style
import './chatHost.scss';

class ChatHost extends Component {
  render() {
    return(
      <div className="chat-log mb-3 align-center">
        <div className="chat-log-system p-2">
          {this.props.chatData.name} is now the host.
        </div>
      </div>
    );

  }
}

export default ChatHost;
