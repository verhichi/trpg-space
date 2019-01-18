import React, { Component } from 'react';
import { connect } from 'react-redux';

// Style
import './chatText.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    id: state.id,
    userList: state.userList
  };
};

class ChatText extends Component {
  render() {
    const selfClass = this.props.chatData.self ? 'self-chat' : 'other-chat';

    if (this.props.chatData.self || !this.props.chatData.private || (this.props.chatData.private && this.props.chatData.sendTo.includes(this.props.id))){
      return (<div className={`chat-log mb-3 ${selfClass}`}>
                 <div className="chat-log-head">
                   {this.props.chatData.private
                     ? (<span className="chat-log-private">[PRIVATE] </span>)
                     : null}
                   <span className="chat-log-user">{this.props.chatData.name}</span>
                   { this.props.chatData.private && !this.props.chatData.self
                       ? <span className="chat-log-user"> > {this.props.userList.find(user => user.id === this.props.id).name}</span>
                       : null }
                   { this.props.chatData.private && this.props.chatData.self
                       ? <span className="chat-log-user"> > {this.props.chatData.sendToNames}</span>
                       : null }
                   <span className="chat-log-time">{this.props.chatData.time}</span>

                 </div>
                 <div className="chat-log-body p-2 ml-3">
                   {this.props.chatData.text}
                 </div>
               </div>);
    } else {
      return null;
    }
  }
}

export default connect(mapStateToProps)(ChatText);
