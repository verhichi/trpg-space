import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import socket from '../../../../../../../socket/socketClient';

// Style
import './geo.scss';

// // Redux Map State To Prop
// const mapStateToProps = (state) => {
//   return { global: state.global };
// };

// const mapDispatchToProps = (dispatch) => {
//   return { editMapChar: (mapCharData) => dispatch(editMapChar(mapCharData)) };
// }

class Geo extends Component {
  constructor (props){
    super(props);
    this.state = {
      selected: false,
      editable: false
    }

    this.handleMouseDown  = this.handleMouseDown.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleClick      = this.handleClick.bind(this);
  }

  handleClick (e){
    e.preventDefault();
    e.stopPropagation();

    this.state.selected
      ? this.setState({ selected: false })
      : this.setState({ selected: true });
  }

  handleMouseDown (e){
    e.preventDefault();
    e.stopPropagation();
  }

  handleTouchStart (e){
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    const selectedClass = this.state.selected ? 'is-selected' : '';

    return (
      <div className={`map-geo d-block p-absolute ${selectedClass}`} onClick={this.handleClick} onMouseDown={this.handleMouseDown} onTouchStart={this.handleTouchStart} style={{left: this.props.geoData.left, top: this.props.geoData.top, width: this.props.geoData.width, height: this.props.geoData.height}}>
      </div>
    );
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(Geo);
export default Geo;
