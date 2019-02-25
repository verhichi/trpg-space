import React, { Component } from 'react';
import { connect } from 'react-redux';

// Style
import './chatText.scss';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    global:   state.global,
    userList: state.userList
  };
};

class ChatText extends Component {
  render() {
    if (this.props.chatData.self || !this.props.chatData.private || (this.props.chatData.private && this.props.chatData.sendTo.includes(this.props.global.id))){
      return (
        <div className="mini-chat">
          <div className="mini-chat-icon">
            <FontAwesomeIcon icon="comment"/>
          </div>
          {this.props.chatData.private && <div className="d-inline-block">[PRIVATE]</div>}
          [{this.props.chatData.name}] {this.props.chatData.text}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default connect(mapStateToProps)(ChatText);
