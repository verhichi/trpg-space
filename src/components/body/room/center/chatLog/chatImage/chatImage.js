import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MODAL_TYPE_IMAGE } from '../../../../../../constants/constants';
import { showModal } from '../../../../../../redux/actions/modal';

// Style
import './chatImage.scss';

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return { showModal: (modalType, modalProp) => dispatch(showModal(modalType, modalProp)) };
};

class ChatImage extends Component {
  constructor (props){
    super(props);
    this.state = {
      height: 0,
      width:  0
    };

    this.handleImageClick = this.handleImageClick.bind(this);
  }

  componentWillMount (){
    const isImgWide = this.props.chatData.width - this.props.chatData.height >= 0;

    if (isImgWide){
      this.setState({
        height: Math.floor(200 * this.props.chatData.height/this.props.chatData.width),
        width:  200
      });
    } else {
      this.setState({
        height: 300,
        width:  Math.floor(300 * this.props.chatData.width/this.props.chatData.height)
      });
    }
  }

  handleImageClick (e){
    this.props.showModal(MODAL_TYPE_IMAGE, {
      title:       'Image',
      displayClose: true,
      src:          this.props.chatData.src
    });
  }

  render() {
    const selfClass = this.props.chatData.self ? 'self-chat' : 'other-chat';

    return(
      <div className={`chat-log mb-3 ${selfClass}`}>
        <div className="chat-log-head">
          <span className="font-size-lg font-weight-bold pr-2">{this.props.chatData.name}</span>
          <span className="pr-2">{this.props.chatData.time}</span>
        </div>
        <div className="chat-log-body p-2 ml-3">
          <img className="chat-img cursor-pointer" src={this.props.chatData.src} onClick={this.handleImageClick} style={this.state}/>
        </div>
      </div>
    );

  }
}

export default connect(null, mapDispatchToProps)(ChatImage);
