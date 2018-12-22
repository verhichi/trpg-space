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
      switch (val.type){
        default:
          return(
            <div className="chat-log" key={idx}>
              <div className="chat-log-head">
                <span className="chat-log-user">{val.displayName}</span>
                <span className="chat-log-time">{val.time}</span>
              </div>
              <div className="chat-log-body">
                {val.text}
              </div>
            </div>
          );
      }
    });

    return (
      <div className="chat-log-cont h-100 w-100">
        {chatLog}
      </div>
    );
  }
}

export default connect(mapStateToProps)(ChatLog);
