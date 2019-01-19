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
    this.handleToolbarMapGridClick = this.handleToolbarMapGridClick.bind(this);
  }


  handleImageUploadClick (e){
    this.props.showModal('uploadImg', {
      title: 'Upload an image',
      displayClose: true,
      type: 'map'
    });
  }

  handleToolbarMapGridClick (e){
    this.props.toggleMapGrid();
  }

  render() {
    return (
      <div className="map-toolbar">
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
