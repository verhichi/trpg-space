import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showRemoveChar, hideRemoveChar } from '../../../../../../../redux/actions/action';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Component
import RemoveCharBalloon from './removeCharBalloon/removeCharBalloon';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { displayRemoveChar: state.displayRemoveChar };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    showRemoveChar: () => dispatch(showRemoveChar()),
    hideRemoveChar: () => dispatch(hideRemoveChar())
  };
};

class RemoveCharButton extends Component {
  constructor (props){
    super(props);
    this.removeCharRef = React.createRef();

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  handleButtonClick (e){
    if (this.props.displayRemoveChar){
      window.removeEventListener('click', this.handleOutsideClick, false);
      this.props.hideRemoveChar()
    } else {
      window.addEventListener('click', this.handleOutsideClick, false);
      this.props.showRemoveChar();
    }
  }

  handleOutsideClick (e){
    if (this.removeCharRef.current.contains(e.target)) return;

    window.removeEventListener('click', this.handleOutsideClick, false);
    this.props.hideRemoveChar();
  }


  render() {
    return (
      <div className="p-relative d-inline-block" ref= {this.removeCharRef}>
        <RemoveCharBalloon/>
        <div className="map-toolbar-btn p-3 cursor-pointer" onClick={this.handleButtonClick}>
          <FontAwesomeIcon icon="user-times"/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoveCharButton);
