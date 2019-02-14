import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal } from '../../../../../../redux/actions/modal';
import { toggleMapGrid, editMapPosition } from '../../../../../../redux/actions/map';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './toolbar.scss';

// Component
import PlaceCharButton  from './placeCharButton/placeCharButton';
import RemoveCharButton from './removeCharButton/removeCharButton';
import ScaleMapButton   from './scaleMapButton/scaleMapButton';
import PlaceGeoButton   from './placeGeoButton/placeGeoButton';

// Redux Map State to Props
const mapStateToProps = (state) => {
  return {
    global:         state.global,
    displaySetting: state.displaySetting
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    showModal:       (modalType, modalProp) => dispatch(showModal(modalType, modalProp)),
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
        {this.props.mapData.ownerId === this.props.global.id && <PlaceGeoButton mapData={this.props.mapData}/>}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
