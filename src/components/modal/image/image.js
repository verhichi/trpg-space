import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../../redux/actions/modal';


// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './image.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { modalSetting: state.modalSetting };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return { hideModal: () => dispatch(hideModal()) };
};


class Image extends Component {
  constructor (props){
    super(props);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  handleCloseClick (){
    this.props.hideModal();
  }

  render() {
    return (
      <div className="h-100 w-100">
        <div className="image-modal-toolbar w-100 font-size-xxl align-right">
          <span className="cursor-pointer" onClick={this.handleCloseClick}>
            <FontAwesomeIcon icon="times"/>
          </span>
        </div>
        <div className="modal-img-cont h-100 w-100 d-flex f-align-items-center justify-content-center overflow-auto">
          <img className="modal-img p-relative" src={this.props.modalSetting.modalProp.src}/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Image);
