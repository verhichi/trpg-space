import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal, checkSendMsgToAll, uncheckSendMsgToAll } from '../../../../../redux/actions/action';

// Style
import './chatToolbar.scss';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    id:          state.id,
    roomId:      state.roomId,
    userList:    state.userList,
    charList:    state.charList,
    chatSetting: state.chatSetting
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    showModal: (modalType, modalProp) => dispatch(showModal(modalType, modalProp)),
    checkSendMsgToAll: () => dispatch(checkSendMsgToAll()),
    uncheckSendMsgToAll: () => dispatch(uncheckSendMsgToAll())
  };
};

class ChatToolbar extends Component {
  constructor (props){
    super(props);

    this.handleUserCheckChange = this.handleUserCheckChange.bind(this);
    this.handleAllCheckChange = this.handleAllCheckChange.bind(this);
    this.handleSendRadioChange = this.handleSendRadioChange.bind(this);
  }

  handleImageClick (e){
    e.preventDefault(e);

    this.props.showModal('uploadImg', {
      title: 'Upload an image',
      displayClose: true,
      type: 'chat'
    });
  }

  handleAllCheckChange (e){
    this.props.chatSetting.sendTo.sendToAll
      ? this.props.checkSendMsgToAll()
      : this.props.uncheckSendMsgToAll();
  }

  handleUserCheckChange (e, userId){
    this.state.checkedUsers.includes(userId)
      ? this.setState( { checkedUsers: this.state.checkedUsers.filter(id => id !== userId ) })
      : this.setState( { checkedUsers: [ ...this.state.checkedUsers, userId] });
  }

  handleSendRadioChange (e){
    this.setState({ sendChatAs: e.target.value });
  }

  render (){

    const userCheckList = this.props.userList.filter(user => user.id !== this.props.id).map(user => {
      return (<div className="private-chat-user one-line-ellipsis"><label><input className="p-1" type="checkbox" value={user.id} checked={this.state.checkedUsers.includes(user.id)} onChange={(e) => this.handleUserCheckChange(e, user.id)}/>{user.name}</label></div>);
    });

    const charRadioList = this.props.charList.filter(char => char.ownerId === this.props.id).map(char => {
      return (<div className="chat-sender-name"><label><input type="radio" name="sender" value={char.charId} checked={this.state.sendChatAs === char.charId} onChange={this.handleSendRadioChange}/>{char.general.name}</label></div>)
    });

    return(
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
            <div><label><input type="checkbox" checked={this.props.chatSetting.sendTo.sendToAll} onChange={this.handleAllCheckChange}/>Everyone</label></div>
            { this.props.chatSetting.sendTo.sendToAll
                ? null
                : userCheckList}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatToolbar);
