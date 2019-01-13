import React, { Component } from 'react';

// Style
import './chatRoll.scss';

class ChatRoll extends Component {
  render() {
    const selfClass = this.props.chatData.self ? 'self-chat' : 'other-chat';

    return(
      <div className={`chat-log mb-3 ${selfClass}`}>
        <div className="chat-log-head">
          <span className="font-size-lg font-weight-bold pr-2">{this.props.chatData.name}</span>
          <span className="pr-2">{this.props.chatData.time}</span>
          <span>[{this.props.chatData.diceSetting}]</span>
          {this.props.chatData.private
            ? (<span className="chat-log-private ml-2 p-1 font-size-xs">PRIVATE</span>)
            : null}
        </div>
        <div className="chat-log-body p-2 ml-3">
          <div className="d-flex">
            <div>
              <div>Dice Roll Result(Bonus):</div>
              <div className="font-size-xxl">{this.props.chatData.result}</div>
            </div>
            <div className="pl-3">
              <div>Total:</div>
              <div className="font-size-xxl">{this.props.chatData.total}</div>
            </div>
          </div>
        </div>
      </div>
    );

  }
}

export default ChatRoll;
