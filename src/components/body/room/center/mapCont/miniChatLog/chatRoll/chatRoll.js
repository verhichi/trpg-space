import React, { Component } from 'react';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './chatRoll.scss';

class ChatRoll extends Component {
  render() {
    return(
      <div className="mini-chat">
        <div className="mini-chat-icon">
          <FontAwesomeIcon icon="dice"/>
        </div>
        {this.props.chatData.private && <div>[PRIVATE]</div>}
        [{this.props.chatData.name}]
        [{this.props.chatData.diceSetting}] {this.props.chatData.result} -> {this.props.chatData.total}
      </div>
    );

  }
}

export default ChatRoll;
