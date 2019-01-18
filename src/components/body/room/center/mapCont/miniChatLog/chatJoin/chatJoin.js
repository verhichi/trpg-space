import React, { Component } from 'react';

// Style
import './chatJoin.scss';

class ChatJoin extends Component {
  render() {
    return(
      <div className="mini-chat">
        {this.props.chatData.name} has joined the room
      </div>
    );

  }
}

export default ChatJoin;
