import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal, editChar, addToCharList, removeFromCharList } from '../../../../../redux/actions/action';
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
    removeFromCharList: (charId) => dispatch(removeFromCharList(charId))
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
      this.props.removeFromCharList(charId)
    })
  }

  handleNewClick (){
    this.props.showModal('newChar', { title: 'Create New Character' });
  }

  render() {
    const toggleClass = this.props.displayCharList ? 'is-active' : '';

    const charList = this.props.charList.map((charData) => {
      return <Char key={charData.charId} charData={charData}/>;
    });

    return (
      <div className={`list-cont d-flex ${toggleClass}`}>
        <div className="list-tool-bar d-flex mb-1">
          <div className="f-grow-1 align-center font-weight-bold text-dec-underline">Character List</div>
          <div className="cursor-pointer" onClick={this.handleNewClick}>
            <FontAwesomeIcon icon="user-plus"/>
            <span className="d-none-sm"> New</span>
          </div>
        </div>
        <div className="list d-flex f-grow-1">
          {charList}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharList);
