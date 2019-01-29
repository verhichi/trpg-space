import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showRemoveChar, hideRemoveChar } from '../../../../../../../redux/actions/display';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Component
import RemoveCharBalloon from './removeCharBalloon/removeCharBalloon';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { displaySetting: state.displaySetting };
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

    this.handleButtonClick  = this.handleButtonClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  handleButtonClick (e){
    if (this.props.displaySetting.displayRemoveChar){
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
      <div className="map-toolbar-btn p-relative d-inline-block" ref= {this.removeCharRef}>
        <RemoveCharBalloon/>
        <div className="p-2 cursor-pointer align-center" onClick={this.handleButtonClick}>
          <span className="fa-layers fa-fw">
            <FontAwesomeIcon icon="times" transform="shrink-9 up-8"/>
            <FontAwesomeIcon icon="street-view" transform="shrink-3 down-3"/>
          </span>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoveCharButton);
