import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal, editChar, addToCharList, removeFromCharList, removeMapChar } from '../../../../../redux/actions/action';
import socket from '../../../../../socket/socketClient';


// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './charList.scss';

// Component
import Char from './char/char';

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

class CharList extends Component {
  constructor (props){
    super(props);
    this.handleNewClick = this.handleNewClick.bind(this);
  }

  componentDidMount (){
    socket.on('char', (content) => {
      if (this.props.charList.some((char) => char.charId === content.charId)){
        this.props.editChar(content);
      } else {
        this.props.addToCharList(content);
      }
    });

    socket.on('delChar', (charId) => {
      this.props.removeFromCharList(charId);
      this.props.removeMapChar(charId);
    })
  }

  handleNewClick (){
    this.props.showModal('newChar', {
      title: 'Create New Character',
      displayClose: true
    });
  }

  render() {
    const toggleActive = this.props.displayCharList ? 'is-active' : '';
    const toggleClass = this.props.isMobile ? '' : 'hideScroll';

    const charList = this.props.charList.map((charData) => {
      return <Char key={charData.charId} charData={charData}/>;
    });

    return (
      <div className={`list-cont d-flex ${toggleActive}`}>
        <div className="list-tool-bar d-flex mb-1">
          <FontAwesomeIcon icon="address-card"/>
          <div className="f-grow-1 align-center font-weight-bold text-dec-underline">Character List</div>
          <div className="cursor-pointer" onClick={this.handleNewClick}>
            <FontAwesomeIcon icon="user-plus"/>
            <span className="d-none-sm"> New</span>
          </div>
        </div>
        <div className={`list d-flex f-grow-1 ${toggleClass}`}>
          {charList}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharList);
