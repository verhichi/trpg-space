import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToChatLog, showSidebar, hideSidebar, hideDiceBubble, showDiceBubble, showModal, showChat, showMap } from '../../../../redux/actions/action';
import socket from '../../../../socket/socketClient';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './bottom.scss';

// Component
import DiceBalloon from './diceBalloon/diceBalloon';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    id: state.id,
    roomId: state.roomId,
    userList: state.userList,
    charList: state.charList,
    centerMode: state.centerMode,
    displayDiceSetting: state.displayDiceSetting,
    displaySidebar: state.displaySidebar,
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    addToChatLog: content => dispatch(addToChatLog(content)),
    showSidebar: () => dispatch(showSidebar()),
    hideSidebar: () => dispatch(hideSidebar()),
    showDiceBubble: () => dispatch(showDiceBubble()),
    hideDiceBubble: () => dispatch(hideDiceBubble()),
    showModal: (modalType, modalProp) => dispatch(showModal(modalType, modalProp)),
    showChat: () => dispatch(showChat()),
    showMap: () => dispatch(showMap())
  };
};

class Bottom extends Component {
  constructor (props){
    super(props);
    this.diceRef = React.createRef();
    this.state = {
      chatText: '',
      inputFocus: false,
      checkedUsers: [],
      checkedAll: true,
      sendChatAs: 'player'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleOnFocusClick = this.handleOnFocusClick.bind(this);
    this.handleSendClick = this.handleSendClick.bind(this);
    this.handleDiceSettingClick = this.handleDiceSettingClick.bind(this);
    this.handleCenterModeClick = this.handleCenterModeClick.bind(this);
    this.handleSidebarClick = this.handleSidebarClick.bind(this);
    this.handleImageClick = this.handleImageClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleUserCheckChange = this.handleUserCheckChange.bind(this);
    this.handleAllCheckChange = this.handleAllCheckChange.bind(this);
    this.handleSendRadioChange = this.handleSendRadioChange.bind(this);
  }

  componentDidMount (){
    socket.on('chat', (content) => {
      this.props.addToChatLog(content);
    });

    socket.on('leave', (userId) => {
      this.setState({ checkedUsers: this.state.checkedUsers.filter(id => id !== userId) }, () => {
        if (this.state.checkedUsers.length === 0) this.setState({ checkedAll: true });
      });
    });
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

    const name = this.state.sendChatAs.length === 'player'
                   ? this.props.userList.find((user) => this.props.id === user.id).name
                   : this.props.charList.find((char) => this.state.sendChatAs === char.charId).general.name;

    const chatData = {
      type: 'text',
      text: this.state.chatText.trim(),
      private: !this.state.checkedAll,
      sendTo: this.state.checkedUsers,
      sendToNames: this.state.checkedUsers.map(id => this.props.userList.find(user => user.id === id).name).join(', '),
      name
    };

    this.props.addToChatLog({ ...chatData, self: true });
    socket.emit('chat', this.props.roomId, { ...chatData, self: false });
    this.setState({ chatText: '' });
  }

  handleKeyDown (e){
    const text = this.state.chatText.trim();
    if (e.which === 13 && !e.shiftKey){
      e.preventDefault();

      if (text.length !== 0){
        const name = this.state.sendChatAs === 'player'
                       ? this.props.userList.find((user) => this.props.id === user.id).name
                       : this.props.charList.find((char) => this.state.sendChatAs === char.charId).general.name;

        const chatData = {
          type: 'text',
          text: this.state.chatText.trim(),
          private: !this.state.checkedAll,
          sendTo: this.state.checkedUsers,
          sendToNames: this.state.checkedUsers.map(id => this.props.userList.find(user => user.id === id).name).join(', '),
          name
        };

        this.props.addToChatLog({ ...chatData, self: true });
        socket.emit('chat', this.props.roomId, { ...chatData, self: false });
        this.setState({ chatText: '' });
      }
    }
  }

  handleDiceSettingClick (e){
    if (this.props.displayDiceSetting){
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
    this.props.centerMode === 'chat'
      ? this.props.showMap()
      : this.props.showChat();
  }

  handleSidebarClick (e){
    this.props.displaySidebar
      ? this.props.hideSidebar()
      : this.props.showSidebar();
  }

  handleImageClick (e){
    e.preventDefault(e);
    document.removeEventListener('click', this.handleOnFocusClick);
    this.setState({inputFocus: false});

    this.props.showModal('uploadImg', {
      title: 'Upload an image',
      displayClose: true,
      type: 'chat'
    });
  }

  handleUserCheckChange (e, userId){
    this.state.checkedUsers.includes(userId)
      ? this.setState( { checkedUsers: this.state.checkedUsers.filter(id => id !== userId ) })
      : this.setState( { checkedUsers: [ ...this.state.checkedUsers, userId] });
  }

  handleAllCheckChange (e){
    this.setState({ checkedAll: !this.state.checkedAll });
  }

  handleSendRadioChange (e){
    this.setState({ sendChatAs: e.target.value });
  }

  render() {
    const isDisabled = this.state.chatText.trim().length === 0;

    const hideOnFocusClass = this.state.inputFocus ? 'd-none' : '';
    const showOnFocusClass = this.state.inputFocus ? '' : 'd-none';

    const userCheckList = this.props.userList.filter(user => user.id !== this.props.id).map(user => {
      return (<div className="private-chat-user one-line-ellipsis"><label><input className="p-1" type="checkbox" value={user.id} checked={this.state.checkedUsers.includes(user.id)} onChange={(e) => this.handleUserCheckChange(e, user.id)}/>{user.name}</label></div>);
    });

    const charRadioList = this.props.charList.filter(char => char.ownerId === this.props.id).map(char => {
      return (<div className="chat-sender-name"><label><input type="radio" name="sender" value={char.charId} checked={this.state.sendChatAs === char.charId} onChange={this.handleSendRadioChange}/>{char.general.name}</label></div>)
    });

    const userName = this.props.userList.find(user => user.id === this.props.id).name;

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
            {this.props.centerMode === 'chat'
              ? <FontAwesomeIcon icon="map-marked-alt"/>
              : <FontAwesomeIcon icon="comments"/>}
          </div>
          <textarea className="chat-inp f-grow-1 pr-2 pl-2" placeholder="Enter text here" value={this.state.chatText} onChange={this.handleChange} onFocus={this.handleFocus} onBlur={this.handleBlur} onKeyDown={this.handleKeyDown} ></textarea>
          <button className={`chat-bar-btn btn-hot cursor-pointer f-shrink-0 ${showOnFocusClass}`} disabled={isDisabled} onClick={this.handleSendClick}>
            <FontAwesomeIcon icon="paper-plane"/>
          </button>
          <div className="chat-bar-btn cursor-pointer align-center f-shrink-0">
            <FontAwesomeIcon icon="cog" mask="comment" transform="shrink-7 up-0.5"/>
            <div className="chat-opt-toolbar p-absolute d-flex f-dir-col">
              <div className="chat-opt-btn" onClick={this.handleImageClick}>
                <FontAwesomeIcon icon="paperclip"/>
              </div>
              <div className="chat-opt-btn">
                <span className="fa-layers fa-fw">
                  <FontAwesomeIcon icon="user" transform="shrink-3 left-3 down-3"/>
                  <FontAwesomeIcon icon="comment" transform="shrink-7 up-5 right-6"/>
                </span>
                <div className="chat-opt-sender p-2 p-absolute align-left">
                  <div>Send message as:</div>
                  <div><label><input type="radio" name="sender" value="player" checked={this.state.sendChatAs === 'player'} onChange={this.handleSendRadioChange}/>{userName}</label></div>
                  { charRadioList}
                </div>
              </div>
              <div className="chat-opt-btn">
                <FontAwesomeIcon icon="user-secret"/>
                <div className="chat-opt-private p-2 p-absolute align-left">
                  <div>Send message to:</div>
                  <div><label><input type="checkbox" checked={this.state.checkedAll} onChange={this.handleAllCheckChange}/>Everyone</label></div>
                  { this.state.checkedAll
                      ? null
                      : userCheckList}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// <div className={`chat-bar-btn cursor-pointer align-center f-shrink-0 ${showOnFocusClass}`} onClick={this.handleImageClick}>
//   <FontAwesomeIcon icon="paperclip"/>
// </div>
//
//             <span className="fa-layers fa-fw">
            //   <FontAwesomeIcon icon="cog" transform="shrink-3 up-8" color={'black'}/>
            //   <FontAwesomeIcon icon="comment" mask="cog"/>
            // </span>
            // <div className="private-chat-btn f-shrink-0 p-relative cursor-pointer align-center">
            //   <div className="private-chat-balloon p-2 p-absolute align-left">
            //     <div>Send message to:</div>
            //     <div><label><input type="checkbox" checked={this.state.checkedAll} onChange={this.handleAllCheckChange}/>Everyone</label></div>
            //     { this.state.checkedAll
            //         ? null
            //         : userCheckList}
            //   </div>
            //   <span className={this.state.checkedAll ? '' : 'd-none'}><FontAwesomeIcon icon="users"/></span>
            //   <span className={this.state.checkedAll ? 'd-none' : ''}><FontAwesomeIcon icon="user-secret"/></span>
            // </div>

export default connect(mapStateToProps, mapDispatchToProps)(Bottom);
