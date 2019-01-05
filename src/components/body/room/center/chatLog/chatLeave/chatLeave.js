import React, { Component } from 'react';

// Style
import './chatLeave.scss';

class ChatLeave extends Component {
  render() {
    return(
      <div className="chat-log mb-3 align-center">
        <div className="chat-log-system p-2">
          {this.props.chatData.name} has left the room.
        </div>
      </div>
    );

  }
}

export default ChatLeave;
