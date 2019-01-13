import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal, showRemoveChar, hideRemoveChar, toggleMapGrid, showPlaceChar, hidePlaceChar } from '../../../../../../redux/actions/action';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './toolbar.scss';

// Component
import PlaceCharButton from './placeCharButton/placeCharButton';
import RemoveCharButton from './removeCharButton/removeCharButton';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    displayPlaceChar: state.displayPlaceChar,
    displayRemoveChar: state.displayRemoveChar
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    showModal: (modalType, modalProp) => dispatch(showModal(modalType, modalProp)),
    showPlaceChar: () => dispatch(showPlaceChar()),
    hidePlaceChar: () => dispatch(hidePlaceChar()),
    showRemoveChar: () => dispatch(showRemoveChar()),
    hideRemoveChar: () => dispatch(hideRemoveChar()),
    toggleMapGrid: () => dispatch(toggleMapGrid())
  };
};

class Toolbar extends Component {
  constructor (props){
    super(props);

    this.handleImageUploadClick = this.handleImageUploadClick.bind(this);
    // this.handleToolbarPlaceCharClick = this.handleToolbarPlaceCharClick.bind(this);
    // this.handleToolbarRemoveCharClick = this.handleToolbarRemoveCharClick.bind(this);
    this.handleToolbarMapGridClick = this.handleToolbarMapGridClick.bind(this);
    // this.handlePlaceCharOutsideClick = this.handlePlaceCharOutsideClick.bind(this);
  }


  handleImageUploadClick (e){
    this.props.showModal('uploadImg', {
      title: 'Upload an image',
      displayClose: true,
      type: 'map'
    });
  }


  // handleToolbarPlaceCharClick (e){
  //   if (this.props.displayPlaceChar){
  //     window.removeEventListener('click', this.handlePlaceCharOutsideClick, false);
  //     this.props.hidePlaceChar();
  //   } else {
  //     window.addEventListener('click', this.handlePlaceCharOutsideClick, false);
  //     this.props.showPlaceChar();
  //   }
  // }
  //
  //
  // handlePlaceCharOutsideClick (e){
  //   if (this.placeCharNode.contains(e.target)) return;
  //
  //   window.removeEventListener('click', this.handlePlaceCharOutsideClick, false);
  //   this.props.hidePlaceChar();
  // }
  //
  //
  // handleToolbarRemoveCharClick (e){
  //   if (this.props.displayRemoveChar){
  //     window.removeEventListener('click', this.handleRemoveCharOutsideClick, false);
  //     this.props.hideRemoveChar();
  //   } else {
  //     window.addEventListener('click', this.handleRemoveCharOutsideClick, false);
  //     this.props.showRemoveChar();
  //   }
  // }
  //
  //
  // handleRemoveCharOutsideClick (e){
  //   if (this.removeCharNode.contains(e.target)) return;
  //
  //   window.removeEventListener('click', this.handleRemoveCharOutsideClick, false);
  //   this.props.hideRemoveChar();
  // }


  handleToolbarMapGridClick (e){
    this.props.toggleMapGrid();
  }


  render() {
    return (
      <div className="map-toolbar d-inline-block">
        <PlaceCharButton/>
        <RemoveCharButton/>
        <div className="p-relative d-inline-block">
          <div className="map-toolbar-btn p-3 cursor-pointer" onClick={this.handleImageUploadClick}>
            <FontAwesomeIcon icon="file-image"/>
          </div>
        </div>
        <div className="p-relative d-inline-block">
          <div className="map-toolbar-btn p-3 cursor-pointer"  onClick={this.handleToolbarMapGridClick}>
            <FontAwesomeIcon icon="th"/>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
