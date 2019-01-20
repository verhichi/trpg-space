import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal, showRemoveChar, hideRemoveChar, toggleMapGrid, showPlaceChar, hidePlaceChar, editMapPosition } from '../../../../../../redux/actions/action';

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
    toggleMapGrid: () => dispatch(toggleMapGrid()),
    editMapPosition: (left, top) => dispatch(editMapPosition(left, top))
  };
};

class Toolbar extends Component {
  constructor (props){
    super(props);

    this.handleImageUploadClick = this.handleImageUploadClick.bind(this);
    this.handleToolbarMapGridClick = this.handleToolbarMapGridClick.bind(this);
    this.handleToolbarMapPositionClick = this.handleToolbarMapPositionClick.bind(this);
  }

  handleImageUploadClick (e){
    this.props.showModal('uploadImg', {
      title: 'Upload an image',
      displayClose: true,
      type: 'map'
    });
  }

  handleToolbarMapPositionClick (e){
    this.props.editMapPosition(0 ,0);
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
        <div className="p-relative d-inline-block">
          <div className="map-toolbar-btn p-3 cursor-pointer"  onClick={this.handleToolbarMapPositionClick}>
            <FontAwesomeIcon icon="arrow-down" transform={{ rotate: 135 }}/>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
