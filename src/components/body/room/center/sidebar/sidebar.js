import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSidebarTabMode } from '../../../../../redux/actions/action';
// import socket from '../../../../../socket/socketClient';


// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './sidebar.scss';

// // Component
import CharList from './charList/charList';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    isMobile: state.isMobile,
    displaySidebar: state.displaySidebar,
    sidebarTabMode: state.sidebarTabMode
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return { setSidebarTabMode: (sidebarTabMode) => dispatch(setSidebarTabMode(sidebarTabMode)) };
};

class Sidebar extends Component {
  constructor (props){
    super(props);
    this.handleCharTabClick = this.handleTabClick.bind(this, 'char');
    this.handleNotesTabClick = this.handleTabClick.bind(this, 'notes');
  }

  handleTabClick (tabMode, e){
    this.props.setSidebarTabMode(tabMode);
  }

  render() {
    const toggleClass = this.props.isMobile ? '' : 'hide-scroll';
    const toggleSidebarClass = this.props.displaySidebar ? 'is-active' : '';

    const toggleCharTabClass = this.props.sidebarTabMode === 'char' ? 'is-active' : '';
    const toggleNotesTabClass = this.props.sidebarTabMode === 'notes' ? 'is-active' : '';

    return (
      <div className={`list-cont f-dir-col f-shrink-0 d-flex ${toggleSidebarClass}`}>

        <div className="d-flex f-shrink-0 font-size-lg">
          <div className={`list-tab f-shrink-0 align-center p-1 cursor-pointer ${toggleCharTabClass}`} onClick={this.handleCharTabClick}>
            <FontAwesomeIcon icon="address-card"/>
            <span className="d-none-sm"> Character</span>
          </div>
          <div className={`list-tab f-shrink-0 align-center p-1 cursor-pointer ${toggleNotesTabClass}`} onClick={this.handleNotesTabClick}>
            <FontAwesomeIcon icon="sticky-note"/>
            <span className="d-none-sm"> Notes</span>
          </div>
        </div>

        <div className={`sidebar-body p-1 d-flex f-grow-1 f-dir-col ${toggleClass}`}>
          {this.props.sidebarTabMode === 'char'
            ? <CharList/>
            : null}
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
