import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MODAL_TYPE_UPLOAD_IMG } from '../../../../../../constants/constants';
import { showModal } from '../../../../../../redux/actions/modal';
import { showRemoveChar, hideRemoveChar, showPlaceChar, hidePlaceChar } from '../../../../../../redux/actions/display';
import { toggleMapGrid, editMapPosition } from '../../../../../../redux/actions/map';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './toolbar.scss';

// Component
import PlaceCharButton from './placeCharButton/placeCharButton';
import RemoveCharButton from './removeCharButton/removeCharButton';
import ScaleMapButton from './scaleMapButton/scaleMapButton';

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    showModal:       (modalType, modalProp) => dispatch(showModal(modalType, modalProp)),
    showPlaceChar:   ()                     => dispatch(showPlaceChar()),
    hidePlaceChar:   ()                     => dispatch(hidePlaceChar()),
    showRemoveChar:  ()                     => dispatch(showRemoveChar()),
    hideRemoveChar:  ()                     => dispatch(hideRemoveChar()),
    toggleMapGrid:   ()                     => dispatch(toggleMapGrid()),
    editMapPosition: (left, top)            => dispatch(editMapPosition(left, top))
  };
};

class Toolbar extends Component {
  constructor (props){
    super(props);

    this.handleImageUploadClick        = this.handleImageUploadClick.bind(this);
    this.handleToolbarMapGridClick     = this.handleToolbarMapGridClick.bind(this);
    this.handleToolbarMapPositionClick = this.handleToolbarMapPositionClick.bind(this);
  }

  handleImageUploadClick (e){
    this.props.showModal(MODAL_TYPE_UPLOAD_IMG, {
      title:        'Upload an image',
      displayClose: true,
      type:         'map'
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
      <div className="map-toolbar d-flex">
        <PlaceCharButton/>
        <RemoveCharButton/>
        <div className="map-toolbar-btn p-relative d-inline-block">
          <div className="p-2 cursor-pointer align-center" onClick={this.handleImageUploadClick}>
            <FontAwesomeIcon icon="file-image"/>
          </div>
        </div>
        <div className="map-toolbar-btn p-relative d-inline-block">
          <div className="p-2 cursor-pointer align-center"  onClick={this.handleToolbarMapGridClick}>
            <FontAwesomeIcon icon="th"/>
          </div>
        </div>
        <div className="map-toolbar-btn p-relative d-inline-block">
          <div className="p-2 cursor-pointer align-center"  onClick={this.handleToolbarMapPositionClick}>
            <FontAwesomeIcon icon="external-link-square-alt" transform={{ rotate: -90 }}/>
          </div>
        </div>
        <ScaleMapButton/>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Toolbar);
