import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal, hideModal, showUserList, hideUserList } from '../../../../redux/actions/action';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './top.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    roomId: state.roomId,
    displayUserList: state.displayUserList,
    userList: state.userList
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    showModal: (modalType, modalProp)=> dispatch(showModal(modalType, modalProp)),
    hideModal: () => dispatch(hideModal()),
    hideUserList: () => dispatch(hideUserList()),
    showUserList: () => dispatch(showUserList())
  };
};


class Top extends Component {
  constructor (props){
    super(props);
    this.handleSettingClick = this.handleSettingClick.bind(this);
    this.handleLeaveClick = this.handleLeaveClick.bind(this);
  }

  handleLeaveClick (e){
    this.props.showModal('confirm', {
      title: 'Leave Room',
      displayClose: false,
      confirmText: 'Are you sure you want to leave this room?',
      accept: this.props.redirect,
      decline: this.props.hideModal
    });
  }

  handleSettingClick (e){
    this.props.showModal('roomSetting', {
      title: 'Setting',
      displayClose: true
    });
  }

  render() {
    return (
      <div className="room-top-cont">
        <div className="room-toolbar d-flex">
          <div className="toolbar-btn cursor-pointer" onClick={this.handleLeaveClick}>
            <FontAwesomeIcon icon="door-open"/>
            <span className="d-none-sm"> Leave</span>
          </div>
          <div className="f-grow-1 align-center">({this.props.userList.length})Room ID: {this.props.roomId}</div>
          <div className="toolbar-btn cursor-pointer" onClick={this.handleSettingClick}>
            <FontAwesomeIcon icon="cog"/>
            <span className="d-none-sm"> Settings</span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Top);
