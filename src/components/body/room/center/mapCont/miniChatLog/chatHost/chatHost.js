import React, { Component } from 'react';

// Style
import './chatHost.scss';

class ChatHost extends Component {
  render() {
    return(
      <div className="mini-chat">
        {this.props.chatData.name} is now the new host
      </div>
    );

  }
}

export default ChatHost;
