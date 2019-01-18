import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal } from '../../../../../redux/actions/action';

// Style
import './chatLog.scss';

// Components
import ChatHelp from './chatHelp/chatHelp';
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

  componentDidMount (){
    this.myRef.current.scrollTop = this.myRef.current.scrollHeight;
  }

  componentDidUpdate (){
    this.myRef.current.scrollTop = this.myRef.current.scrollHeight;
  }

  render() {

    const toggleClass = this.props.isMobile ? '' : 'hide-scroll';

    // Choose component based on chat type
    const chatType = {
      text:    (chatData) => <ChatText  chatData={chatData} key={chatData.id}/>,
      roll:    (chatData) => <ChatRoll  chatData={chatData} key={chatData.id}/>,
      image:   (chatData) => <ChatImage chatData={chatData} key={chatData.id}/>,
      join:    (chatData) => <ChatJoin  chatData={chatData} key={chatData.id}/>,
      leave:   (chatData) => <ChatLeave chatData={chatData} key={chatData.id}/>,
      newHost: (chatData) => <ChatHost  chatData={chatData} key={chatData.id}/>,
      help:    (chatData) => <ChatHelp                      key={chatData.id}/>
    };

    const chatLog = this.props.chatLog.slice(-30).map((chatData, idx) => {
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
