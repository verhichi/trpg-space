import React, { Component } from 'react';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './chatImage.scss';

class ChatImage extends Component {

  render() {
    return(
      <div className="mini-chat">
        <FontAwesomeIcon icon="file-image"/>
        [{this.props.chatData.name}] -Check chat to view image-
      </div>
    );

  }
}

export default ChatImage;
