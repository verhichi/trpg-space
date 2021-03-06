import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../../redux/actions/modal';
import { noBtnLabel, yesBtnLabel } from './confirm.i18n';

// Style
import './confirm.scss';

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


class Confirm extends Component {
  constructor (props){
    super(props);
    this.state = { submitted: false };

    this.handleAcceptClick  = this.handleAcceptClick.bind(this);
    this.handleDeclineClick = this.handleDeclineClick.bind(this);
  }

  handleAcceptClick (e){
    if (!this.state.submitted){
      this.setState({ submitted: true });

      if (this.props.modalSetting.modalProp.accept.constructor === Array){
        this.props.modalSetting.modalProp.accept.forEach((fun) => {
          fun();
        });
      } else {
        this.props.modalSetting.modalProp.accept();
      }
    }
  }

  handleDeclineClick (e){
    this.props.modalSetting.modalProp.decline();
  }

  render() {
    const isDisabled = this.state.submitted;

    return(
      <div className="d-flex f-dir-col f-grow-1 justify-content-between">
        <div className="align-center font-size-xxl mb-3 pb-3">{this.props.modalSetting.modalProp.confirmText}</div>
        <div className="d-flex justify-content-around">
          <button className="confirm-btn btn btn-danger cursor-pointer" onClick={this.handleDeclineClick}>
            {noBtnLabel[this.props.global.lang]}
          </button>
          <button className="confirm-btn btn btn-hot cursor-pointer" onClick={this.handleAcceptClick} disabled={isDisabled}>
            {yesBtnLabel[this.props.global.lang]}
          </button>
        </div>
      </div>
    );
  }
}

// export default Confirm;
export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
