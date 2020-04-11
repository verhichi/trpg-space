import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SIDEBAR_MODE_CHAR, SIDEBAR_MODE_NOTE, SIDEBAR_MODE_AUDIO } from '../../../../../constants/constants';
import { setSidebarChar, setSidebarNote, setSidebarAudio } from '../../../../../redux/actions/display';
import { charTabLabel, noteTabLabel, audioTabLabel } from './sidebar.i18n';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './sidebar.scss';

// // Component
import CharList from './charList/charList';
import NoteList from './noteList/noteList';
import AudioList from './audioList/audioList';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    global:        state.global,
    displaySetting: state.displaySetting
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    setSidebarChar: () => dispatch(setSidebarChar()),
    setSidebarNote: () => dispatch(setSidebarNote()),
    setSidebarAudio: () => dispatch(setSidebarAudio()),
  };
};

class Sidebar extends Component {
  constructor (props){
    super(props);

    this.handleCharTabClick = this.handleCharTabClick.bind(this);
    this.handleNoteTabClick = this.handleNoteTabClick.bind(this);
    this.handleAudioTabClick = this.handleAudioTabClick.bind(this);
  }

  handleCharTabClick (){
    this.props.setSidebarChar();
  }

  handleNoteTabClick (){
    this.props.setSidebarNote();
  }

  handleAudioTabClick (){
    this.props.setSidebarAudio();
  }

  render() {
    const toggleClass        = this.props.global.isMobile ? '' : 'hide-scroll';
    const toggleSidebarClass = this.props.displaySetting.displaySidebar ? 'is-active' : '';

    const toggleCharTabClass  = this.props.displaySetting.sidebarTabMode === SIDEBAR_MODE_CHAR ? 'is-active' : '';
    const toggleNotesTabClass = this.props.displaySetting.sidebarTabMode === SIDEBAR_MODE_NOTE ? 'is-active' : '';
    const toggleAudioTabClass = this.props.displaySetting.sidebarTabMode === SIDEBAR_MODE_AUDIO ? 'is-active' : '';

    const tabType = {
      [SIDEBAR_MODE_CHAR]: <CharList/>,
      [SIDEBAR_MODE_NOTE]: <NoteList/>,
      [SIDEBAR_MODE_AUDIO]: <AudioList/>
    };

    return (
      <div className={`list-cont f-dir-col f-shrink-0 d-flex ${toggleSidebarClass}`}>

        <div className="d-flex f-shrink-0 font-size-lg">
          <div className={`list-tab f-shrink-0 align-center p-1 cursor-pointer ${toggleCharTabClass}`} onClick={this.handleCharTabClick}>
            <FontAwesomeIcon icon="address-card"/>
            <span className="d-none-sm"> {charTabLabel[this.props.global.lang]}</span>
          </div>
          <div className={`list-tab f-shrink-0 align-center p-1 cursor-pointer ${toggleNotesTabClass}`} onClick={this.handleNoteTabClick}>
            <FontAwesomeIcon icon="sticky-note"/>
            <span className="d-none-sm"> {noteTabLabel[this.props.global.lang]}</span>
          </div>
          <div className={`list-tab f-shrink-0 align-center p-1 cursor-pointer ${toggleAudioTabClass}`} onClick={this.handleAudioTabClick}>
            <FontAwesomeIcon icon="music"/>
            <span className="d-none-sm"> {audioTabLabel[this.props.global.lang]}</span>
          </div>
        </div>

        <div className={`sidebar-body p-1 d-flex f-grow-1 f-dir-col ${toggleClass}`}>
          {tabType[this.props.displaySetting.sidebarTabMode]}
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
