import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MODAL_TYPE_ROOM_SETTING, MODAL_TYPE_CONFIRM } from '../../../../constants/constants';
import { showModal, hideModal } from '../../../../redux/actions/modal';
import { leaveLabel, settingLabel, leaveConfirmText } from './top.i18n';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './top.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    global:   state.global,
    userList: state.userList
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    showModal: (modalType, modalProp) => dispatch(showModal(modalType, modalProp)),
    hideModal: ()                     => dispatch(hideModal()),
  };
};


class Top extends Component {
  constructor (props){
    super(props);

    this.handleSettingClick = this.handleSettingClick.bind(this);
    this.handleLeaveClick   = this.handleLeaveClick.bind(this);
  }

  handleLeaveClick (e){
    this.props.showModal(MODAL_TYPE_CONFIRM, {
      title:        'Leave Room',
      displayClose: false,
      confirmText:  leaveConfirmText[this.props.global.lang],
      accept:       [
        this.props.redirect,
        this.props.hideModal
      ],
      decline:      this.props.hideModal
    });
  }

  handleSettingClick (e){
    this.props.showModal(MODAL_TYPE_ROOM_SETTING, {
      title:        'Setting',
      displayClose: true
    });
  }

  render() {
    return (
      <div className="room-top-cont">
        <div className="room-toolbar d-flex">
          <div className="toolbar-btn cursor-pointer p-2" onClick={this.handleLeaveClick}>
            <FontAwesomeIcon icon="door-open"/>
            <span className="d-none-sm"> {leaveLabel[this.props.global.lang]}</span>
          </div>
          <div className="f-grow-1 align-center p-2">({this.props.userList.length})Room ID: {this.props.global.roomId}</div>
          <div className="toolbar-btn cursor-pointer p-2" onClick={this.handleSettingClick}>
            <FontAwesomeIcon icon="cog"/>
            <span className="d-none-sm"> {settingLabel[this.props.global.lang]}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Top);
