import React, { Component } from 'react';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './bottom.scss';

class Bottom extends Component {
  render() {
    return (
      <div className="room-bottom-cont">
        <div className="chat-cont">
          <div className="chat-bar-btn cursor-pointer">
            <FontAwesomeIcon icon="address-card"/>
          </div>
          <div className="chat-bar-btn btn-hot cursor-pointer">
            <FontAwesomeIcon icon="dice"/>
          </div>
          <textarea className="chat-inp" placeholder="Enter text here"></textarea>
          <div className="chat-bar-btn btn-hot cursor-pointer">
            <FontAwesomeIcon icon="paper-plane"/>
            <span className="d-none-sm"> Send</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Bottom;
