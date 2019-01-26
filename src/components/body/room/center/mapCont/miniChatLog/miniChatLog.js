import React, { Component } from 'react';
import uuid from 'uuid';

// Style
import './miniChatLog.scss';

// Components
import ChatHost from './chatHost/chatHost';
import ChatImage from './chatImage/chatImage';
import ChatJoin from './chatJoin/chatJoin';
import ChatLeave from './chatLeave/chatLeave';
import ChatRoll from './chatRoll/chatRoll';
import ChatText from './chatText/chatText';

class MiniChatLog extends Component {
  render() {
    const contKey = uuid.v4();

    const miniChatType = {
      text:  (chatData) => <ChatText  chatData={chatData} key={chatData.id}/>,
      roll:  (chatData) => <ChatRoll  chatData={chatData} key={chatData.id}/>,
      image: (chatData) => <ChatImage chatData={chatData} key={chatData.id}/>,
      join:  (chatData) => <ChatJoin  chatData={chatData} key={chatData.id}/>,
      leave: (chatData) => <ChatLeave chatData={chatData} key={chatData.id}/>,
      host:  (chatData) => <ChatHost  chatData={chatData} key={chatData.id}/>,
    };

    const miniChatLog = this.props.miniChatLog.map(chatData => {
      if (chatData.type === 'help'){
        return null;
      } else {
        return miniChatType[chatData.type](chatData);
      }
    });

    return (
      <div className="mini-chat-cont font-weight-bold p-1 p-absolute cursor-pointer" key={contKey}>
        {miniChatLog}
      </div>
    );
  }
}

export default MiniChatLog;
