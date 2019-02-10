import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideMapScale } from '../../../../../../../../redux/actions/display';
import { editMapScale } from '../../../../../../../../redux/actions/map';

// Style
import './scaleMapBalloon.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    displaySetting: state.displaySetting,
    mapList:        state.mapList
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    hideMapScale: ()             => dispatch(hideMapScale()),
    editMapScale: (mapId, scale) => dispatch(editMapScale(mapId, scale))
  };
};

class ScaleMapBalloon extends Component {
  constructor (props){
    super(props);

    this.handleMapScaleChange = this.handleMapScaleChange.bind(this);
  }

  handleMapScaleChange (e){
    this.props.editMapScale(this.props.displaySetting.displayMap, e.target.value);
  }

  render() {
    const toggleClass = this.props.displaySetting.displayMapScale ? 'is-active' : '';

    return (
      <div className={`map-scale-balloon cursor-default ${toggleClass}`}>
        <div>Scale ({parseFloat(this.props.mapList.find(map => map.mapId === this.props.displaySetting.displayMap).scale).toFixed(1)}):</div>
        <div>
          <input className="map-scale-inp" type="range" min="0.1" max="2.0" step="0.1" value={this.props.mapList.find(map => map.mapId === this.props.displaySetting.displayMap).scale} onChange={this.handleMapScaleChange}/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScaleMapBalloon);
