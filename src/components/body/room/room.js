import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setRoomId } from '../../../redux/actions/action';

// Style
import './room.scss';

// Components
import Top from './top/top';
import Center from './center/center';
import Bottom from './bottom/bottom';
import DiceBalloon from './diceBalloon/diceBalloon';

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return { setRoomId: (roomId) => dispatch(setRoomId(roomId)) };
};

class Room extends Component {
  componentWillMount (){
    this.props.setRoomId(this.props.match.params.roomId);
  }

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

export default connect(null, mapDispatchToProps)(Room);
