import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal, showUserList, hideUserList } from '../../../../redux/actions/action';

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
    hideUserList: () => dispatch(hideUserList()),
    showUserList: () => dispatch(showUserList())
  };
};


class Top extends Component {
  constructor (props){
    super(props);
    this.handleSettingClick = this.handleSettingClick.bind(this);
  }

  handleSettingClick (e){
    // this.props.displayUserList
    //   ? this.props.hideUserList()
    //   : this.props.showUserList();
    this.props.showModal('roomSetting', {
      title: 'Setting'
    });
  }

  render() {
    return (
      <div className="room-top-cont">
        <div className="tool-bar d-flex">
          <div className="f-grow-1">({this.props.userList.length})Room ID: {this.props.roomId}</div>
          <div className="tool-bar-btn cursor-pointer" onClick={this.handleSettingClick}>
            <FontAwesomeIcon icon="cog"/>
            <span className="d-none-sm"> Settings</span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Top);
