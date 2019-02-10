import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showMapGeo, hideMapGeo } from '../../../../../../../redux/actions/display';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Component
import PlaceGeoBalloon from './placeGeoBalloon/placeGeoBalloon';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { displaySetting: state.displaySetting };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    showMapGeo: () => dispatch(showMapGeo()),
    hideMapGeo: () => dispatch(hideMapGeo())
  };
};

class PlaceGeoButton extends Component {
  constructor (props){
    super(props);
    this.placeGeoRef = React.createRef();

    this.handleButtonClick  = this.handleButtonClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  handleButtonClick (e){
    if (this.props.displaySetting.displayMapGeo){
      window.removeEventListener('click', this.handleOutsideClick, false);
      this.props.hideMapGeo()
    } else {
      window.addEventListener('click', this.handleOutsideClick, false);
      this.props.showMapGeo();
    }
  }

  handleOutsideClick (e){
    if (this.placeGeoRef.current.contains(e.target)) return;

    window.removeEventListener('click', this.handleOutsideClick, false);
    this.props.hideMapGeo();
  }


  render() {
    return (
      <div className="map-toolbar-btn p-relative d-inline-block" ref={this.placeGeoRef}>
        <PlaceGeoBalloon/>
        <div className="p-2 cursor-pointer align-center" onClick={this.handleButtonClick}>
          <FontAwesomeIcon icon="vector-square"/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceGeoButton);
