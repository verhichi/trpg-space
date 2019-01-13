import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showPlaceChar, hidePlaceChar } from '../../../../../../../redux/actions/action';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Component
import PlaceCharBalloon from './placeCharBalloon/placeCharBalloon';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { displayPlaceChar: state.displayPlaceChar };
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

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }


  handleButtonClick (e){
    if (this.props.displayPlaceChar){
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
        <div className="p-relative d-inline-block" ref={ this.placeCharRef }>
          <PlaceCharBalloon/>
          <div className="map-toolbar-btn p-3 cursor-pointer" onClick={this.handleButtonClick}>
            <FontAwesomeIcon icon="street-view"/>
          </div>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceCharButton);
