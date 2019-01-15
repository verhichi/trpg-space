import React, { Component } from 'react';
import { connect } from 'react-redux';

// Style
import './center.scss';

// Components
import CharList from './charList/charList';
import ChatLog from './chatLog/chatLog';
import MapCont from './mapCont/mapCont';
import Sidebar from './sidebar/sidebar';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { centerMode: state.centerMode };
};


class Center extends Component {
  // <CharList/>

  render() {
    return (
        <div className="room-center-cont d-flex f-grow-1">
          <Sidebar/>
          {this.props.centerMode === 'chat'
            ? (<ChatLog/>)
            : (<MapCont/>)}
        </div>
    );
  }
}

export default connect(mapStateToProps)(Center);
