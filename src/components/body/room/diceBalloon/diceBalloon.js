import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToChatLog, toggleDiceBubble } from '../../../../redux/actions/action';
import socket from '../../../../socket/socketClient';
import { getDiceRollResult } from './roll';

// Style
import './diceBalloon.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    displayDiceSetting: state.displayDiceSetting,
    roomId: state.roomId
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    addToChatLog: content => dispatch(addToChatLog(content)),
    toggleDiceBubble: () => dispatch(toggleDiceBubble())
  };
};

class DiceBalloon extends Component {
  constructor (props){
    super(props);
    this.state = {
      diceNumber: 2,
      diceType: 6,
      symbol: '+',
      modifier: 0,
      private: false
    };

    this.handleDiceNumberChange = this.handleDiceNumberChange.bind(this);
    this.handleDiceTypeChange = this.handleDiceTypeChange.bind(this);
    this.handleSymbolChange = this.handleSymbolChange.bind(this);
    this.handleModifierChange = this.handleModifierChange.bind(this);
    this.handlePrivateChange = this.handlePrivateChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleDiceNumberChange (e){
    this.setState({ diceNumber: e.target.value });
  }

  handleDiceTypeChange (e){
    this.setState({ diceType : e.target.value });
  }

  handleSymbolChange (e){
    this.setState({ symbol: e.target.value });
  }

  handleModifierChange (e){
    this.setState({ modifier: e.target.value });
  }

  handlePrivateChange (e){
    this.setState({ private: !this.state.private });
  }

  handleButtonClick (e){

    const result = getDiceRollResult(this.state);

    if (this.state.private){
      this.props.addToChatLog({
        type: 'roll',
        name: 'Daichi',
        time: '3:13',
        private: this.state.private,
        ...result
      });
    } else {
      socket.emit('chat', this.props.roomId, {
        type: 'roll',
        name: 'Daichi',
        time: '3:13',
        private: this.state.private,
        ...result
      });
    }

    this.props.toggleDiceBubble();
  }

  render (){
    const toggleClass = this.props.displayDiceSetting ? 'is-active' : '';

    return (
      <div className={`dice-help-balloon font-weight-bold ${toggleClass}`}>
        <div className="dice-setting">
          Dice:
          <div className="sel-cont">
            <select name="dice-number" value={this.state.diceNumber} onChange={this.handleDiceNumberChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          d
          <div className="sel-cont">
            <select name="dice-type" value={this.state.diceType} onChange={this.handleDiceTypeChange}>
              <option value="4">4</option>
              <option value="6">6</option>
              <option value="8">8</option>
              <option value="10">10</option>
              <option value="12">12</option>
              <option value="20">20</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
        <div className="dice-setting">
          Bonus:
          <div className="sel-cont">
            <select name="symbol" value={this.state.symbol} onChange={this.handleSymbolChange}>
              <option value="+">+</option>
              <option value="-">-</option>
            </select>
          </div>
          <div className="sel-cont">
            <select name="modifier" value={this.state.modifier} onChange={this.handleModifierChange}>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
        </div>
        <div>
          <label><input type="checkbox" checked={this.state.private} onChange={this.handlePrivateChange}/> Do not share result</label>
        </div>
        <button className="btn btn-hot w-100 cursor-pointer" onClick={this.handleButtonClick}>
          <div className="btn-text font-weight-bold">Roll</div>
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiceBalloon);
