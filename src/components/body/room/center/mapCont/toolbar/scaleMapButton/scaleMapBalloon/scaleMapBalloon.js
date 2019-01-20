import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideMapScale, editMapScale } from '../../../../../../../../redux/actions/action';

// Style
import './scaleMapBalloon.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    displayMapScale: state.displayMapScale,
    mapSetting: state.mapSetting
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    hideMapScale: () => dispatch(hideMapScale()),
    editMapScale: (scale) => dispatch(editMapScale(scale))
  };
};

class ScaleMapBalloon extends Component {
  constructor (props){
    super(props);
    this.handleMapScaleChange = this.handleMapScaleChange.bind(this);
  }

  handleMapScaleChange (e){
    this.props.editMapScale(e.target.value);
  }

  render() {
    const toggleClass = this.props.displayMapScale ? 'is-active' : '';

    return (
      <div className={`map-scale-balloon cursor-default ${toggleClass}`}>
        <div>Scale ({this.props.mapSetting.image.scale}):</div>
        <div>
          <input className="map-scale-inp" type="range" min="0.1" max="2.0" step="0.1" value={this.props.mapSetting.image.scale} onChange={this.handleMapScaleChange}/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScaleMapBalloon);
