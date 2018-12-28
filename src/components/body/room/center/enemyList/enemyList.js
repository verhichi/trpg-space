import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser, editUser } from '../../../../../redux/actions/action';
import socket from '../../../../../socket/socketClient';


// Font Awesome Component
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  return {
    addUser: (userData) => dispatch(addUser(userData)),
    editUser: (userData) => dispatch(editUser(userData))
  };
};

class EnemyList extends Component {

  render() {
    const toggleClass = this.props.displayEnemyList ? 'is-active' : '';

    return (
      <div className={`list-cont d-flex ${toggleClass}`}>
        <div className="list-tool-bar d-flex mb-1">
          <div className="f-grow-1 align-center font-weight-bold text-dec-underline">Enemy List</div>
        </div>
        <div className="list d-flex f-grow-1">
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnemyList);
