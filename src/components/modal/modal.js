import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../redux/actions/action';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './modal.scss';

// Component
import Alert       from './alert/alert';
import Confirm     from './confirm/confirm';
import EditChar    from './editChar/editChar';
import EditUser    from './editUser/editUser';
import NewChar     from './newChar/newChar';
import NewUser     from './NewUser/NewUser';
import Requesting  from './requesting/requesting';
import RoomSetting from './roomSetting/roomSetting';
import UploadImg   from './uploadImg/uploadImg';

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
      alert: <Alert />,
      confirm: <Confirm />,
      editChar: <EditChar charType={'char'}/>,
      editEnemy: <EditChar charType={'enemy'}/>,
      editUser: <EditUser />,
      newChar: <NewChar charType={'char'}/>,
      newEnemy: <NewChar charType={'enemy'}/>,
      newUser: <NewUser />,
      requesting: <Requesting />,
      roomSetting: <RoomSetting />,
      uploadImg: <UploadImg />,
    };

    return (
      <div className={`modal-background w-100 h-100 ${toggleClass}`}>
        <div className="modal-cont d-flex f-dir-col">
          <div className="d-flex font-size-xl mb-3">
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
