import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { showModal } from '../../../../../redux/actions/action';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './user.scss';

// Component
// import Char from './char/char';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    id: state.id,
    userList: state.userList
  };
};

// // Redux Map Dispatch To Props
// const mapDispatchToProps = (dispatch) => {
//   return {
//     showModal: (modalType, modalProp) => dispatch(showModal(modalType, modalProp))
//   };
// };

class User extends Component {
  // constructor (props){
  //   super(props);
  //   this.handleNewClick = this.handleNewClick.bind(this);
  // }

  // handleNewClick (){
  //   this.props.showModal('newChar', { title: 'Create New Character' });
  // }

  render() {
    return (
      <div>
        USER
      </div>
    );
  }
}

export default connect(mapStateToProps)(User);
