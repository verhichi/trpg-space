import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal, hideModal, removeUser } from '../../../../redux/actions/action';
import socket from '../../../../socket/socketClient';


// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './user.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    id: state.id,
    roomId: state.roomId,
    userList: state.userList
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    showModal: (modalType, modalProp) => dispatch(showModal(modalType, modalProp)),
    hideModal: () => dispatch(hideModal()),
    removeUser: (userId) => dispatch(removeUser(userId))
  };
};

class User extends Component {
  constructor (props){
    super(props);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  handleEditClick (e){
    this.props.showModal('editUser', {
      title: 'Edit User',
      displayClose: true
    });
  }

  handleRemoveClick (e){
    this.props.showModal('confirm', {
      title: 'Kick User',
      displayClose: false,
      confirmText: `Are you sure you want to kick ${this.props.userData.name} from this room?`,
      accept: [
        socket.emit.bind(socket, 'delUser', this.props.roomId, this.props.userData.id),
        this.props.showModal.bind(null, 'roomSetting', { title: 'Setting', displayClose: true })
      ],
      decline: this.props.showModal.bind(null, 'roomSetting', { title: 'Room Setting' })
    });
  }

  render() {
    return (
      <div className="user-cont d-flex w-100 mb-2">
        <div className="user-stat mr-3 align-center">
          {this.props.userData.host
            ? (<FontAwesomeIcon icon="chess-queen"/>)
            : (<FontAwesomeIcon icon="chess-pawn"/>)
          }
        </div>
        <div className="user-btn mr-3 align-center">
          {this.props.id === this.props.userData.id
            ? (<div className="cursor-pointer" onClick={this.handleEditClick}>
                 <FontAwesomeIcon icon="pen-square"/>
               </div>)
            : null
          }
        </div>
        <div className="user-btn mr-3 align-center" >
          {this.props.userList.find((user) => user.id === this.props.id).host && this.props.id !== this.props.userData.id
            ? (<div className="cursor-pointer" onClick={this.handleRemoveClick}>
                 <FontAwesomeIcon icon="window-close"/>
               </div>)
            : null
          }
        </div>
        <div className="user-name f-grow-1 font-weight-bold">
          {this.props.userData.name} {this.props.userData.id === this.props.id ? ('(YOU)') : null}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
