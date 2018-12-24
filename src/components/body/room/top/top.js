import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleUserList } from '../../../../redux/actions/action';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './top.scss';

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return { toggleUserList: () => dispatch(toggleUserList()) };
};


class Top extends Component {
  constructor (props){
    super(props);
    this.handleSettingClick = this.handleSettingClick.bind(this);
  }

  handleSettingClick (e){
    this.props.toggleUserList();
  }

  render() {
    return (
      <div className="room-top-cont">
        <div className="tool-bar d-flex">
          <div className="f-grow-1">(2)Room ID: 123456</div>
          <div className="tool-bar-btn cursor-pointer" onClick={this.handleSettingClick}>
            <FontAwesomeIcon icon="cog"/>
            <span className="d-none-sm"> Settings</span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Top);
