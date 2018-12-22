import React, { Component } from 'react';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './top.scss';

class Top extends Component {
  render() {
    return (
        <div className="room-top-cont">
          <div className="tool-bar d-flex">
            <div className="f-grow-1">(2)Room ID: 123456</div>
            <div className="tool-bar-btn cursor-pointer">
              <FontAwesomeIcon icon="cog"/>
              <span className="d-none-sm"> Settings</span>
            </div>
          </div>
        </div>
    );
  }
}

export default Top;
