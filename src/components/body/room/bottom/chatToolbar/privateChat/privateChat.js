import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkSendMsgToAll, uncheckSendMsgToAll, addSendMsgUser, removeSendMsgUser } from '../../../../../redux/actions/action';

// Style
import './privateChat.scss';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    id:          state.id,
    userList:    state.userList,
    chatSetting: state.chatSetting
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    checkSendMsgToAll:   ()       => dispatch(checkSendMsgToAll()),
    uncheckSendMsgToAll: ()       => dispatch(uncheckSendMsgToAll()),
    addSendMsgUser:      (userId) => dispatch(addSendMsgUser(userId)),
    removeSendMsgUser:   (userId) => dispatch(removeSendMsgUser(userId)),
  };
};

class PrivateChat extends Component {
  constructor (props){
    super(props);

    this.handleUserCheckChange   = this.handleUserCheckChange.bind(this);
    this.handleAllCheckChange    = this.handleAllCheckChange.bind(this);
  }

  handleAllCheckChange (e){
    this.props.chatSetting.sendTo.sendToAll
      ? this.props.uncheckSendMsgToAll()
      : this.props.checkSendMsgToAll();
  }

  handleUserCheckChange (e){
    this.props.chatSetting.sendTo.sendToUsers.includes(e.target.value)
      ? this.props.removeSendMsgUser(e.target.value)
      : this.props.addSendMsgUser(e.target.value);
  }

  render (){

    const userCheckList = this.props.userList.filter(user => user.id !== this.props.id).map(user => {
      return (<div className="private-chat-user one-line-ellipsis"><label><input className="p-1" type="checkbox" value={user.id} checked={this.props.chatSetting.sendTo.sendToUsers.includes(user.id)} onChange={this.handleUserCheckChange}/>{user.name}</label></div>);
    });

    return(
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
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateChat);
