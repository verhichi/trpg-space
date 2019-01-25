import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkSendAsPlayer, uncheckSendAsPlayer, editSendAs } from '../../../../../../redux/actions/action';

// Style
import './sendMsgAs.scss';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    id:          state.id,
    userList:    state.userList,
    charList:    state.charList,
    chatSetting: state.chatSetting
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    checkSendAsPlayer:   ()       => dispatch(checkSendAsPlayer()),
    uncheckSendAsPlayer: ()       => dispatch(uncheckSendAsPlayer()),
    editSendAs:          (userId) => dispatch(editSendAs(userId))
  };
};

class SendMsgAs extends Component {
  constructor (props){
    super(props);

    this.handleSendAsPlayerRadio = this.handleSendAsPlayerRadio.bind(this);
    this.handleSendRadioChange   = this.handleSendRadioChange.bind(this);
  }

  handleSendAsPlayerRadio (e){
    this.props.chatSetting.sendAs.sendAsPlayer
      ? this.props.uncheckSendAsPlayer()
      : this.props.checkSendAsPlayer();

    this.props.editSendAs('');
  }

  handleSendRadioChange (e){
    this.props.uncheckSendAsPlayer();
    this.props.editSendAs(e.target.value);
  }

  render (){

    const userName = this.props.userList.find(user => user.id === this.props.id).name;

    const charRadioList = this.props.charList.filter(char => char.ownerId === this.props.id).map(char => {
      return (<div className="chat-sender-name one-line-ellipsis"><label><input type="radio" name="sender" value={char.charId} checked={this.props.chatSetting.sendAs.sendAsCharacter === char.charId} onChange={this.handleSendRadioChange}/>{char.general.name}</label></div>)
    });

    return(
      <div className="chat-opt-btn">
        <span className="fa-layers fa-fw">
          <FontAwesomeIcon icon="user" transform="shrink-3 left-3 down-3"/>
          <FontAwesomeIcon icon="comment" transform="shrink-7 up-5 right-6"/>
        </span>
        <div className="chat-opt-sender p-2 p-absolute align-left">
          <div>Send message as:</div>
          <div className="chat-opt-subtitle pt-2 pb-1 font-size-md text-dec-underline">User</div>
          <div><label><input type="radio" name="sender" checked={this.props.chatSetting.sendAs.sendAsPlayer} onChange={this.handleSendAsPlayerRadio}/>{userName}</label></div>
          { charRadioList.length !== 0 && (<div className="chat-opt-subtitle pt-2 pb-1 font-size-md text-dec-underline">Character:</div>) }
          { charRadioList}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendMsgAs);
