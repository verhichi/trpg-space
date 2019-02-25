import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CHAT_TYPE_HELP, CHAT_TYPE_TEXT, CHAT_TYPE_ROLL, CHAT_TYPE_IMAGE, CHAT_TYPE_JOIN, CHAT_TYPE_LEAVE, CHAT_TYPE_HOST } from '../../../../../../constants/constants';

// Style
import './miniChatLog.scss';

// Components
import ChatHost  from './chatHost/chatHost';
import ChatImage from './chatImage/chatImage';
import ChatJoin  from './chatJoin/chatJoin';
import ChatLeave from './chatLeave/chatLeave';
import ChatRoll  from './chatRoll/chatRoll';
import ChatText  from './chatText/chatText';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { chatLog: state.chatLog };
};

class MiniChatLog extends Component {
  render() {
    const miniChatType = {
      [CHAT_TYPE_HELP]:  (chatData) => null,
      [CHAT_TYPE_TEXT]:  (chatData) => <ChatText  chatData={chatData} key={chatData.id}/>,
      [CHAT_TYPE_ROLL]:  (chatData) => <ChatRoll  chatData={chatData} key={chatData.id}/>,
      [CHAT_TYPE_IMAGE]: (chatData) => <ChatImage chatData={chatData} key={chatData.id}/>,
      [CHAT_TYPE_JOIN]:  (chatData) => <ChatJoin  chatData={chatData} key={chatData.id}/>,
      [CHAT_TYPE_LEAVE]: (chatData) => <ChatLeave chatData={chatData} key={chatData.id}/>,
      [CHAT_TYPE_HOST]:  (chatData) => <ChatHost  chatData={chatData} key={chatData.id}/>,
    };

    const miniChatList = this.props.chatLog.slice(-3);

    const contKey = miniChatList.reduce((acc, chat) => {
      return acc + chat.id;
    }, '');

    const miniChatLog = miniChatList.map(chatData => {
      return miniChatType[chatData.type](chatData);
    });

    return (
      <div className="mini-chat-cont font-weight-bold p-1 p-absolute" key={contKey}>
        {miniChatLog}
      </div>
    );
  }
}

export default connect(mapStateToProps)(MiniChatLog);
