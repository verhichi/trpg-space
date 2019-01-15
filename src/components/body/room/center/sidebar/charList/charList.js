import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { showModal, editChar, addToCharList, removeFromCharList, removeMapChar } from '../../../../../../redux/actions/action';
import socket from '../../../../../../socket/socketClient';


// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './charList.scss';

// Component
import Char from './char/char';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
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
    const charList = this.props.charList.filter(char => char.type === 'ally').map((charData) => {
      return <Char key={charData.charId} charData={charData}/>;
    });

    const enemyList = this.props.charList.filter(char => char.type === 'enemy').map((charData) => {
      return <Char key={charData.charId} charData={charData}/>;
    });

    return (
      <Fragment>

        <button className="btn-slim btn-hot cursor-pointer align-center mb-2 mt-2 p-2 f-shrink-0" onClick={this.handleNewClick}>
          <div>
            <FontAwesomeIcon icon="user-plus"/>
          </div>
          <div className="btn-text">New Character</div>
        </button>

        <div className="mb-2">
          <div className="char-list-label align-center font-weight-bold text-dec-underline pb-1">Character List</div>
          <div className="d-flex f-grow-1 f-dir-col">
            {charList.length === 0
              ? (<div className="empty-cont p-3 font-size-lg align-center font-weight-bold cursor-pointer" onClick={this.handleNewClick}>Create New Character</div>)
              : charList}
          </div>
        </div>

        <div>
           <div className="char-list-label align-center font-weight-bold text-dec-underline pb-1">Enemy List</div>
           <div className="d-flex f-grow-1 f-dir-col">
             {enemyList.length === 0
               ? (<div className="empty-cont p-3 font-size-lg align-center font-weight-bold cursor-pointer" onClick={this.handleNewClick}>Create New Enemy</div>)
               : enemyList}
           </div>
         </div>

       </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharList);
