import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../../redux/actions/action';

// Style
import './confirm.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { modalSetting: state.modalSetting };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return { hideModal: () => dispatch(hideModal()) };
};


class Confirm extends Component {
  constructor (props){
    super(props);
    this.handleAcceptClick = this.handleAcceptClick.bind(this);
    this.handleDeclineClick = this.handleDeclineClick.bind(this);
  }

  handleAcceptClick (e){
    this.props.modalSetting.modalProp.accept();
    this.props.hideModal();
  }

  handleDeclineClick (e){
    this.props.modalSetting.modalProp.decline();
  }

  render() {
    return(
      <div className="d-flex f-dir-col f-grow-1">
        <div className="align-center font-size-xxl mb-3 pb-3">{this.props.modalSetting.modalProp.confirmText}</div>
        <div className="d-flex justify-content-around">
          <button className="confirm-btn btn btn-danger cursor-pointer" onClick={this.handleDeclineClick}>
            <div className="btn-text">No</div>
          </button>
          <button className="confirm-btn btn btn-hot cursor-pointer" onClick={this.handleAcceptClick}>
            <div className="btn-text">Yes</div>
          </button>
        </div>
      </div>
    );
  }
}

// export default Confirm;
export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
