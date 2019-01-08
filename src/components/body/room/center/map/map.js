import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal, setMapMode, addMapChar, editMapChar, togglePlaceChar } from '../../../../../redux/actions/action';
import socket from '../../../../../socket/socketClient';


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
    showModal: (modalType, modalProp) => dispatch(showModal(modalType, modalProp)),
    setMapMode: (mode) => dispatch(setMapMode(mode)),
    addMapChar: (charData) => dispatch(addMapChar(charData)),
    editMapChar: (charData) => dispatch(editMapChar(charData)),
    togglePlaceChar: () => dispatch(togglePlaceChar())
  };
};

class Map extends Component {
  constructor (props){
    super(props);

    this.state = {
      charIdToPlace: ''
    };

    this.handleImageClick = this.handleImageClick.bind(this);
    this.handleImageUploadClick = this.handleImageUploadClick.bind(this);
    this.handleToolbarPlaceCharClick  = this.handleToolbarPlaceCharClick.bind(this);
    this.handlePlaceCharButtonClick = this.handlePlaceCharButtonClick.bind(this);
    this.handlePlaceCharChange = this.handlePlaceCharChange.bind(this);
  }

  handleImageUploadClick (e){
    this.props.showModal('uploadImg', {
      title: 'Upload an image',
      displayClose: true,
      type: 'map'
    });
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

  handleToolbarPlaceCharClick (e){
    this.props.togglePlaceChar();
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

    const mapChar = this.props.mapSetting.charList.map((char, idx) => {
      return (<div className="map-char" style={{left: char.x, top: char.y}}></div>);
    });

    const charOpt = this.props.charList.filter((char) => this.props.id === char.ownerId).map((char) => {
      return (<option key={char.charId} value={char.charId}>{char.name}</option>);
    });

    return (
      <div className="map-cont f-grow-1">
        <div className="map-img-cont h-100 align-center p-2">
          {this.props.mapSetting.image.src.length === 0
            ? null
            : (<div className="d-inline-block p-relative">
                 {mapChar}
                 <img className="map-img" src={this.props.mapSetting.image.src} onClick={this.handleImageClick}/>
               </div>)}
        </div>

        <div className={`place-char-balloon ${togglePlaceChar}`}>
          <div className="char-sel-cont">
            <select value={this.state.charIdToPlace} onChange={this.handlePlaceCharChange}>
              <option value="">Select a Character</option>
              {charOpt}
            </select>
          </div>
          <button className="btn btn-hot w-100 cursor-pointer" onClick={this.handlePlaceCharButtonClick}>
            <div className="btn-text font-weight-bold">Place Character on Map</div>
          </button>
        </div>

        <div className="map-toolbar d-inline-block">
          <div className="map-toolbar-btn d-inline-block p-3 cursor-pointer" onClick={this.handleToolbarPlaceCharClick}>
            <FontAwesomeIcon icon="street-view"/>
          </div>
          <div className="map-toolbar-btn d-inline-block p-3 cursor-pointer">
            <FontAwesomeIcon icon="user-times"/>
          </div>
          <div className="map-toolbar-btn d-inline-block p-3 cursor-pointer" onClick={this.handleImageUploadClick}>
            <FontAwesomeIcon icon="file-image"/>
          </div>
          <div className="map-toolbar-btn d-inline-block p-3 cursor-pointer">
            <FontAwesomeIcon icon="ruler-combined"/>
          </div>
          <div className="map-toolbar-btn d-inline-block p-3 cursor-pointer">
            <FontAwesomeIcon icon="th"/>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
