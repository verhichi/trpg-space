import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { MODAL_TYPE_ALERT, MODAL_TYPE_REQUESTING } from '../../../constants/constants';
import { addUser, showModal, hideModal, setUserId, setRoomId } from '../../../redux/actions/action';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './newUser.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    modalSetting: state.modalSetting
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    addUser:   (userData)             => dispatch(addUser(userData)),
    hideModal: ()                     => dispatch(hideModal()),
    showModal: (modalType, modalProp) => dispatch(showModal(modalType, modalProp)),
    setUserId: (userId)               => dispatch(setUserId(userId)),
    setRoomId: (roomId)               => dispatch(setRoomId(roomId))
  };
};


class NewUser extends Component {
  constructor (props){
    super(props);
    this.nameRef = React.createRef();
    this.state = { name: '' };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount (){
    this.nameRef.current.focus();
  }

  handleNameChange (e){
    this.setState({ name: e.target.value });
  }

  handleSubmit (e){
    e.preventDefault();

    this.props.showModal(MODAL_TYPE_REQUESTING, {
      title: '',
      displayClose: false
    });

    if (this.props.modalSetting.modalProp.host){
      axios.get('/newRoomId')
        .then((result) => {
          const id = uuid.v4();
          this.props.setUserId(id);
          this.props.setRoomId(result.data.roomId);

          this.props.addUser({
            id: id,
            name: this.state.name.trim(),
            host: this.props.modalSetting.modalProp.host
          });

          this.setState({ name: '' });
          this.props.hideModal();
          this.props.modalSetting.modalProp.redirect(`/${result.data.roomId}`);
        });
    } else {
      axios.get('/checkRoomId', {params: { roomId: this.props.modalSetting.modalProp.roomId }})
        .then((result) => {
          if (result.data.roomExists){
            const id = uuid.v4();
            this.props.setUserId(id);
            this.props.setRoomId(this.props.modalSetting.modalProp.roomId);

            this.props.addUser({
              id: id,
              name: this.state.name.trim(),
              host: this.props.modalSetting.modalProp.host
            });

            this.setState({ name: '' });
            this.props.hideModal();
            this.props.modalSetting.modalProp.redirect(`/${this.props.modalSetting.modalProp.roomId}`);
          } else {
            this.props.showModal(MODAL_TYPE_ALERT, {
              title: '',
              displayClose: false,
              alertText: `Room ID "${this.props.modalSetting.modalProp.roomId}" does not exist.`
            });
          }
        });
    }

  }

  render() {
    const isDisabled = this.state.name.trim().length === 0;

    return (
      <form className="d-flex f-dir-col f-grow-1" onSubmit={this.handleSubmit}>
        <div className="f-grow-1 font-size-lg">
          <div>Name:</div>
          <input className="inp w-100" type="text" placeholder="Enter username..." value={this.state.name} onChange={this.handleNameChange} ref={this.nameRef}/>
        </div>
        <button type="submit" className="btn btn-hot cursor-pointer" disabled={isDisabled}>
          <FontAwesomeIcon icon="check"/>
          <div className="btn-text">Submit</div>
        </button>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);
