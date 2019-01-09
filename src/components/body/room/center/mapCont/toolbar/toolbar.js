import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal, togglePlaceChar } from '../../../../../../redux/actions/action';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './toolbar.scss';

// Component
import PlaceCharBalloon from './placeCharBalloon/placeCharBalloon';

// // Redux Map State To Prop
// const mapStateToProps = (state) => {
//   return {
//     id: state.id,
//     roomId: state.roomId,
//     charList: state.charList,
//     isMobile: state.isMobile,
//     mapSetting: state.mapSetting,
//     displayPlaceChar: state.displayPlaceChar
//   };
// };

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    showModal: (modalType, modalProp) => dispatch(showModal(modalType, modalProp)),
    togglePlaceChar: () => dispatch(togglePlaceChar())
  };
};

class Toolbar extends Component {
  constructor (props){
    super(props);

    this.handleImageUploadClick = this.handleImageUploadClick.bind(this);
    this.handleToolbarPlaceCharClick  = this.handleToolbarPlaceCharClick.bind(this);
  }

  handleImageUploadClick (e){
    this.props.showModal('uploadImg', {
      title: 'Upload an image',
      displayClose: true,
      type: 'map'
    });
  }

  handleToolbarPlaceCharClick (e){
    this.props.togglePlaceChar();
  }

  render() {
    return (
      <div className="map-toolbar d-inline-block">
        <div className="p-relative d-inline-block">
          <PlaceCharBalloon/>
          <div className="map-toolbar-btn p-3 cursor-pointer" onClick={this.handleToolbarPlaceCharClick}>
            <FontAwesomeIcon icon="street-view"/>
          </div>
        </div>
        <div className="p-relative d-inline-block">
          <div className="map-toolbar-btn p-3 cursor-pointer">
            <FontAwesomeIcon icon="user-times"/>
          </div>
        </div>
        <div className="p-relative d-inline-block">
          <div className="map-toolbar-btn p-3 cursor-pointer" onClick={this.handleImageUploadClick}>
            <FontAwesomeIcon icon="file-image"/>
          </div>
        </div>
        <div className="p-relative d-inline-block">
          <div className="map-toolbar-btn p-3 cursor-pointer">
            <FontAwesomeIcon icon="ruler-combined"/>
          </div>
        </div>
        <div className="p-relative d-inline-block">
          <div className="map-toolbar-btn p-3 cursor-pointer">
            <FontAwesomeIcon icon="th"/>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Toolbar);
