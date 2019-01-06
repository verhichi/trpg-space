import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToChatLog, showCharList, hideCharList, toggleDiceBubble, showEnemyList, hideEnemyList, showModal } from '../../../../redux/actions/action';
import socket from '../../../../socket/socketClient';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './bottom.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    id: state.id,
    roomId: state.roomId,
    userList: state.userList,
    displayCharList: state.displayCharList,
    displayEnemyList: state.displayEnemyList
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    addToChatLog: content => dispatch(addToChatLog(content)),
    showCharList: () => dispatch(showCharList()),
    hideCharList: () => dispatch(hideCharList()),
    showEnemyList: () => dispatch(showEnemyList()),
    hideEnemyList: () => dispatch(hideEnemyList()),
    toggleDiceBubble: () => dispatch(toggleDiceBubble()),
    showModal: (modalType, modalProp) => dispatch(showModal(modalType, modalProp))
  };
};

class Bottom extends Component {
  constructor (props){
    super(props);
    this.state = {
      chatText: '',
      inputFocus: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleOnFocusClick = this.handleOnFocusClick.bind(this);
    this.handleSendClick = this.handleSendClick.bind(this);
    this.handleDiceSettingClick = this.handleDiceSettingClick.bind(this);
    this.handleCharListClick = this.handleCharListClick.bind(this);
    this.handleEnemyListClick = this.handleEnemyListClick.bind(this);
    this.handleImageClick = this.handleImageClick.bind(this);
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
    document.removeEventListener('click', this.handleOnFocusClick);
    this.setState({inputFocus: false});

    const name = this.props.userList.find((user) => this.props.id === user.id).name;

    const now = new Date();
    const hour = now.getHours().toString().padStart(2, '0');
    const min = now.getMinutes().toString().padStart(2, '0');
    const time = `${hour}:${min}`;

    this.props.addToChatLog({
      type: 'text',
      text: this.state.chatText.trim(),
      time,
      name,
    });

    socket.emit('chat', this.props.roomId, {
      type: 'text',
      text: this.state.chatText.trim(),
      time,
      name,
    });

    this.setState({ chatText: '' });
  }

  handleDiceSettingClick (e){
    e.preventDefault();
    this.props.toggleDiceBubble();
  }

  handleCharListClick (e){
    e.preventDefault();
    this.props.displayCharList
      ? this.props.hideCharList()
      : this.props.showCharList();
  }

  handleEnemyListClick (e){
    e.preventDefault();
    this.props.displayEnemyList
    ? this.props.hideEnemyList()
    : this.props.showEnemyList();
  }

  handleImageClick (e){
    e.preventDefault(e);
    document.removeEventListener('click', this.handleOnFocusClick);
    this.setState({inputFocus: false});

    this.props.showModal('uploadImg', {
      title: 'Upload an image',
      displayClose: true
    });
  }

  render() {
    const isDisabled = this.state.chatText.trim().length === 0;

    const hideOnFocusClass = this.state.inputFocus ? 'd-none' : '';
    const showOnFocusClass = this.state.inputFocus ? '' : 'd-none';

    return (
      <div className="room-bottom-cont" ref={node => this.node = node} onClick={this.handleOnFocusClick}>
        <div className="chat-cont">
          <div className={`chat-bar-btn cursor-pointer align-center ${hideOnFocusClass}`} onClick={this.handleCharListClick}>
            <FontAwesomeIcon icon="address-card"/>
          </div>
          <div className={`chat-bar-btn cursor-pointer align-center ${hideOnFocusClass}`} onClick={this.handleEnemyListClick}>
            <FontAwesomeIcon icon="dragon"/>
          </div>
          <div className={`chat-bar-btn cursor-pointer align-center ${hideOnFocusClass}`} onClick={this.handleDiceSettingClick}>
            <FontAwesomeIcon icon="dice"/>
          </div>
          <div className={`chat-bar-btn cursor-pointer align-center ${hideOnFocusClass}`} onClick={this.handleDiceSettingClick}>
            <FontAwesomeIcon icon="map-marked-alt"/>
          </div>
          <textarea className="chat-inp" placeholder="Enter text here" value={this.state.chatText} onChange={this.handleChange} onFocus={this.handleFocus} onBlur={this.handleBlur}></textarea>
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
