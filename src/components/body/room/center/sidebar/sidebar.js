import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal, editChar, addToCharList, removeFromCharList, removeMapChar } from '../../../../../redux/actions/action';
// import socket from '../../../../../socket/socketClient';


// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './sidebar.scss';

// // Component
// import Char from './char/char';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    isMobile: state.isMobile,
    id: state.id,
    displayCharList: state.displayCharList,
    charList: state.charList
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    showModal: (modalType, modalProp) => dispatch(showModal(modalType, modalProp)),
    editChar: (charData) => dispatch(editChar(charData)),
    addToCharList: (charData) => dispatch(addToCharList(charData)),
    removeFromCharList: (charId) => dispatch(removeFromCharList(charId)),
    removeMapChar: (charId) => dispatch(removeMapChar(charId))
  };
};

class Sidebar extends Component {

  render() {
    const toggleActive = this.props.displayCharList ? 'is-active' : '';

    return (
      <div className={`list-cont f-dir-col f-shrink-0 d-flex ${toggleActive}`}>

        <div className="d-flex f-shrink-0 font-size-lg">
          <div className="list-tab f-shrink-0 align-center p-1 cursor-pointer is-active">
            <FontAwesomeIcon icon="address-card"/>
            <span className="d-none-sm"> Character</span>
          </div>
          <div className="list-tab f-shrink-0 align-center p-1 cursor-pointer">
            <FontAwesomeIcon icon="sticky-note"/>
            <span className="d-none-sm"> Notes</span>
          </div>
        </div>

        <div className="p-1 f-grow-1 f-dir-col f-shrink-0">

        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
