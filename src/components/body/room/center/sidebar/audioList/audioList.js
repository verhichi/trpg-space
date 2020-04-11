import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { createAudioBtnLabel, importAudioBtnLabel } from './audioList.i18n'
import { MODAL_TYPE_NEW_AUDIO, MODAL_TYPE_IMPORT_CHAR, AUDIO_TYPE_BGM, AUDIO_TYPE_SE } from '../../../../../../constants/constants';
import { showModal } from '../../../../../../redux/actions/modal';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './audioList.scss';

// Component
import Audio from './audio/audio';


// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    audioList: state.audioList,
    global:    state.global
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return { showModal: (modalType, modalProp) => dispatch(showModal(modalType, modalProp)) };
};

class AudioList extends Component {
  constructor (props){
    super(props);
    this.handleNewClick = this.handleNewClick.bind(this);
  }

  handleNewClick (){
    this.props.showModal(MODAL_TYPE_NEW_AUDIO, {
      title:        createAudioBtnLabel[this.props.global.lang],
      size:         'lg',
      displayClose: true
    });
  }

  render() {
    const audioList = this.props.audioList.map(audio => <Audio key={audio.audioId} audio={audio} />);

    return (
      <Fragment>
        <div className="d-flex mb-2 mt-2 f-shrink-0">
          <button className="btn-slim btn-hot cursor-pointer align-center f-grow-1 p-2" onClick={this.handleNewClick}>
            <span className="mr-3"><FontAwesomeIcon icon="plus"/></span>
            { createAudioBtnLabel[this.props.global.lang] }
          </button>
        </div>

        <div className="mb-2">
          <div className="char-list-label align-center font-weight-bold text-dec-underline pb-1">
            YouTube Videos
          </div>
          {audioList.length === 0
              ? (<div className="empty-cont p-3 font-size-lg align-center font-weight-bold cursor-pointer" onClick={this.handleNewClick}>
                Add YouTube Video
                </div>)
              : audioList}
        </div>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioList);
