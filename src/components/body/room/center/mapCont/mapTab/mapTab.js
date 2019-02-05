import React, { Component } from 'react';
import { connect } from 'react-redux';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './mapTab.scss';

// const mapStateToProps = (state) => {
//   return {
//     mapList: state.mapList;
//   };
// };


// // Redux Map Dispatch To Props
// const mapDispatchToProps = (dispatch) => {
//   return {
//     editMapPosition: (left, top)            => dispatch(editMapPosition(left, top))
//   };
// };

class MapTab extends Component {
  constructor (props){
    super(props);
    this.handleTouchMove = this.handleTouchMove.bind(this);
  }

  handleTouchMove (e){
    e.stopPropagation();
  }

  render() {
    return (
      <div className="map-tab-cont d-flex">
        <div className="map-tab-new p-1 f-shrink-0 align-center cursor-pointer">
          <FontAwesomeIcon icon="plus"/>
        </div>
        <div className="map-tab-wrap f-grow-1 hide-scroll" onTouchMove={this.handleTouchMove}>
          <div className="map-tab p-1 d-inline-flex cursor-pointer">
            <div className="map-tab-name f-grow-1 one-line-ellipsis">地図ちぇっくんぐごよおおおお</div>
            <div className="map-tab-btn pr-1 pl-1">
              <FontAwesomeIcon icon="pen-square"/>
            </div>
            <div className="map-tab-btn pr-1 pl-1">
              <FontAwesomeIcon icon="window-close"/>
            </div>
          </div>
          <div className="map-tab is-active p-1 d-inline-flex cursor-pointer">
            <div className="map-tab-name f-grow-1 one-line-ellipsis">Map Name 2aaaaaaaaaaaa</div>
            <div className="map-tab-btn pr-1 pl-1">
              <FontAwesomeIcon icon="pen-square"/>
            </div>
            <div className="map-tab-btn pr-1 pl-1">
              <FontAwesomeIcon icon="window-close"/>
            </div>
          </div>
          <div className="map-tab p-1 d-inline-flex cursor-pointer">
            <div className="map-tab-name f-grow-1 one-line-ellipsis">Map Name 3</div>
            <div className="map-tab-btn pr-1 pl-1">
              <FontAwesomeIcon icon="pen-square"/>
            </div>
            <div className="map-tab-btn pr-1 pl-1">
              <FontAwesomeIcon icon="window-close"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(MapTab);
export default MapTab;
