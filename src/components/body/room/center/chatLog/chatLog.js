import React, { Component } from 'react';
import { connect } from 'react-redux';

// Style
import './chatLog.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {chatLog: state.chatLog};
};

class ChatLog extends Component {

  render() {

    const chatLog = this.props.chatLog.map((val, idx) => {
      const chatHead = (
        <div className="chat-log-head">
          <span className="chat-log-user">{val.name}</span>
          <span className="chat-log-time">{val.time}</span>
        </div>
      );

      let chatBody;

      switch (val.type){
        case 'text':
          chatBody = (
            <div className="chat-log-body pl-3">
              {val.text}
            </div>
          );
          break;

        case 'roll':
          chatBody = (
            <div className="chat-log-body pl-3">
              <div className="d-flex">
                <div>
                  <div>Dice Roll Result(Bonus):</div>
                  <div className="font-size-xxl">{val.result}</div>
                </div>
                <div className="pl-3">
                  <div>Total:</div>
                  <div className="font-size-xxl">{val.total}</div>
                </div>
              </div>
            </div>
          );
          break;

        default:
          return null;
      }

      return (
        <div className="chat-log" key={idx}>
          {chatHead}
          {chatBody}
        </div>
      );
    });

    return (
      <div className="chat-log-cont w-100">
        {chatLog}
      </div>
    );
  }
}

export default connect(mapStateToProps)(ChatLog);
