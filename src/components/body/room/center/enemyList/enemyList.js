import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal } from '../../../../../redux/actions/action';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './enemyList.scss';

// // Component
// import User from './user/user';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    id:               state.id,
    roomId:           state.roomId,
    displayEnemyList: state.displayEnemyList,
    enemyList:        state.enemyList
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return { showModal: (modalType, modalProp) => dispatch(showModal(modalType, modalProp)) };
};

class EnemyList extends Component {
  constructor (props){
    super(props);
    this.handleNewClick = this.handleNewClick.bind(this);
  }

  handleNewClick (e){
    this.props.showModal('newEnemy', {
      title: 'Create New Enemy'
    });
  }

  render() {
    const toggleClass = this.props.displayEnemyList ? 'is-active' : '';

    return (
      <div className={`list-cont d-flex ${toggleClass}`}>
        <div className="list-tool-bar d-flex mb-1">
          <div className="f-grow-1 align-center font-weight-bold text-dec-underline">Enemy List</div>
          <div className="cursor-pointer" onClick={this.handleNewClick}>
            <FontAwesomeIcon icon="user-plus"/>
            <span className="d-none-sm"> New</span>
          </div>
        </div>
        <div className="list d-flex f-grow-1">
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnemyList);
