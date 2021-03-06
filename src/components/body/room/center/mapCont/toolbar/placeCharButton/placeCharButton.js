import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showPlaceChar, hidePlaceChar } from '../../../../../../../redux/actions/display';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Component
import PlaceCharBalloon from './placeCharBalloon/placeCharBalloon';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { displaySetting: state.displaySetting };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    showPlaceChar: () => dispatch(showPlaceChar()),
    hidePlaceChar: () => dispatch(hidePlaceChar())
  };
};

class PlaceCharButton extends Component {
  constructor (props){
    super(props);
    this.placeCharRef = React.createRef();

    this.handleButtonClick  = this.handleButtonClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }


  handleButtonClick (e){
    if (this.props.displaySetting.displayPlaceChar){
      window.removeEventListener('click', this.handleOutsideClick, false);
      this.props.hidePlaceChar()
    } else {
      window.addEventListener('click', this.handleOutsideClick, false);
      this.props.showPlaceChar();
    }
  }


  handleOutsideClick (e){
    if (this.placeCharRef.current.contains(e.target)) return;

    window.removeEventListener('click', this.handleOutsideClick, false);
    this.props.hidePlaceChar();
  }

  render() {
    return (
      <div className="map-toolbar-btn p-relative d-inline-block" ref={ this.placeCharRef }>
        <PlaceCharBalloon/>
        <div className="p-2 cursor-pointer align-center" onClick={this.handleButtonClick}>
          <span className="fa-layers fa-fw">
            <FontAwesomeIcon icon="arrow-down" transform="shrink-9 up-8"/>
            <FontAwesomeIcon icon="street-view" transform="shrink-3 down-3"/>
          </span>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceCharButton);
