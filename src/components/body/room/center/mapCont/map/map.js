import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setMapMode, addMapChar, editMapChar } from '../../../../../../redux/actions/action';
import socket from '../../../../../../socket/socketClient';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './map.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    id: state.id,
    roomId: state.roomId,
    charList: state.charList,
    isMobile: state.isMobile,
    mapSetting: state.mapSetting,
    displayPlaceChar: state.displayPlaceChar
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    setMapMode: (mode) => dispatch(setMapMode(mode)),
    addMapChar: (charData) => dispatch(addMapChar(charData)),
    editMapChar: (charData) => dispatch(editMapChar(charData)),
  };
};

class Map extends Component {
  constructor (props){
    super(props);
    this.handleImageClick = this.handleImageClick.bind(this);
  }

  handleImageClick (e){
    console.log('--------------------');
    console.log('e.nativeEvent.offsetX:', e.nativeEvent.offsetX);
    console.log('e.nativeEvent.offsetY:', e.nativeEvent.offsetY);

    const charData = {
      ownerId: this.props.id,
      charId: this.state.charIdToPlace,
      x: e.nativeEvent.offsetX - 12.5, // character dot is 25px, -12.5px to place dot in center of click.
      y: e.nativeEvent.offsetY - 12.5  // character dot is 25px, -12.5px to place dot in center of click.
    };

    if (this.props.mapSetting.mode === 'placeChar'){
      if (this.props.mapSetting.charList.some((char) => char.charId === charData.charId)){
        this.props.editMapChar(charData);
      } else {
        this.props.addMapChar(charData);
      }

      socket.emit('mapChar', this.props.roomId, charData);
    }

    this.props.setMapMode('');
  }

  handlePlaceCharButtonClick (e){
    this.props.togglePlaceChar();
    this.props.setMapMode('placeChar');
  }

  handlePlaceCharChange (e){
    this.setState({charIdToPlace: e.target.value});
  }

  render() {

    const mapChar = this.props.mapSetting.charList.map((char, idx) => {
      return (<div className="map-char" style={{left: char.x, top: char.y}}></div>);
    });

    const charOpt = this.props.charList.filter((char) => this.props.id === char.ownerId).map((char) => {
      return (<option key={char.charId} value={char.charId}>{char.name}</option>);
    });

    return (
      <div className="map-img-cont h-100 align-center p-2">
        {this.props.mapSetting.image.src.length === 0
          ? null
          : (<div className="d-inline-block p-relative">
               {mapChar}
               <img className="map-img" src={this.props.mapSetting.image.src} onClick={this.handleImageClick}/>
             </div>)}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
