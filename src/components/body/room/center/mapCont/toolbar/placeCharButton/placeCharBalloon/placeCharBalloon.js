import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MAP_MODE_PLACE_CHAR } from '../../../../../../../../constants/constants';
import { hidePlaceChar } from '../../../../../../../../redux/actions/display';
import { setMapMode, setCharToPlace } from '../../../../../../../../redux/actions/map';
import { charSelectLabel, placeCharBtnLabel } from './placeCharBalloon.i18n';

// Style
import './placeCharBalloon.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    global:         state.global,
    charList:       state.charList,
    displaySetting: state.displaySetting,
    mapSetting:     state.mapSetting
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    hidePlaceChar:  ()       => dispatch(hidePlaceChar()),
    setMapMode:     (mode)   => dispatch(setMapMode(mode)),
    setCharToPlace: (charId) => dispatch(setCharToPlace(charId))
  };
};

class PlaceCharBalloon extends Component {
  constructor (props){
    super(props);
    this.state = { charIdToPlace: '-' };

    this.handlePlaceCharButtonClick = this.handlePlaceCharButtonClick.bind(this);
    this.handlePlaceCharChange      = this.handlePlaceCharChange.bind(this);
  }

  handlePlaceCharButtonClick (e){
    this.props.setMapMode(MAP_MODE_PLACE_CHAR);
    this.props.setCharToPlace(this.state.charIdToPlace);
    this.setState({ charIdToPlace: '-' });
    this.props.hidePlaceChar();
  }

  handlePlaceCharChange (e){
    this.setState({ charIdToPlace: e.target.value });
  }

  render() {
    const isDisabled = this.state.charIdToPlace.length === 0 || this.props.mapSetting.image.src.length === 0 || !this.props.charList.some(char => char.charId === this.state.charIdToPlace);
    const toggleClass = this.props.displaySetting.displayPlaceChar ? 'is-active' : '';

    const charOpt = this.props.charList.map((char) => {
      return (<option key={char.charId} value={char.charId}>{char.general.name}</option>);
    });

    return (
      <div className={`place-char-balloon cursor-default ${toggleClass}`}>
        <div>{charSelectLabel[this.props.global.lang]}</div>
        <div className="balloon-sel sel-cont w-100">
          <select value={this.state.charIdToPlace} onChange={this.handlePlaceCharChange}>
            <option value="-">---</option>
            {charOpt}
          </select>
        </div>
        <button className="btn btn-hot w-100 cursor-pointer" disabled={isDisabled} onClick={this.handlePlaceCharButtonClick}>
          <div className="btn-text font-weight-bold">{placeCharBtnLabel[this.props.global.lang]}</div>
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceCharBalloon);
