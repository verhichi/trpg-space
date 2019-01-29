import React, { Component } from 'react';
import { CENTER_MODE_CHAT, CENTER_MODE_MAP } from '../../../../constants/constants';
import { connect } from 'react-redux';

// Style
import './center.scss';

// Components
import ChatLog from './chatLog/chatLog';
import MapCont from './mapCont/mapCont';
import Sidebar from './sidebar/sidebar';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { displaySetting: state.displaySetting };
};


class Center extends Component {
  render() {
    const centerType = {
      [CENTER_MODE_CHAT]: <ChatLog/>,
      [CENTER_MODE_MAP]:  <MapCont/>
    }

    return (
      <div className="room-center-cont d-flex f-grow-1">
        <Sidebar/>
        {centerType[this.props.displaySetting.centerMode]}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Center);
