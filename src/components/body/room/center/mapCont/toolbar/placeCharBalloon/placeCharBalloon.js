import React, { Component } from 'react';
import { connect } from 'react-redux';
import { togglePlaceChar, setMapMode, setCharToPlace } from '../../../../../../../redux/actions/action';

// Style
import './placeCharBalloon.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    id: state.id,
    roomId: state.roomId,
    charList: state.charList,
    displayPlaceChar: state.displayPlaceChar
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    setMapMode: (mode) => dispatch(setMapMode(mode)),
    togglePlaceChar: () => dispatch(togglePlaceChar()),
    setCharToPlace: (charId) => dispatch(setCharToPlace(charId))
  };
};

class PlaceCharBalloon extends Component {
  constructor (props){
    super(props);

    this.state = { charIdToPlace: '' };

    this.handlePlaceCharButtonClick = this.handlePlaceCharButtonClick.bind(this);
    this.handlePlaceCharChange = this.handlePlaceCharChange.bind(this);
  }

  handlePlaceCharButtonClick (e){
    this.props.setMapMode('placeChar');
    this.props.setCharToPlace(this.state.charIdToPlace);
    this.props.togglePlaceChar();
  }

  handlePlaceCharChange (e){
    this.setState({charIdToPlace: e.target.value});
  }

  render() {
    const isDisabled = this.state.charIdToPlace.length === 0;
    const togglePlaceChar = this.props.displayPlaceChar ? 'is-active' : '';

    const charOpt = this.props.charList.filter((char) => this.props.id === char.ownerId).map((char) => {
      return (<option key={char.charId} value={char.charId}>{char.name}</option>);
    });

    return (
      <div className={`place-char-balloon cursor-default ${togglePlaceChar}`}>
        <div>Select character:</div>
        <div className="char-sel-cont">
          <select value={this.state.charIdToPlace} onChange={this.handlePlaceCharChange}>
            <option value="">Select a Character</option>
            {charOpt}
          </select>
        </div>
        <button className="btn btn-hot w-100 cursor-pointer" disabled={isDisabled} onClick={this.handlePlaceCharButtonClick}>
          <div className="btn-text font-weight-bold">Place Character on Map</div>
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceCharBalloon);
