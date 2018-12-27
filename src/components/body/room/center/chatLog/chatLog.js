import React, { Component } from 'react';
import { connect } from 'react-redux';

// Style
import './chatLog.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { chatLog: state.chatLog };
};

class ChatLog extends Component {

  render() {

    const chatLog = this.props.chatLog.map((val, idx) => {
      switch (val.type){
        case 'text':
          return (
            <div className="chat-log" key={idx}>
              <div className="chat-log-head">
                <span className="chat-log-user">{val.name}</span>
                <span className="chat-log-time">{val.time}</span>
              </div>
              <div className="chat-log-body pl-3">
                {val.text}
              </div>
            </div>
          );

        case 'roll':
          return (
            <div className="chat-log" key={idx}>
              <div className="chat-log-head">
                <span className="chat-log-user">{val.name}</span>
                <span className="chat-log-time">{val.time}</span>
              </div>
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
            </div>
          );

        case 'join':
          return (
            <div className="chat-log" key={idx}>
              <div className="chat-log-join p-2">
                {val.name} has joined the room.
              </div>
            </div>
          );

        case 'leave':
          return (
            <div className="chat-log" key={idx}>
              <div className="chat-log-join p-2">
                {val.name} has left the room.
              </div>
            </div>
          );

        default:
          return null;
      }
    });

    return (
      <div className="chat-log-cont w-100">
        {chatLog}
      </div>
    );
  }
}

export default connect(mapStateToProps)(ChatLog);
