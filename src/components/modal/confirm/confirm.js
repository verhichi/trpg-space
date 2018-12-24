import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { editChar, hideModal } from '../../../redux/actions/action';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './confirm.scss';

// // Redux Map State To Prop
// const mapStateToProps = (state) => {
//   return {
//     id:           state.id,
//     charList:     state.charList,
//     modalSetting: state.modalSetting
//   };
// };
//
// // Redux Map Dispatch To Props
// const mapDispatchToProps = (dispatch) => {
//   return {
//     editChar: (charData) => dispatch(editChar(charData)),
//     hideModal: () => dispatch(hideModal())
//   };
// };


class Confirm extends Component {

  render() {
    return(
      <div className="d-flex f-dir-col f-grow-1">
        <div className="align-center font-size-xxl mb-3 pb-3">Are you sure you want to ###?</div>
        <div className="d-flex justify-content-around">
          <button className="confirm-btn btn btn-danger cursor-pointer">
            <div className="btn-text">No</div>
          </button>
          <button className="confirm-btn btn btn-hot cursor-pointer">
            <div className="btn-text">Yes</div>
          </button>
        </div>
      </div>
    );
  }
}

export default Confirm;
// export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
