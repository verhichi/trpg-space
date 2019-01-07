import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal, setMapMode, addMapChar, editMapChar } from '../../../../../redux/actions/action';
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
    isMobile: state.isMobile,
    mapSetting: state.mapSetting
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    showModal: (modalType, modalProp) => dispatch(showModal(modalType, modalProp)),
    setMapMode: (mode) => dispatch(setMapMode(mode)),
    addMapChar: (charData) => dispatch(addMapChar(charData)),
    editMapChar: (charData) => dispatch(editMapChar(charData))
  };
};

class Map extends Component {
  constructor (props){
    super(props);

    this.handleImageClick = this.handleImageClick.bind(this);
    this.handleImageUploadClick = this.handleImageUploadClick.bind(this);
    this.handlePlaceButtonClick  = this.handlePlaceButtonClick.bind(this);
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
      charId: '12345',
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

  handlePlaceButtonClick (e){
    this.props.setMapMode('placeChar');
  }

  render() {
    const mapChar = this.props.mapSetting.charList.map((char, idx) => {
      return (<div className="map-char" style={{left: char.x, top: char.y}}></div>);
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

        <div className="map-toolbar d-inline-block">
          <div className="map-toolbar-btn d-inline-block p-3 cursor-pointer" onClick={this.handlePlaceButtonClick}>
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
