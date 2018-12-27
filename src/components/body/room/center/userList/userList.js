import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser, editUser } from '../../../../../redux/actions/action';
import socket from '../../../../../socket/socketClient';


// Font Awesome Component
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './userList.scss';

// Component
import User from './user/user';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    id: state.id,
    displayUserList: state.displayUserList,
    userList: state.userList
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (userData) => dispatch(addUser(userData)),
    editUser: (userData) => dispatch(editUser(userData))
  };
};

class UserList extends Component {

  componentDidMount (){
    socket.on('user', (content) => {
      if (this.props.userList.some((user) => user.id === content.id)){
        this.props.editUser(content);
      } else {
        this.props.adduser(content);
      }
    })
  }

  render() {
    const toggleClass = this.props.displayUserList ? 'is-active' : '';

    const userList = this.props.userList.map((userData) => {
      return <User key={userData.id} userData={userData}/>;
    });

    return (
      <div className={`list-cont d-flex ${toggleClass}`}>
        <div className="list-tool-bar d-flex mb-1">
          <div className="f-grow-1 align-center font-weight-bold text-dec-underline">User List</div>
        </div>
        <div className="list d-flex f-grow-1">
          {userList}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
