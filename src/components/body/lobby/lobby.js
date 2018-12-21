import React, { Component } from 'react';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './lobby.scss';

class Lobby extends Component {
  render() {
    return (
      <div className="lobby-cont h-100">

        <div>
          <div className="lobby-inp-cont w-100">
            <div className="lobby-inp-label">Enter Room ID to join:</div>
            <div><input className="lobby-inp-field w-100" type="tel"/></div>
            <button className="btn btn-hot w-100 cursor-pointer">
              <FontAwesomeIcon icon="sign-in-alt"/>
              <div className="btn-text">Join Existing Room</div>
            </button>
          </div>

          <div className="align-center">or</div>

          <div className="lobby-inp-cont w-100">
            <div className="lobby-inp-label">Click here to start your own Room:</div>
            <button className="btn btn-hot w-100 cursor-pointer">
              <FontAwesomeIcon icon="tools"/>
              <div className="btn-text">Start New Room</div>
            </button>
            </div>
        </div>

      </div>
    );
  }
}

export default Lobby;
