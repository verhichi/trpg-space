import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editUser, hideModal } from '../../../redux/actions/action';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './editUser.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    id:           state.id,
    userList:     state.userList,
    modalSetting: state.modalSetting
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    editUser: (userData) => dispatch(editUser(userData)),
    hideModal: () => dispatch(hideModal())
  };
};


class EditUser extends Component {
  constructor (props){
    super(props);
    const user = this.props.userList.find((user) => user.id === this.props.id);
    this.state = { name: user.name };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleNameChange (e){
    this.setState({ name: e.target.value });
  }

  handleButtonClick (e){
    e.preventDefault();
    this.props.editUser({
      id: this.props.id,
      name: this.state.name.trim()
    });
    this.setState({ name: '' });
    this.props.hideModal();
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

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
