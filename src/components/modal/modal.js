import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../redux/actions/action';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './modal.scss';

// Component
import NewChar from './newChar/newChar';
import EditChar from './editChar/editChar';
import Confirm from './confirm/confirm';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    charList: state.charList,
    modalSetting: state.modalSetting
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return { hideModal: () => dispatch(hideModal()) };
};

class Modal extends Component {
  constructor (props){
    super(props);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  handleCloseClick (){
    this.props.hideModal();
  }

  render() {
    const toggleClass = this.props.modalSetting.show ? 'is-active' : '';

    const modalBody = {
      newChar: <NewChar />,
      editChar: <EditChar />,
      confirm: <Confirm />
    };

    return (
      <div className={`modal-background w-100 h-100 ${toggleClass}`}>
        <div className="modal-cont d-flex f-dir-col">
          <div className="d-flex font-size-xl">
            <div className="f-grow-1 align-center">
              {this.props.modalSetting.modalProp.title}
            </div>
            <div className="cursor-pointer" onClick={this.handleCloseClick}>
              <FontAwesomeIcon icon="times"/>
            </div>
          </div>
          {modalBody[this.props.modalSetting.modalType]}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
