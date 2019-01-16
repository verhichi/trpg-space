import React, { Component } from 'react';
import { connect } from 'react-redux';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    isMobile:     state.isMobile,
    id:           state.id,
    modalSetting: state.modalSetting
  };
};


class General extends Component {
  render() {

    const toggleActiveClass = this.props.isActive ? 'is-active' : '';
    const toggleScrollClass = this.props.isMobile ? '' : 'hide-scroll';

    const privacyText = {
      '0': 'Display all data',
      '1': 'Only display name',
      '2': 'Hide all data',
    };

    return (
      <div className={`char-modal f-grow-1 ${toggleActiveClass} ${toggleScrollClass}`}>
        <div className="mb-2 font-size-lg">
          <div>Type:</div>
          <div>{this.props.general.type}</div>
        </div>

        <div className="mb-2 font-size-lg">
          <div>Name:</div>
          <div>{this.props.general.name}</div>
        </div>

        <div className="mb-2 font-size-lg">
          <div>Theme Color:</div>
          <div className="d-flex p-relative w-100">
            <div className="inp-clr-circle f-shrink-0" style={{background: this.props.general.color}}></div>
            <div className="pseudo-inp f-grow-1">{this.props.general.color}</div>
          </div>
        </div>

        <div className="mb-2 font-size-lg">
          <div>Privacy Level:</div>
          <div>{privacyText[this.props.general.privacy]}</div>
        </div>

        <div className="mb-2 font-size-lg">
          <div>Profile Image:</div>
          <label class="inp-file-cont d-flex w-100 cursor-pointer">
            <FontAwesomeIcon icon="upload"/>
            <div className="inp-file-text f-grow-1 pl-3">Choose an image...</div>
          </label>
        </div>

        <div className="mb-2 font-size-lg">
          <div>External Character Sheet Link:</div>
          { this.props.general.link.length === 0 
              ? (<div>-</div>)
              : (<a href={this.props.general.link} target="_blank" rel='noreferrer noopener'>{this.props.general.link}</a>)}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(General);
