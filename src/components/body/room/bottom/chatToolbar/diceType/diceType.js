import React, { Component } from 'react';
import { connect } from 'react-redux';
import bcDice from '../../../../../../bcdice/bcdiceBot';
import { diceBotList } from '../../../../../../constants/diceBotTypes';
import { selectDiceLabel, defaultLabel } from './diceType.i18n';


// Style
import './diceType.scss';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { global: state.global };
};

class DiceType extends Component {
  constructor (props){
    super(props);
    this.state = {
      type: bcDice.type
    };

    this.handleDiceTypeChange = this.handleDiceTypeChange.bind(this);
  }

  handleDiceTypeChange (e){
    this.setState({ type: e.target.value });
    bcDice.type = e.target.value;
  }

  render (){
    const diceBotTypeOptions = diceBotList[this.props.global.lang].map(diceBot => {
      return <option value={diceBot.type}>{ diceBot.name }</option>
    })

    return(
      <div className="chat-opt-btn">
        <FontAwesomeIcon icon="dice" mask="folder" transform="shrink-8"/>
        <div className="chat-opt-dice-type p-2 p-absolute align-left cursor-default">
          <div>{ selectDiceLabel[this.props.global.lang] }</div>
          <div className="sel-cont balloon-sel w-100">
            <select value={this.state.type} onChange={this.handleDiceTypeChange}>
              <option value="DiceBot">{ defaultLabel[this.props.global.lang] }</option>
              { diceBotTypeOptions }
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(DiceType);
