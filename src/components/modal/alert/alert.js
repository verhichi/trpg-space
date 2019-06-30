import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../../redux/actions/modal';
import { okBtnLabel } from './alert.i18n';

// Style
import './alert.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    global:       state.global,
    modalSetting: state.modalSetting
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return { hideModal: () => dispatch(hideModal()) };
};


class Alert extends Component {
  constructor (props){
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick (e){
    this.props.hideModal();
  }

  render() {
    return(
      <div className="d-flex f-dir-col f-grow-1 justify-content-between">
        <div className="align-center font-size-xxl mb-3 pb-3">{this.props.modalSetting.modalProp.alertText}</div>
        <div className="d-flex justify-content-around">
          <button className="btn btn-danger w-100 cursor-pointer" onClick={this.handleButtonClick}>
            {okBtnLabel[this.props.global.lang]}
          </button>
        </div>
      </div>
    );
  }
}

// export default Confirm;
export default connect(mapStateToProps, mapDispatchToProps)(Alert);
