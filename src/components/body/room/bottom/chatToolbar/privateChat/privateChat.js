import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkSendMsgToAll, uncheckSendMsgToAll, addSendMsgUser, removeSendMsgUser } from '../../../../../../redux/actions/chatSetting';
import { sendMsgToLabel, everyoneLabel } from './privateChat.i18n';

// Style
import './privateChat.scss';

// Component
import AppCheckbox from '../../../../../partials/appCheckbox/appCheckbox'

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    global:      state.global,
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

    this.handleUserCheckChange = this.handleUserCheckChange.bind(this);
    this.handleAllCheckChange  = this.handleAllCheckChange.bind(this);
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

    const userCheckList = this.props.userList.filter(user => user.id !== this.props.global.id).map(user => {
      return (<AppCheckbox key={user.id} value={user.id} checked={this.props.chatSetting.sendTo.sendToUsers.includes(user.id)} handleChange={this.handleUserCheckChange} label={user.name} id={user.id}/>);
    });

    return(
      <div className="chat-opt-btn">
        <FontAwesomeIcon icon="user-secret"/>
        <div className="chat-opt-private p-2 p-absolute align-left cursor-default">
          <div>{sendMsgToLabel[this.props.global.lang]}</div>
          <AppCheckbox checked={this.props.chatSetting.sendTo.sendToAll} handleChange={this.handleAllCheckChange} label={everyoneLabel[this.props.global.lang]} id={'private_everyone'}/>
          { !this.props.chatSetting.sendTo.sendToAll && userCheckList}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateChat);
