import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideMapGeo } from '../../../../../../../../redux/actions/display';
import { setMapMode } from '../../../../../../../../redux/actions/map';
import { MAP_MODE_PLACE_GEO } from '../../../../../../../../constants/constants';

// Style
import './placeGeoBalloon.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    global:         state.global,
    displaySetting: state.displaySetting,
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    setMapMode: (mapId, mode) => dispatch(setMapMode(mapId, mode)),
    hideMapGeo: ()            => dispatch(hideMapGeo()),
  };
};

class PlaceGeoBalloon extends Component {
  constructor (props){
    super(props);

    this.handlePlaceGeoButtonClick = this.handlePlaceGeoButtonClick.bind(this);
  }

  handlePlaceGeoButtonClick (e){
    this.props.setMapMode(this.props.displaySetting.displayMap, MAP_MODE_PLACE_GEO);
    this.props.hideMapGeo();
  }

  render() {
    const togglePlaceGeo = this.props.displaySetting.displayMapGeo ? 'is-active' : '';

    return (
      <div className={`place-geo-balloon cursor-default ${togglePlaceGeo}`}>
        <div className="font-size-sm">Squares are used to hide areas on maps.</div>
        <button className="btn btn-hot w-100 cursor-pointer" onClick={this.handlePlaceGeoButtonClick}>
          <div className="btn-text font-weight-bold">Place Square</div>
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceGeoBalloon);
