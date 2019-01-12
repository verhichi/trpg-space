import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setMapMode, addMapChar, editMapChar, setCharToPlace } from '../../../../../../../redux/actions/action';
import socket from '../../../../../../../socket/socketClient';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './charDot.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    id: state.id,
    roomId: state.roomId,
    charList: state.charList,
    isMobile: state.isMobile,
    mapSetting: state.mapSetting,
    displayPlaceChar: state.displayPlaceChar,
    displayMapGrid: state.displayMapGrid
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    setMapMode:     (mode)     => dispatch(setMapMode(mode)),
    addMapChar:     (charData) => dispatch(addMapChar(charData)),
    editMapChar:    (charData) => dispatch(editMapChar(charData)),
    setCharToPlace: (charId)   => dispatch(setCharToPlace(charId))
  };
};

class CharDot extends Component {

  render() {
    return (
      <div className="map-char p-relative cursor-pointer" key={this.props.charData.charId} style={{backgroundColor: this.props.charData.color, left: this.props.charData.mapCoor.x, top: this.props.charData.mapCoor.y}}>
        <div className="map-char-balloon p-absolute p-1 align-left">
          <div className="font-size-md font-weight-bold pb-1 one-line-ellipsis">{this.props.charData.name}</div>
          <div className="font-size-sm one-line-ellipsis"><FontAwesomeIcon icon="heart"/> {this.props.charData.curHp} / {this.props.charData.maxHp}</div>
          <div className="font-size-sm one-line-ellipsis"><FontAwesomeIcon icon="flask"/> {this.props.charData.curMp} / {this.props.charData.maxMp}</div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharDot);
