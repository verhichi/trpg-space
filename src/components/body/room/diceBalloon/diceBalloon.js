import React, { Component } from 'react';
import { connect } from 'react-redux';

// Style
import './diceBalloon.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { showDiceSetting: state.showDiceSetting };
};

class DiceBalloon extends Component {
  render() {
    const toggleClass = this.props.showDiceSetting ? 'is-active' : '';

    return (
      <div className={`dice-help-balloon font-weight-bold ${toggleClass}`}>
        <div className="dice-setting">
          Dice:
          <div className="sel-cont">
            <select name="dice-number">
              <option value="1">1</option>
              <option value="2" selected>2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          d
          <div className="sel-cont">
            <select name="dice-type">
              <option value="4">4</option>
              <option value="6" selected>6</option>
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
            <select name="symbol">
              <option value="+" selected>+</option>
              <option value="-">-</option>
            </select>
          </div>
          <div className="sel-cont">
            <select name="modifier">
              <option value="0" selected>0</option>
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
          <label><input type="checkbox"/> Do not share result</label>
        </div>
        <button className="btn btn-hot w-100 cursor-pointer">
          <div className="btn-text font-weight-bold">Roll</div>
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps)(DiceBalloon);
