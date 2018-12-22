import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToChatLog } from '../../../../redux/actions/action';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './bottom.scss';

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    addToChatLog: content => dispatch(addToChatLog(content))
  };
};

class Bottom extends Component {
  constructor (props){
    super(props);
    this.state = { chatText: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange (e){
    this.setState({ chatText: e.target.value });
  }

  handleClick (e){
    e.preventDefault();
    this.props.addToChatLog({
      displayName: 'Daichi',
      time: '3:13',
      text: this.state.chatText
    });
    this.setState({ chatText: '' });
  }

  render() {
    return (
      <div className="room-bottom-cont">
        <div className="chat-cont">
          <div className="chat-bar-btn cursor-pointer">
            <FontAwesomeIcon icon="address-card"/>
          </div>
          <div className="chat-bar-btn btn-hot cursor-pointer">
            <FontAwesomeIcon icon="dice"/>
          </div>
          <textarea className="chat-inp" placeholder="Enter text here" value={this.state.chatText} onChange={this.handleChange}></textarea>
          <div className="chat-bar-btn btn-hot cursor-pointer" onClick={this.handleClick}>
            <FontAwesomeIcon icon="paper-plane"/>
            <span className="d-none-sm"> Send</span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Bottom);
