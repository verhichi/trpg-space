import React, { Component } from 'react';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './chatRoll.scss';

class ChatRoll extends Component {
  render() {
    return(
      <div className="mini-chat">
        <FontAwesomeIcon icon="dice"/>
        [{this.props.chatData.name}]
        {this.props.chatData.private
          ? <span>[PRIVATE]</span>
          : null}
        [{this.props.chatData.diceSetting}] {this.props.chatData.result} - {this.props.chatData.total}
      </div>
    );

  }
}

export default ChatRoll;
