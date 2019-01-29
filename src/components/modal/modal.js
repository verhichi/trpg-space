import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MODAL_TYPE_ALERT, MODAL_TYPE_CONFIRM, MODAL_TYPE_EDIT_CHAR, MODAL_TYPE_EDIT_USER, MODAL_TYPE_IMAGE, MODAL_TYPE_NEW_CHAR, MODAL_TYPE_NEW_USER, MODAL_TYPE_NOTES, MODAL_TYPE_REQUESTING, MODAL_TYPE_ROOM_SETTING, MODAL_TYPE_UPLOAD_IMG, MODAL_TYPE_VIEW_CHAR } from '../../constants/constants';
import { hideModal } from '../../redux/actions/modal';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './modal.scss';

// Component
import Alert       from './alert/alert';
import Confirm     from './confirm/confirm';
import EditChar    from './editChar/editChar';
import EditUser    from './editUser/editUser';
import Image       from './image/image';
import NewChar     from './newChar/newChar';
import NewUser     from './newUser/newUser';
import Notes       from './notes/notes';
import Requesting  from './requesting/requesting';
import RoomSetting from './roomSetting/roomSetting';
import UploadImg   from './uploadImg/uploadImg';
import ViewChar    from './viewChar/viewChar';

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
    const toggleClass = this.props.modalSetting.display ? 'is-active' : '';

    const modalBody = {
      [MODAL_TYPE_ALERT]:        <Alert />,
      [MODAL_TYPE_CONFIRM]:      <Confirm />,
      [MODAL_TYPE_EDIT_CHAR]:    <EditChar />,
      [MODAL_TYPE_EDIT_USER]:    <EditUser />,
      [MODAL_TYPE_IMAGE]:        <Image />,
      [MODAL_TYPE_NEW_CHAR]:     <NewChar />,
      [MODAL_TYPE_NEW_USER]:     <NewUser />,
      [MODAL_TYPE_NOTES]:        <Notes />,
      [MODAL_TYPE_REQUESTING]:   <Requesting />,
      [MODAL_TYPE_ROOM_SETTING]: <RoomSetting />,
      [MODAL_TYPE_UPLOAD_IMG]:   <UploadImg />,
      [MODAL_TYPE_VIEW_CHAR]:    <ViewChar />
    };

    return (
      <div className={`modal-background w-100 h-100 ${toggleClass}`}>
        <div className="modal-cont d-flex f-dir-col">
          <div className="d-flex font-size-xl pb-3">
            <div className="f-grow-1 align-center">
              {this.props.modalSetting.modalProp.title}
            </div>
            {this.props.modalSetting.modalProp.displayClose
              ? (<div className="cursor-pointer" onClick={this.handleCloseClick}>
                   <FontAwesomeIcon icon="times"/>
                 </div>)
              : null}
          </div>
          {modalBody[this.props.modalSetting.modalType]}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
