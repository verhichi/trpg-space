import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../../redux/actions/modal';
import { editUser } from '../../../redux/actions/user';
import socket from '../../../socket/socketClient';
import { editUserHelpText, displayNameInpLabel, submitBtnLabel } from './editUser.i18n';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './editUser.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    global:       state.global,
    userList:     state.userList,
    modalSetting: state.modalSetting
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    editUser:  (userData) => dispatch(editUser(userData)),
    hideModal: ()         => dispatch(hideModal())
  };
};


class EditUser extends Component {
  constructor (props){
    super(props);
    this.nameRef = React.createRef();
    const user = this.props.userList.find((user) => user.id === this.props.global.id);
    this.state = {
      name:      user.name,
      submitted: false
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit     = this.handleSubmit.bind(this);
  }

  componentDidMount (){
    this.nameRef.current.focus();
  }

  handleNameChange (e){
    this.setState({ name: e.target.value });
  }

  handleSubmit (e){
    e.preventDefault();

    if (!this.state.submitted){
      this.setState({ submitted: true });
      
      this.props.editUser({
        id: this.props.global.id,
        name: this.state.name.trim()
      });

      socket.emit('user', this.props.global.roomId, {
        id: this.props.global.id,
        name: this.state.name.trim()
      });

      this.setState({ name: '' });
      this.props.hideModal();
    }
  }

  render() {
    const isDisabled = this.state.name.trim().length === 0 || this.state.submitted;

    return (
      <form className="d-flex f-dir-col f-grow-1" onSubmit={this.handleSubmit}>
        <div className="pb-2">
          {editUserHelpText[this.props.global.lang]}
        </div>
        <div className="f-grow-1 font-size-lg">
          <div>{displayNameInpLabel[this.props.global.lang]}</div>
          <input className="inp w-100" type="text" placeholder="Enter name..." value={this.state.name} onChange={this.handleNameChange} ref={this.nameRef}/>
        </div>
        <button type="submit" className="btn btn-hot cursor-pointer" disabled={isDisabled}>
          <FontAwesomeIcon icon="check"/>
          <div className="btn-text">{submitBtnLabel[this.props.global.lang]}</div>
        </button>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
