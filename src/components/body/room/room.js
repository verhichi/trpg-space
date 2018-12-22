import React, { Component } from 'react';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './room.scss';

class Room extends Component {
  render() {
    return (
      <div className="room-cont h-100">

        <div className="room-top-cont">
          <div className="tool-bar">
            <div className="room-id">(2)Room ID: 123456</div>
            <div className="tool-bar-btn cursor-pointer">
              <FontAwesomeIcon icon="cog"/>
              <span className="d-none-sm"> Settings</span>
            </div>
          </div>
        </div>

        <div className="room-center-cont">
          <div className="char-list-cont">
          </div>
          <div className="chat-log-cont h-100 w-100">
            <div className="chat-log">
              <div className="chat-log-head">
                <span className="chat-log-user">name</span>
                <span className="chat-log-time">4:21</span>
              </div>
              <div className="chat-log-body">
                Whats up nigga!
              </div>
            </div>
            <div className="chat-log">
              <div className="chat-log-head">
                <span className="chat-log-user">name2</span>
                <span className="chat-log-time">4:21</span>
              </div>
              <div className="chat-log-body">
                Hey!
              </div>
            </div>
          </div>
        </div>



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

      </div>
    );
  }
}

export default Room;
