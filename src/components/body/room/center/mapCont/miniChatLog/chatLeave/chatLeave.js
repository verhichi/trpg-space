import React, { Component } from 'react';

// Style
import './chatLeave.scss';

class ChatLeave extends Component {
  render() {
    return(
      <div className="mini-chat">
        {this.props.chatData.name} has left the room
      </div>
    );

  }
}

export default ChatLeave;
