import React, { Component } from 'react';
import { connect } from 'react-redux';

// Style
import './image.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { modalSetting: state.modalSetting };
};

class Image extends Component {
  render() {
    return (
      <div className="d-flex f-dir-col f-grow-1">
        <div className="modal-img-cont">
          <img className="modal-img" src={this.props.modalSetting.modalProp.src}/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Image);
