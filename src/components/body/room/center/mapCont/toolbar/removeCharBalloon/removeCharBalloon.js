import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleRemoveChar, setMapMode, removeMapChar } from '../../../../../../../redux/actions/action';
import socket from '../../../../../../../socket/socketClient';


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
    toggleRemoveChar: () => dispatch(toggleRemoveChar()),
    removeMapChar: (charId) => dispatch(removeMapChar(charId))
  };
};

class RemoveCharBalloon extends Component {
  constructor (props){
    super(props);

    this.state = { charIdToRemove: '' };

    this.handleRemoveCharButtonClick = this.handleRemoveCharButtonClick.bind(this);
    this.handleRemoveCharChange = this.handleRemoveCharChange.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentWillReceiveProps (nextProps){
    this.props.displayRemoveChar
      ? document.removeEventListener('click', this.handleOutsideClick)
      : document.addEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick (e){
    if (this.node.contains(e.target)) return;
    this.props.toggleRemoveChar();
  }

  handleRemoveCharButtonClick (e){
    this.props.removeMapChar(this.state.charIdToRemove);
    socket.emit('removeMapChar', this.props.roomId, this.state.charIdToRemove);
    this.props.toggleRemoveChar();
  }

  handleRemoveCharChange (e){
    this.setState({charIdToRemove: e.target.value});
  }

  render() {
    const isDisabled = this.state.charIdToRemove.length === 0 || !this.props.charList.some(char => char.charId === this.state.charIdToRemove);
    const toggleRemoveChar = this.props.displayRemoveChar ? 'is-active' : '';

    const charOpt = this.props.charList.filter((char) => this.props.id === char.ownerId && this.props.mapSetting.charList.some(placedChar => placedChar.charId === char.charId)).map((char) => {
      return (<option key={char.charId} value={char.charId}>{char.name}</option>);
    });

    return (
      <div className={`place-char-balloon cursor-default ${toggleRemoveChar}`} ref={node => this.node = node}>
        <div>Select character:</div>
        <div className="char-sel-cont">
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
