import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MODAL_TYPE_UPLOAD_IMG } from '../../../../../../constants/constants';
import { showModal } from '../../../../../../redux/actions/action';

// Style
import './sendImage.scss';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return { showModal: (modalType, modalProp) => dispatch(showModal(modalType, modalProp)) };
};

class ChatToolbar extends Component {
  constructor (props){
    super(props);

    this.handleImageClick = this.handleImageClick.bind(this);
  }

  handleImageClick (e){
    e.preventDefault(e);

    this.props.showModal(MODAL_TYPE_UPLOAD_IMG, {
      title:        'Upload an image',
      displayClose:  true,
      type:         'chat'
    });
  }

  render (){
    return(
      <div className="chat-opt-btn" onClick={this.handleImageClick}>
        <FontAwesomeIcon icon="paperclip"/>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(ChatToolbar);
