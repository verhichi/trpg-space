import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { showModal } from '../../../../../redux/actions/action';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './userList.scss';

// Component
import User from './user/user';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    id: state.id,
    showUserList: state.showUserList,
    userList: state.userList
  };
};

// // Redux Map Dispatch To Props
// const mapDispatchToProps = (dispatch) => {
//   return {
//     showModal: (modalType, modalProp) => dispatch(showModal(modalType, modalProp))
//   };
// };

class UserList extends Component {
  // constructor (props){
  //   super(props);
  //   this.handleNewClick = this.handleNewClick.bind(this);
  // }

  // handleNewClick (){
  //   this.props.showModal('newChar', { title: 'Create New Character' });
  // }

  render() {
    const toggleClass = this.props.showUserList ? 'is-active' : '';

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

export default connect(mapStateToProps)(UserList);
