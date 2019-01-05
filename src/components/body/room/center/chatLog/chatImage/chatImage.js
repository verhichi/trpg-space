import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal } from '../../../../../../redux/actions/action';

// Style
import './chatImage.scss';

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return { showModal: (modalType, modalProp) => dispatch(showModal(modalType, modalProp)) };
};

class ChatImage extends Component {
  constructor (props){
    super(props);
    this.handleImageClick = this.handleImageClick.bind(this);
  }

  handleImageClick (e){
    this.props.showModal('image', {
      title: 'Image',
      displayClose: true,
      src: this.props.chatData.src
    });
  }

  render() {
    return(
      <div className="chat-log mb-3">
        <div className="chat-log-head">
          <span className="chat-log-user">{this.props.chatData.name}</span>
          <span className="chat-log-time">{this.props.chatData.time}</span>
        </div>
        <div className="chat-log-body p-2 ml-3">
          <img className="chat-img cursor-pointer" src={this.props.chatData.src} onClick={this.handleImageClick}/>
        </div>
      </div>
    );

  }
}

export default connect(null, mapDispatchToProps)(ChatImage);
