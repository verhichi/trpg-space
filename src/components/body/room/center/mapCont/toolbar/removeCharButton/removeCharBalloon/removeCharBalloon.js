import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideRemoveChar, setMapMode, removeMapChar } from '../../../../../../../../redux/actions/action';
import socket from '../../../../../../../../socket/socketClient';

// Style
import './removeCharBalloon.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    id: state.id,
    roomId: state.roomId,
    charList: state.charList,
    displayRemoveChar: state.displayRemoveChar,
    mapSetting: state.mapSetting
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    setMapMode: (mode) => dispatch(setMapMode(mode)),
    hideRemoveChar: () => dispatch(hideRemoveChar()),
    removeMapChar: (charId) => dispatch(removeMapChar(charId))
  };
};

class RemoveCharBalloon extends Component {
  constructor (props){
    super(props);
    this.state = { charIdToRemove: '' };

    this.handleRemoveCharButtonClick = this.handleRemoveCharButtonClick.bind(this);
    this.handleRemoveCharChange = this.handleRemoveCharChange.bind(this);
  }

  handleRemoveCharButtonClick (e){
    this.props.removeMapChar(this.state.charIdToRemove);
    socket.emit('removeMapChar', this.props.roomId, this.state.charIdToRemove);
    this.props.hideRemoveChar();
  }

  handleRemoveCharChange (e){
    this.setState({charIdToRemove: e.target.value});
  }

  render() {
    const isDisabled = this.state.charIdToRemove.length === 0 || !this.props.charList.some(char => char.charId === this.state.charIdToRemove);
    const toggleRemoveChar = this.props.displayRemoveChar ? 'is-active' : '';

    const charOpt = this.props.charList.filter(char => char.onMap && this.props.id === char.ownerId).map(char => {
      return (<option key={char.charId} value={char.charId}>{char.name}</option>);
    });


    return (
      <div className={`place-char-balloon cursor-default ${toggleRemoveChar}`}>
        <div>Select character:</div>
        <div className="balloon-sel sel-cont w-100">
          <select value={this.state.charIdToRemove} onChange={this.handleRemoveCharChange}>
            <option value="">Select a Character</option>
            {charOpt}
          </select>
        </div>
        <button className="btn btn-hot w-100 cursor-pointer" disabled={isDisabled} onClick={this.handleRemoveCharButtonClick}>
          <div className="btn-text font-weight-bold">Remove Character from Map</div>
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoveCharBalloon);
