import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MODAL_TYPE_CONFIRM, MODAL_TYPE_NEW_MAP, MODAL_TYPE_EDIT_MAP } from '../../../../../../constants/constants';
import { showModal, hideModal } from '../../../../../../redux/actions/modal';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './mapTab.scss';

// Redux Map State to Props
const mapStateToProps = (state) => {
  return {
    global: state.global
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    hideModal: ()                     => dispatch(hideModal()),
    showModal: (modalType, modalProp) => dispatch(showModal(modalType, modalProp))
  };
};

class MapTab extends Component {
  constructor (props){
    super(props);

    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleNewMapClick = this.handleNewMapClick.bind(this);
    this.handleEditMapClick = this.handleEditMapClick.bind(this);
    this.handleRemoveMapClick = this.handleRemoveMapClick.bind(this);
  }

  handleNewMapClick (e){
    e.stopPropagation();

    this.props.showModal(MODAL_TYPE_NEW_MAP, {
      title:        'Create New Map',
      displayClose: true
    });
  }

  handleEditMapClick (e){
    e.stopPropagation();

    this.props.showModal(MODAL_TYPE_EDIT_MAP, {
      title:        'Edit Map',
      displayClose: true
    });
  }

  handleRemoveMapClick (e){
    e.stopPropagation();

    this.props.showModal(MODAL_TYPE_CONFIRM, {
      title:        'Delete Map',
      displayClose: false,
      confirmText:  'Are you sure you want to delete map?',
      accept:       this.props.hideModal,
      decline:      this.props.hideModal
    });
  }

  handleTouchMove (e){
    e.stopPropagation();
  }

  render() {
    const hideScrollClass = this.props.global.isMobile ? '' : 'hide-scroll';

    return (
      <div className="map-tab-cont d-flex">
        <div className="map-tab-new p-1 f-shrink-0 align-center cursor-pointer" onClick={this.handleNewMapClick}>
          <FontAwesomeIcon icon="plus"/>
        </div>
        <div className={`map-tab-wrap f-grow-1 ${hideScrollClass}`} onTouchMove={this.handleTouchMove}>
          <div className="map-tab is-active p-1 d-inline-flex cursor-pointer">
            <div className="map-tab-name f-grow-1 one-line-ellipsis">地図ちぇっくんぐごよおおおお</div>
            <div className="map-tab-btn pr-1 pl-1" onClick={this.handleEditMapClick}>
              <FontAwesomeIcon icon="pen-square"/>
            </div>
            <div className="map-tab-btn pr-1 pl-1" onClick={this.handleRemoveMapClick}>
              <FontAwesomeIcon icon="window-close"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapTab);
// export default MapTab;
