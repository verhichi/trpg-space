import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideRemoveChar } from '../../../../../../../../redux/actions/display';
import { setMapMode } from '../../../../../../../../redux/actions/map';
import { removeMapChar } from '../../../../../../../../redux/actions/char';
import socket from '../../../../../../../../socket/socketClient';
import { removeSelectLabel, removeCharBtnLabel } from './removeCharBalloon.i18n';

// Style
import './removeCharBalloon.scss';

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
    setMapMode:     (mode)   => dispatch(setMapMode(mode)),
    hideRemoveChar: ()       => dispatch(hideRemoveChar()),
    removeMapChar:  (charId) => dispatch(removeMapChar(charId))
  };
};

class RemoveCharBalloon extends Component {
  constructor (props){
    super(props);
    this.state = { charIdToRemove: '-' };

    this.handleRemoveCharButtonClick = this.handleRemoveCharButtonClick.bind(this);
    this.handleRemoveCharChange      = this.handleRemoveCharChange.bind(this);
  }

  handleRemoveCharButtonClick (e){
    this.props.removeMapChar(this.state.charIdToRemove);
    socket.emit('removeMapChar', this.props.global.roomId, this.state.charIdToRemove);
    this.setState({ charIdToRemove: '-' });
    this.props.hideRemoveChar();
  }

  handleRemoveCharChange (e){
    this.setState({ charIdToRemove: e.target.value });
  }

  render() {
    const isDisabled = this.state.charIdToRemove.length === 0 || !this.props.charList.some(char => char.charId === this.state.charIdToRemove);
    const toggleRemoveChar = this.props.displaySetting.displayRemoveChar ? 'is-active' : '';

    const charOpt = this.props.charList.filter(char => char.map.onMap).map(char => {
      return (<option key={char.charId} value={char.charId}>{char.general.name}</option>);
    });

    return (
      <div className={`place-char-balloon cursor-default ${toggleRemoveChar}`}>
        <div>{removeSelectLabel[this.props.global.lang]}</div>
        <div className="balloon-sel sel-cont w-100">
          <select value={this.state.charIdToRemove} onChange={this.handleRemoveCharChange}>
            <option value="-">---</option>
            {charOpt}
          </select>
        </div>
        <button className="btn btn-hot w-100 cursor-pointer" disabled={isDisabled} onClick={this.handleRemoveCharButtonClick}>
          <div className="btn-text font-weight-bold">{removeCharBtnLabel[this.props.global.lang]}</div>
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoveCharBalloon);
