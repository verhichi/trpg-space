import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
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
      inputFocus: false
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
  }

  componentDidMount (){
    socket.on('chat', (content) => {
      this.props.addToChatLog(content);
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
    const name = this.props.userList.find((user) => this.props.id === user.id).name;
    const chatData = {
      type: 'text',
      text: this.state.chatText.trim(),
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
        const name = this.props.userList.find((user) => this.props.id === user.id).name;
        const chatData = {
          type: 'text',
          text: this.state.chatText.trim(),
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
            {this.props.centerMode === 'chat'
              ? <FontAwesomeIcon icon="map-marked-alt"/>
              : <FontAwesomeIcon icon="comments"/>}
          </div>
          <textarea className="chat-inp" placeholder="Enter text here" value={this.state.chatText} onChange={this.handleChange} onFocus={this.handleFocus} onBlur={this.handleBlur} onKeyDown={this.handleKeyDown} ></textarea>
          <button className="chat-bar-btn btn-hot cursor-pointer" disabled={isDisabled} onClick={this.handleSendClick}>
            <FontAwesomeIcon icon="paper-plane"/>
          </button>
          <div className={`chat-bar-btn cursor-pointer align-center ${showOnFocusClass}`} onClick={this.handleImageClick}>
            <FontAwesomeIcon icon="paperclip"/>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bottom);
