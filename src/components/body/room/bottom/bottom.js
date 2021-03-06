import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CHAT_TYPE_TEXT, CHAT_TYPE_ROLL, CENTER_MODE_CHAT } from '../../../../constants/constants';
import { addChat } from '../../../../redux/actions/chatLog';
import { showSidebar, hideSidebar, hideDiceBubble, showDiceBubble, showChat, showMap } from '../../../../redux/actions/display'
import { parseMessageType } from '../../../../utils/parseMessage';
import socket from '../../../../socket/socketClient';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './bottom.scss';

// Component
import DiceBalloon from './diceBalloon/diceBalloon';
import ChatToolbar from './chatToolbar/chatToolbar';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    charList:       state.charList,
    chatSetting:    state.chatSetting,
    displaySetting: state.displaySetting,
    global:         state.global,
    userList:       state.userList,
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    addChat:        (content) => dispatch(addChat(content)),
    showSidebar:    ()        => dispatch(showSidebar()),
    hideSidebar:    ()        => dispatch(hideSidebar()),
    showDiceBubble: ()        => dispatch(showDiceBubble()),
    hideDiceBubble: ()        => dispatch(hideDiceBubble()),
    showChat:       ()        => dispatch(showChat()),
    showMap:        ()        => dispatch(showMap())
  };
};

class Bottom extends Component {
  constructor (props){
    super(props);
    this.diceRef = React.createRef();
    this.state = {
      chatText:   '',
      inputFocus: false,
    };

    this.handleChange           = this.handleChange.bind(this);
    this.handleFocus            = this.handleFocus.bind(this);
    this.handleOnFocusClick     = this.handleOnFocusClick.bind(this);
    this.handleSendClick        = this.handleSendClick.bind(this);
    this.handleDiceSettingClick = this.handleDiceSettingClick.bind(this);
    this.handleCenterModeClick  = this.handleCenterModeClick.bind(this);
    this.handleSidebarClick     = this.handleSidebarClick.bind(this);
    this.handleOutsideClick     = this.handleOutsideClick.bind(this);
    this.handleKeyDown          = this.handleKeyDown.bind(this);
    this.sendMessage            = this.sendMessage.bind(this);
  }

  handleFocus (e){
    document.addEventListener('click', this.handleOnFocusClick);
    this.setState({inputFocus: true});
  }

  handleOnFocusClick (e){
    if (this.node.contains(e.target)) return;
    document.removeEventListener('click', this.handleOnFocusClick);
    this.setState({inputFocus: false});
  }

  handleChange (e){
    this.setState({ chatText: e.target.value });
  }

  handleSendClick (e){
    e.preventDefault();
    document.removeEventListener('click', this.handleOnFocusClick);
    this.setState({inputFocus: false});
    const text = this.state.chatText.trim();
    this.sendMessage(text);
  }

  handleKeyDown (e){
    const text = this.state.chatText.trim();
    if (e.which === 13 && !e.shiftKey){
      e.preventDefault();
      if (text.length !== 0){
        this.sendMessage(text);
      }
    }
  }

  sendMessage (text){
    const messageParseResult = parseMessageType(text);

    if (messageParseResult.type === CHAT_TYPE_TEXT){
      const name = this.props.chatSetting.sendAs.sendAsUser
                     ? this.props.userList.find(user => this.props.global.id === user.id).name
                     : this.props.charList.find(char => this.props.chatSetting.sendAs.sendAsCharacter === char.charId).general.name;

      const chatData = {
        type:        CHAT_TYPE_TEXT,
        text:        text,
        private:     !this.props.chatSetting.sendTo.sendToAll,
        sendTo:      this.props.chatSetting.sendTo.sendToUsers,
        sendToNames: this.props.chatSetting.sendTo.sendToUsers.map(id => this.props.userList.find(user => user.id === id).name).join(', '),
        name
      };

      this.props.addChat({ ...chatData, self: true });
      socket.emit('chat', this.props.global.roomId, { ...chatData, self: false });
    } else if (messageParseResult.type === CHAT_TYPE_ROLL){
      const rollData = {
        type: CHAT_TYPE_ROLL,
        name: this.props.userList.find(user => this.props.global.id === user.id).name,
        ...messageParseResult
      };
      this.props.addChat({ ...rollData, self: true });

      if (!rollData.private){
        socket.emit('chat', this.props.global.roomId, { ...rollData, self: false});
      }
    }

    this.setState({ chatText: '' });
  }


  handleDiceSettingClick (e){
    if (this.props.displaySetting.displayDiceSetting){
      window.removeEventListener('click', this.handleOutsideClick, false);
      this.props.hideDiceBubble();
    } else {
      window.addEventListener('click', this.handleOutsideClick, false);
      this.props.showDiceBubble();
    }
  }


  handleOutsideClick (e){
    if (this.diceRef.current.contains(e.target)) return;
    window.removeEventListener('click', this.handleOutsideClick, false);
    this.props.hideDiceBubble();
  }

  handleCenterModeClick (e){
    this.props.displaySetting.centerMode === CENTER_MODE_CHAT
      ? this.props.showMap()
      : this.props.showChat();
  }

  handleSidebarClick (e){
    this.props.displaySetting.displaySidebar
      ? this.props.hideSidebar()
      : this.props.showSidebar();
  }

  render() {
    const isDisabled = this.state.chatText.trim().length === 0;

    const hideOnFocusClass = this.state.inputFocus ? 'd-none' : '';
    const showOnFocusClass = this.state.inputFocus ? '' : 'd-none';

    return (
      <div className="room-bottom-cont" ref={node => this.node = node} onClick={this.handleOnFocusClick}>
        <div className="chat-cont">
          <div className={`chat-bar-btn cursor-pointer align-center ${hideOnFocusClass}`} onClick={this.handleSidebarClick}>
            <FontAwesomeIcon icon="columns"/>
          </div>
          <div className="p-relative" ref={this.diceRef}>
            <DiceBalloon />
            <div className={`chat-bar-btn cursor-pointer align-center ${hideOnFocusClass}`} onClick={this.handleDiceSettingClick}>
              <FontAwesomeIcon icon="dice"/>
            </div>
          </div>
          <div className={`chat-bar-btn cursor-pointer align-center ${hideOnFocusClass}`} onClick={this.handleCenterModeClick}>
            {this.props.displaySetting.centerMode === CENTER_MODE_CHAT
              ? <FontAwesomeIcon icon="map-marked-alt"/>
              : <FontAwesomeIcon icon="comments"/>}
          </div>
          <textarea className="chat-inp f-grow-1 pr-2 pl-2" placeholder="Enter text here" value={this.state.chatText} onChange={this.handleChange} onFocus={this.handleFocus} onBlur={this.handleBlur} onKeyDown={this.handleKeyDown} ></textarea>
          <button className={`chat-bar-btn btn-hot cursor-pointer f-shrink-0 ${showOnFocusClass}`} disabled={isDisabled} onClick={this.handleSendClick}>
            <FontAwesomeIcon icon="paper-plane"/>
          </button>
          <div className="chat-bar-btn cursor-pointer align-center f-shrink-0">
            <FontAwesomeIcon icon="cog" mask="comment" transform="shrink-7 up-0.5"/>
            <ChatToolbar/>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bottom);
