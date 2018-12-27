import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { addUser, hideModal, setUserId, setRoomId } from '../../../redux/actions/action';

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
    addUser: (userData) => dispatch(addUser(userData)),
    hideModal: () => dispatch(hideModal()),
    setUserId: (userId) => dispatch(setUserId(userId)),
    setRoomId: (roomId) => dispatch(setRoomId(roomId))
  };
};


class NewUser extends Component {
  constructor (props){
    super(props);
    this.state = { name: '' };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleNameChange (e){
    this.setState({ name: e.target.value });
  }

  handleButtonClick (e){
    e.preventDefault();

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
    this.props.modalSetting.modalProp.redirect();
  }

  render() {
    const isDisabled = this.state.name.trim().length === 0;

    return (
      <div className="d-flex f-dir-col f-grow-1">
        <div className="f-grow-1 font-size-lg">
          <div>Name:</div>
          <input className="inp w-100" type="text" placeholder="Enter username..." value={this.state.name} onChange={this.handleNameChange}/>
        </div>
        <button className="btn btn-hot cursor-pointer" disabled={isDisabled} onClick={this.handleButtonClick}>
          <FontAwesomeIcon icon="check"/>
          <div className="btn-text">Submit</div>
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);
