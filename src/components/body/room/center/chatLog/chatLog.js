import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CHAT_TYPE_HELP, CHAT_TYPE_TEXT, CHAT_TYPE_ROLL, CHAT_TYPE_IMAGE, CHAT_TYPE_JOIN, CHAT_TYPE_LEAVE, CHAT_TYPE_HOST } from '../../../../../constants/constants';
import { showModal } from '../../../../../redux/actions/modal';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './chatLog.scss';

// Components
import ChatHelp  from './chatHelp/chatHelp';
import ChatHost  from './chatHost/chatHost';
import ChatImage from './chatImage/chatImage';
import ChatJoin  from './chatJoin/chatJoin';
import ChatLeave from './chatLeave/chatLeave';
import ChatRoll  from './chatRoll/chatRoll';
import ChatText  from './chatText/chatText';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    global:  state.global,
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
    this.state = {
      displayLastNChat: 30,
      isScrolledDown: true
    };

    this.handleChatLogScroll   = this.handleChatLogScroll.bind(this);
    this.handleScrollDownClick = this.handleScrollDownClick.bind(this);
  }

  componentDidMount (){
    this.myRef.current.scrollTop = Math.floor(this.myRef.current.scrollHeight);
  }

  componentDidUpdate (){
    if (this.state.isScrolledDown){
      this.myRef.current.scrollTop = Math.floor(this.myRef.current.scrollHeight);
    }
  }

  handleScrollDownClick (e){
    this.myRef.current.scrollTop = Math.floor(this.myRef.current.scrollHeight);
  }

  handleChatLogScroll (e){
    const scrollTop    = Math.floor(this.myRef.current.scrollTop);
    const offsetHeight = Math.floor(this.myRef.current.offsetHeight);
    const scrollHeight = Math.floor(this.myRef.current.scrollHeight);

    if (scrollTop === 0 && this.props.chatLog.length > this.state.displayLastNChat){
      this.setState({ displayLastNChat: this.state.displayLastNChat + 30 });
    }
    this.setState({ isScrolledDown: scrollHeight === scrollTop  +  offsetHeight});
  }

  render() {

    const toggleClass   = this.props.global.isMobile ? '' : 'hide-scroll';
    const toggleDisplay = this.state.isScrolledDown ? 'd-none' : '';

    // Choose component based on chat type
    const chatType = {
      [CHAT_TYPE_HELP]:  (chatData) => <ChatHelp                      key={chatData.id}/>,
      [CHAT_TYPE_TEXT]:  (chatData) => <ChatText  chatData={chatData} key={chatData.id}/>,
      [CHAT_TYPE_ROLL]:  (chatData) => <ChatRoll  chatData={chatData} key={chatData.id}/>,
      [CHAT_TYPE_IMAGE]: (chatData) => <ChatImage chatData={chatData} key={chatData.id}/>,
      [CHAT_TYPE_JOIN]:  (chatData) => <ChatJoin  chatData={chatData} key={chatData.id}/>,
      [CHAT_TYPE_LEAVE]: (chatData) => <ChatLeave chatData={chatData} key={chatData.id}/>,
      [CHAT_TYPE_HOST]:  (chatData) => <ChatHost  chatData={chatData} key={chatData.id}/>,
    };

    const chatLog = this.props.chatLog.slice(-1 * this.state.displayLastNChat).map((chatData, idx) => {
      return chatType[chatData.type](chatData, idx);
    });

    return (
      <div className="chat-log-cont f-grow-1 p-relative">
        <div className={`chat-log-scroll-down p-absolute align-center cursor-pointer ${toggleDisplay}`} onClick={this.handleScrollDownClick}><FontAwesomeIcon icon="arrow-down"/></div>
        <div className={`chat-log-wrap d-flex f-dir-col h-100 ${toggleClass}`} ref={this.myRef} onScroll={this.handleChatLogScroll}>
          {chatLog}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatLog);
