import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkSendAsUser, uncheckSendAsUser, editSendAs } from '../../../../../../redux/actions/chatSetting';
import { sendMsgAsLabel, userLabel, charLabel } from './sendMsgAs.i18n';

// Style
import './sendMsgAs.scss';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    global:      state.global,
    userList:    state.userList,
    charList:    state.charList,
    chatSetting: state.chatSetting
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    checkSendAsUser:   ()       => dispatch(checkSendAsUser()),
    uncheckSendAsUser: ()       => dispatch(uncheckSendAsUser()),
    editSendAs:        (userId) => dispatch(editSendAs(userId))
  };
};

class SendMsgAs extends Component {
  constructor (props){
    super(props);

    this.handleSendAsUserRadio = this.handleSendAsUserRadio.bind(this);
    this.handleSendRadioChange = this.handleSendRadioChange.bind(this);
  }

  handleSendAsUserRadio (e){
    this.props.chatSetting.sendAs.sendAsUser
      ? this.props.uncheckSendAsUser()
      : this.props.checkSendAsUser();

    this.props.editSendAs('');
  }

  handleSendRadioChange (e){
    this.props.uncheckSendAsUser();
    this.props.editSendAs(e.target.value);
  }

  render (){
    const userName = this.props.userList.find(user => user.id === this.props.global.id).name;

    const charRadioList = this.props.charList.filter(char => char.ownerId === this.props.global.id).map(char => {
      return (<div className="chat-sender-name one-line-ellipsis"><label><input type="radio" name="sender" value={char.charId} checked={this.props.chatSetting.sendAs.sendAsCharacter === char.charId} onChange={this.handleSendRadioChange}/>{char.general.name}</label></div>)
    });

    return(
      <div className="chat-opt-btn">
        <span className="fa-layers fa-fw">
          <FontAwesomeIcon icon="user" transform="shrink-3 left-3 down-3"/>
          <FontAwesomeIcon icon="comment" transform="shrink-7 up-5 right-6"/>
        </span>
        <div className="chat-opt-sender p-2 p-absolute align-left">
          <div>{sendMsgAsLabel[this.props.global.lang]}</div>
          <div className="chat-opt-subtitle pt-2 pb-1 font-size-md text-dec-underline">{userLabel[this.props.global.lang]}</div>
          <div><label><input type="radio" name="sender" checked={this.props.chatSetting.sendAs.sendAsUser} onChange={this.handleSendAsUserRadio}/>{userName}</label></div>
          { charRadioList.length !== 0 && (<div className="chat-opt-subtitle pt-2 pb-1 font-size-md text-dec-underline">{charLabel[this.props.global.lang]}</div>) }
          { charRadioList}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendMsgAs);
