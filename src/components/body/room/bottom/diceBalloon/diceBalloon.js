import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CHAT_TYPE_ROLL } from '../../../../../constants/constants';
import { addChat } from '../../../../../redux/actions/chatLog';
import { hideDiceBubble } from '../../../../../redux/actions/display';
import socket from '../../../../../socket/socketClient';
import { getDiceRollResult } from '../../../../../utils/roll';
import { diceShareResultLabel, diceRollBtnLabel } from './diceBalloon.i18n';

// Style
import './diceBalloon.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    displaySetting: state.displaySetting,
    global:         state.global,
    userList:       state.userList
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    addChat:        content => dispatch(addChat(content)),
    hideDiceBubble: () => dispatch(hideDiceBubble())
  };
};

class DiceBalloon extends Component {
  constructor (props){
    super(props);
    this.state = {
      diceNumber: 2,
      diceType:   6,
      symbol:     '+',
      modifier:   0,
      private:    false
    };

    this.handleDiceNumberChange = this.handleDiceNumberChange.bind(this);
    this.handleDiceTypeChange   = this.handleDiceTypeChange.bind(this);
    this.handleSymbolChange     = this.handleSymbolChange.bind(this);
    this.handleModifierChange   = this.handleModifierChange.bind(this);
    this.handlePrivateChange    = this.handlePrivateChange.bind(this);
    this.handleButtonClick      = this.handleButtonClick.bind(this);
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
    const name = this.props.userList.find((user) => this.props.global.id === user.id).name;
    const rollData = {
      type:        CHAT_TYPE_ROLL,
      private:     this.state.private,
      diceSetting: this.state.diceNumber + 'd' + this.state.diceType,
      name,
      ...result
    };

    this.props.addChat({ ...rollData, self: true });

    if (!this.state.private){
      socket.emit('chat', this.props.global.roomId, { ...rollData, self: false});
    }

    this.props.hideDiceBubble();
  }

  render (){

    const toggleClass = this.props.displaySetting.displayDiceSetting ? 'is-active' : '';

    return (
      <div className={`dice-help-balloon font-weight-bold font-size-md ${toggleClass}`} ref={node => this.diceNode = node}>
        <div className="dice-setting mb-1 d-flex">
          Dice:
          <div className="sel-cont dice-sel">
            <select name="dice-number" value={this.state.diceNumber} onChange={this.handleDiceNumberChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          d
          <div className="sel-cont dice-sel">
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
        <div className="dice-setting mb-1 d-flex">
          Bonus:
          <div className="sel-cont dice-sel">
            <select name="symbol" value={this.state.symbol} onChange={this.handleSymbolChange}>
              <option value="+">+</option>
              <option value="-">-</option>
            </select>
          </div>
          <div className="sel-cont dice-sel">
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
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
        <div>
          <label><input type="checkbox" checked={!this.state.private} onChange={this.handlePrivateChange}/> {diceShareResultLabel[this.props.global.lang]}</label>
        </div>
        <button className="btn btn-hot w-100 cursor-pointer" onClick={this.handleButtonClick}>
          <div className="btn-text font-weight-bold">{diceRollBtnLabel[this.props.global.lang]}</div>
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiceBalloon);
