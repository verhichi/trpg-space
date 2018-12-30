import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal, addEnemy, editEnemy, removeEnemy } from '../../../../../redux/actions/action';
import socket from '../../../../../socket/socketClient';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './enemyList.scss';

// // Component
import Enemy from './enemy/enemy';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    isMobileOrSafari: state.isMobileOrSafari,
    id:               state.id,
    roomId:           state.roomId,
    displayEnemyList: state.displayEnemyList,
    enemyList:        state.enemyList
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    showModal: (modalType, modalProp) => dispatch(showModal(modalType, modalProp)),
    addEnemy:    (enemyData) => dispatch(addEnemy(enemyData)),
    editEnemy:   (enemyData) => dispatch(editEnemy(enemyData)),
    removeEnemy: (enemyId) => dispatch(removeEnemy(enemyId))
  };
};

class EnemyList extends Component {
  constructor (props){
    super(props);
    this.handleNewClick = this.handleNewClick.bind(this);
  }

  componentDidMount (){
    socket.on('enemy', (content) => {
      if (this.props.enemyList.some((enemy) => enemy.charId === content.charId)){
        this.props.editEnemy(content);
      } else {
        this.props.addEnemy(content);
      }
    });

    socket.on('delEnemy', (enemyId) => {
      this.props.removeEnemy(enemyId);
    });
  }

  handleNewClick (e){
    this.props.showModal('newEnemy', {
      title: 'Create New Enemy',
      displayClose: true
    });
  }

  render() {
    const toggleActive = this.props.displayEnemyList ? 'is-active' : '';
    const toggleClass = this.props.isMobileOrSafari ? '' : 'hideScroll';

    const enemyList = this.props.enemyList.map((enemy) => {
      return ( <Enemy key={enemy.charId} enemyData={enemy}/> );
    });

    return (
      <div className={`list-cont d-flex ${toggleActive}`}>
        <div className="list-tool-bar d-flex mb-1">
          <div className="f-grow-1 align-center font-weight-bold text-dec-underline">Enemy List</div>
          <div className="cursor-pointer" onClick={this.handleNewClick}>
            <FontAwesomeIcon icon="user-plus"/>
            <span className="d-none-sm"> New</span>
          </div>
        </div>
        <div className={`list d-flex f-grow-1 ${toggleClass}`}>
          {enemyList}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnemyList);
