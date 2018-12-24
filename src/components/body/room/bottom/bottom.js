import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToChatLog, showCharList, hideCharList, toggleDiceBubble } from '../../../../redux/actions/action';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './bottom.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { displayCharList: state.displayCharList };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    addToChatLog: content => dispatch(addToChatLog(content)),
    showCharList: () => dispatch(showCharList()),
    hideCharList: () => dispatch(hideCharList()),
    toggleDiceBubble: () => dispatch(toggleDiceBubble())
  };
};

class Bottom extends Component {
  constructor (props){
    super(props);
    this.state = { chatText: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSendClick = this.handleSendClick.bind(this);
    this.handleDiceSettingClick = this.handleDiceSettingClick.bind(this);
    this.handleCharListClick = this.handleCharListClick.bind(this);
  }

  handleChange (e){
    this.setState({ chatText: e.target.value });
  }

  handleSendClick (e){
    e.preventDefault();
    this.props.addToChatLog({
      type: 'text',
      name: 'Daichi',
      time: '3:13',
      text: this.state.chatText
    });
    this.setState({ chatText: '' });
  }

  handleDiceSettingClick (e){
    e.preventDefault();
    this.props.toggleDiceBubble();
  }

  handleCharListClick (e){
    e.preventDefault();
    this.props.displayCharList
      ? this.props.hideCharList()
      : this.props.showCharList();
  }

  render() {
    const isDisabled = this.state.chatText.trim().length === 0;

    return (
      <div className="room-bottom-cont">
        <div className="chat-cont">
          <div className="chat-bar-btn cursor-pointer" onClick={this.handleCharListClick}>
            <FontAwesomeIcon icon="address-card"/>
          </div>
          <button className="chat-bar-btn btn-hot cursor-pointer" onClick={this.handleDiceSettingClick}>
            <FontAwesomeIcon icon="dice"/>
          </button>
          <textarea className="chat-inp" placeholder="Enter text here" value={this.state.chatText} onChange={this.handleChange}></textarea>
          <button className="chat-bar-btn btn-hot cursor-pointer" disabled={isDisabled} onClick={this.handleSendClick}>
            <FontAwesomeIcon icon="paper-plane"/>
            <span className="d-none-sm"> Send</span>
          </button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bottom);
