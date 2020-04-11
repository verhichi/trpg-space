import React, { Component } from 'react';
import { CENTER_MODE_CHAT, CENTER_MODE_MAP, AUDIO_TYPE_BGM, AUDIO_TYPE_SE, YOUTUBE_IFRAME_URL_PREFIX } from '../../../../constants/constants';
import { connect } from 'react-redux';

// Style
import './center.scss';

// Components
import ChatLog from './chatLog/chatLog';
import MapCont from './mapCont/mapCont';
import Sidebar from './sidebar/sidebar';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    displaySetting: state.displaySetting,
    audioList: state.audioList,
  };
};


class Center extends Component {
  render() {
    const centerType = {
      [CENTER_MODE_CHAT]: <ChatLog/>,
      [CENTER_MODE_MAP]:  <MapCont/>
    }

    const currentYoutubeBGM = this.props.audioList.find(audio => audio.isPlaying && audio.type === AUDIO_TYPE_BGM)

    return (
      <div className="room-center-cont d-flex f-grow-1">
        <Sidebar/>
        {centerType[this.props.displaySetting.centerMode]}
        {currentYoutubeBGM && 
          <div className="iframe-cont mini-player p-absolute bottom-0 right-0">
            <iframe
              className="iframe-youtube bottom-0 right-0"
              title="sample"
              frameBorder="0"
              src={`${YOUTUBE_IFRAME_URL_PREFIX}${currentYoutubeBGM.youtubeId}?autoplay=1&loop=1&playlist=${currentYoutubeBGM.youtubeId}`}
            />
          </div>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps)(Center);
