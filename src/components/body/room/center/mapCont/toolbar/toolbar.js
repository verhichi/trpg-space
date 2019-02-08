import React, { Component } from 'react';
import { connect } from 'react-redux';
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

// Redux Map State to Props
const mapStateToProps = (state) => {
  return { displaySetting: state.displaySetting };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    showModal:       (modalType, modalProp) => dispatch(showModal(modalType, modalProp)),
    showPlaceChar:   ()                     => dispatch(showPlaceChar()),
    hidePlaceChar:   ()                     => dispatch(hidePlaceChar()),
    showRemoveChar:  ()                     => dispatch(showRemoveChar()),
    hideRemoveChar:  ()                     => dispatch(hideRemoveChar()),
    toggleMapGrid:   (mapId)                => dispatch(toggleMapGrid(mapId)),
    editMapPosition: (mapId, left, top)     => dispatch(editMapPosition(mapId, left, top))
  };
};

class Toolbar extends Component {
  constructor (props){
    super(props);

    this.handleToolbarMapGridClick     = this.handleToolbarMapGridClick.bind(this);
    this.handleToolbarMapPositionClick = this.handleToolbarMapPositionClick.bind(this);
  }

  handleToolbarMapPositionClick (e){
    this.props.editMapPosition(this.props.displaySetting.displayMap, 0 ,0);
  }

  handleToolbarMapGridClick (e){
    this.props.toggleMapGrid(this.props.displaySetting.displayMap);
  }

  render() {
    return (
      <div className="map-toolbar d-flex">
        <PlaceCharButton/>
        <RemoveCharButton/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
