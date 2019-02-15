import React, { Component } from 'react';
import { connect } from 'react-redux';

// Style
import './noMap.scss';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { global: state.global };
};

class NoMap extends Component {

  render() {
    return (
      <div className="no-map-cont">
        <div className="no-map-help">
          <div className="font-weight-bold">This area is used to display map images.</div>
          <div className="font-weight-bold">Users can place characters on the map and share its position.</div>
          <div className="font-weight-bold pb-1">Maps are separated by tabs, click on the tabs to change maps.</div>
          <div className="pb-2">
            <span className="fa-layers fa-fw">
              <FontAwesomeIcon icon="plus" transform="shrink-8 up-7"/>
              <FontAwesomeIcon icon="map" transform="shrink-3 down-3"/>
            </span>
            to create new map.
          </div>
          <div className="font-weight-bold pb-1">Once map is in view, buttons with the following icon and functionality will be available.</div>
          <div className="pb-1">
            <span className="fa-layers fa-fw">
              <FontAwesomeIcon icon="arrow-down" transform="shrink-9 up-8"/>
              <FontAwesomeIcon icon="street-view" transform="shrink-3 down-3"/>
            </span>
            to place characters onto the map.
          </div>
          <div className="pb-1">
            <span className="fa-layers fa-fw">
              <FontAwesomeIcon icon="times" transform="shrink-9 up-8"/>
              <FontAwesomeIcon icon="street-view" transform="shrink-3 down-3"/>
            </span>
            to remove characters from the map.
          </div>
          <div className="pb-1"><FontAwesomeIcon icon="th"/> to display grid on the map.</div>
          <div className="pb-1"><FontAwesomeIcon icon="external-link-square-alt" transform={{ rotate: -90 }}/> to align map to top-left of the screen.</div>
          <div className="pb-1"><FontAwesomeIcon icon="search"/> (or mouse wheel) to scale the map.</div>
          <div className="pb-1"><FontAwesomeIcon icon="vector-square"/> to place masks that hides areas of the map.</div>

        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(NoMap);
