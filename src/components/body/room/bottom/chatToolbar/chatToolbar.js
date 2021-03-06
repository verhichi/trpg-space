import React, { Component } from 'react';

// Style
import './chatToolbar.scss';

// Component
import PrivateChat from './privateChat/privateChat';
import RemoveChat  from './removeChat/removeChat';
import SendImage from './sendImage/sendImage';
import SendMsgAs from './sendMsgAs/sendMsgAs';

class ChatToolbar extends Component {

  render (){
    return(
      <div className="chat-opt-toolbar p-absolute d-flex f-dir-col">
        <RemoveChat/>
        <SendImage/>
        <SendMsgAs/>
        <PrivateChat/>
      </div>
    );
  }
}

export default ChatToolbar;
