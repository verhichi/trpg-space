import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MODAL_TYPE_CONFIRM } from '../../../../../../constants/constants';
import { showModal, hideModal } from '../../../../../../redux/actions/modal';
import { removeAllChat } from '../../../../../../redux/actions/chatLog';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    showModal:     (modalType, modalProp) => dispatch(showModal(modalType, modalProp)),
    hideModal:     ()                     => dispatch(hideModal()),
    removeAllChat: ()                     => dispatch(removeAllChat())
  };
};

class RemoveChat extends Component {
  constructor (props){
    super(props);

    this.handleRemoveChatClick = this.handleRemoveChatClick.bind(this);
  }

  handleRemoveChatClick (e){
    e.preventDefault(e);

    this.props.showModal(MODAL_TYPE_CONFIRM, {
      title:        '',
      displayClose:  false,
      confirmText:  'Are you sure you want to clear your chat history?',
      accept:       [
        this.props.removeAllChat.bind(this),
        this.props.hideModal
      ],
      decline:      this.props.hideModal
    });
  }

  render (){
    return(
      <div className="chat-opt-btn" onClick={this.handleRemoveChatClick}>
        <FontAwesomeIcon icon="comment-slash"/>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(RemoveChat);
