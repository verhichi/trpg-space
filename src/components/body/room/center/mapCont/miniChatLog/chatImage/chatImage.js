import React, { Component } from 'react';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ChatImage extends Component {

  render() {
    return(
      <div className="mini-chat">
        <div className="mini-chat-icon">
          <FontAwesomeIcon icon="file-image"/>
        </div>
        <div className="d-inline-block">[{this.props.chatData.name}] -Check chat to view image-</div>
      </div>
    );

  }
}

export default ChatImage;
