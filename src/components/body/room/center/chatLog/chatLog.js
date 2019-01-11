import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal } from '../../../../../redux/actions/action';

// Style
import './chatLog.scss';

// Components
import ChatHost from './chatHost/chatHost';
import ChatImage from './chatImage/chatImage';
import ChatJoin from './chatJoin/chatJoin';
import ChatLeave from './chatLeave/chatLeave';
import ChatRoll from './chatRoll/chatRoll';
import ChatText from './chatText/chatText';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    isMobile: state.isMobile,
    chatLog: state.chatLog
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return { showModal: (modalType, modalProp) => dispatch(showModal(modalType, modalProp)) };
};

class ChatLog extends Component {
  constructor (props){
    super(props);
    this.myRef = React.createRef();
  }

  componentDidUpdate (){
    this.myRef.current.scrollTop = this.myRef.current.scrollHeight;
  }

  render() {

    const toggleClass = this.props.isMobile ? '' : 'hide-scroll';

    // Choose component based on chat type
    const chatType = {
      text: (chatData, idx) => <ChatText chatData={chatData} key={idx}/>,
      roll: (chatData, idx) => <ChatRoll chatData={chatData} key={idx}/>,
      image: (chatData, idx) => <ChatImage chatData={chatData} key={idx}/>,
      join: (chatData, idx) => <ChatJoin chatData={chatData} key={idx}/>,
      leave: (chatData, idx) => <ChatLeave chatData={chatData} key={idx}/>,
      newHost: (chatData, idx) => <ChatHost chatData={chatData} key={idx}/>,
    };

    const chatLog = this.props.chatLog.map((chatData, idx) => {
      return chatType[chatData.type](chatData, idx);
    });

    return (
      <div className="chat-log-cont f-grow-1">
        <div className={`chat-log-wrap d-flex f-dir-col h-100 ${toggleClass}`} ref={this.myRef}>
          {chatLog}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatLog);
