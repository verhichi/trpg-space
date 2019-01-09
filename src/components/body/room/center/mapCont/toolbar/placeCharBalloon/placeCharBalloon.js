import React, { Component } from 'react';
import { connect } from 'react-redux';
import { togglePlaceChar, setMapMode } from '../../../../../../../redux/actions/action';

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
    togglePlaceChar: () => dispatch(togglePlaceChar())
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
    this.props.togglePlaceChar();
    this.props.setMapMode('placeChar');
  }

  handlePlaceCharChange (e){
    this.setState({charIdToPlace: e.target.value});
  }

  render() {
    const togglePlaceChar = this.props.displayPlaceChar ? 'is-active' : '';

    const charOpt = this.props.charList.filter((char) => this.props.id === char.ownerId).map((char) => {
      return (<option key={char.charId} value={char.charId}>{char.name}</option>);
    });

    return (
      <div className={`place-char-balloon ${togglePlaceChar}`}>
        <div className="char-sel-cont">
          Select character to place onto map:
          <select value={this.state.charIdToPlace} onChange={this.handlePlaceCharChange}>
            <option value="">Select a Character</option>
            {charOpt}
          </select>
        </div>
        <button className="btn btn-hot w-100 cursor-pointer" onClick={this.handlePlaceCharButtonClick}>
          <div className="btn-text font-weight-bold">Place Character on Map</div>
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceCharBalloon);
