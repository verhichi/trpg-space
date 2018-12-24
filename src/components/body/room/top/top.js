import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showUserList, hideUserList } from '../../../../redux/actions/action';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './top.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    displayUserList: state.displayUserList,
    userList: state.userList
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    showUserList: () => dispatch(showUserList()),
    hideUserList: () => dispatch(hideUserList())
  };
};


class Top extends Component {
  constructor (props){
    super(props);
    this.handleSettingClick = this.handleSettingClick.bind(this);
  }

  handleSettingClick (e){
    this.props.displayUserList
      ? this.props.hideUserList()
      : this.props.showUserList();
  }

  render() {
    return (
      <div className="room-top-cont">
        <div className="tool-bar d-flex">
          <div className="f-grow-1">({this.props.userList.length})Room ID: 123456</div>
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
