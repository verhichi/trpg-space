import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SIDEBAR_MODE_CHAR, SIDEBAR_MODE_NOTE } from '../../../../../constants/constants';
import { setSidebarChar, setSidebarNote } from '../../../../../redux/actions/display';


// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './sidebar.scss';

// // Component
import CharList from './charList/charList';
import Notes    from './notes/notes';

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
    setSidebarNote: () => dispatch(setSidebarNote())
  };
};

class Sidebar extends Component {
  constructor (props){
    super(props);

    this.handleCharTabClick  = this.handleCharTabClick.bind(this);
    this.handleNoteTabClick  = this.handleNoteTabClick.bind(this);
  }

  handleCharTabClick (e){
    this.props.setSidebarChar();
  }

  handleNoteTabClick (e){
    this.props.setSidebarNote();
  }

  render() {
    const toggleClass        = this.props.global.isMobile ? '' : 'hide-scroll';
    const toggleSidebarClass = this.props.displaySetting.displaySidebar ? 'is-active' : '';

    const toggleCharTabClass  = this.props.displaySetting.sidebarTabMode === SIDEBAR_MODE_CHAR ? 'is-active' : '';
    const toggleNotesTabClass = this.props.displaySetting.sidebarTabMode === SIDEBAR_MODE_NOTE ? 'is-active' : '';

    const tabType = {
      [SIDEBAR_MODE_CHAR]: <CharList/>,
      [SIDEBAR_MODE_NOTE]: <Notes/>
    };

    return (
      <div className={`list-cont f-dir-col f-shrink-0 d-flex ${toggleSidebarClass}`}>

        <div className="d-flex f-shrink-0 font-size-lg">
          <div className={`list-tab f-shrink-0 align-center p-1 cursor-pointer ${toggleCharTabClass}`} onClick={this.handleCharTabClick}>
            <FontAwesomeIcon icon="address-card"/>
            <span className="d-none-sm"> Character</span>
          </div>
          <div className={`list-tab f-shrink-0 align-center p-1 cursor-pointer ${toggleNotesTabClass}`} onClick={this.handleNoteTabClick}>
            <FontAwesomeIcon icon="sticky-note"/>
            <span className="d-none-sm"> Notes</span>
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
