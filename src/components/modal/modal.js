import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../redux/actions/action';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './modal.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { modalSetting: state.modalSetting };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return { toggleModal: (modalType) => dispatch(toggleModal(modalType)) };
};

class Modal extends Component {
  constructor (props){
    super(props);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  handleCloseClick (){
    this.props.toggleModal();
  }

  render() {
    const toggleClass = this.props.modalSetting.show ? 'is-active' : '';

    return (
      <div className={`modal-background w-100 h-100 ${toggleClass}`}>
        <div className="modal-cont">
          <div className="d-flex font-size-xl">
            <div className="f-grow-1 align-center">
              MODAL TITLE!
            </div>
            <div className="cursor-pointer" onClick={this.handleCloseClick}>
              <FontAwesomeIcon icon="window-close"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
