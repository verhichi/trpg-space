import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showMapScale, hideMapScale } from '../../../../../../../redux/actions/display';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Component
import ScaleMapBalloon from './scaleMapBalloon/scaleMapBalloon';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { displaySetting: state.displaySetting };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    showMapScale: () => dispatch(showMapScale()),
    hideMapScale: () => dispatch(hideMapScale())
  };
};

class ScaleMapButton extends Component {
  constructor (props){
    super(props);
    this.scaleMapRef = React.createRef();

    this.handleButtonClick  = this.handleButtonClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  handleButtonClick (e){
    if (this.props.displaySetting.displayMapScale){
      window.removeEventListener('click', this.handleOutsideClick, false);
      this.props.hideMapScale()
    } else {
      window.addEventListener('click', this.handleOutsideClick, false);
      this.props.showMapScale();
    }
  }

  handleOutsideClick (e){
    if (this.scaleMapRef.current.contains(e.target)) return;

    window.removeEventListener('click', this.handleOutsideClick, false);
    this.props.hideMapScale();
  }


  render() {
    return (
      <div className="map-toolbar-btn p-relative d-inline-block" ref={this.scaleMapRef}>
        <ScaleMapBalloon/>
        <div className="p-2 cursor-pointer align-center" onClick={this.handleButtonClick}>
          <FontAwesomeIcon icon="search"/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScaleMapButton);
