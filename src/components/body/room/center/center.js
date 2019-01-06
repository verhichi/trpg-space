import React, { Component } from 'react';
import { connect } from 'react-redux';

// Style
import './center.scss';

// Components
import CharList from './charList/charList';
import ChatLog from './chatLog/chatLog';
import EnemyList from './enemyList/enemyList';
import Map from './map/map';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { centerMode: state.centerMode };
};


class Center extends Component {
  render() {
    return (
        <div className="room-center-cont d-flex f-grow-1">
          <CharList/>
          {this.props.centerMode === 'chat'
            ? (<ChatLog/>)
            : (<Map/>)}
          <EnemyList/>
        </div>
    );
  }
}

export default connect(mapStateToProps)(Center);
