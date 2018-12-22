import React, { Component } from 'react';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './room.scss';

// Components
import Top from './top/top';
import Center from './center/center';
import Bottom from './bottom/bottom';
import DiceBalloon from './diceBalloon/diceBalloon';

class Room extends Component {
  render() {
    return (
      <div className="room-cont h-100">
        <Top/>
        <Center/>
        <Bottom/>
        <DiceBalloon/>
      </div>
    );
  }
}

export default Room;
