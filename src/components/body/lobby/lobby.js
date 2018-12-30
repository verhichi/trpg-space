import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { showModal, resetState } from '../../../redux/actions/action';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './lobby.scss';

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    resetState: () => dispatch(resetState()),
    showModal: (modalType, modalProp) => dispatch(showModal(modalType, modalProp))
  };
};

class Lobby extends Component {
  constructor (props){
    super(props);
    this.state = { roomId: '' };
    this.handleNewClick = this.handleNewClick.bind(this);
    this.handleJoinClick = this.handleJoinClick.bind(this);
    this.handleRoomIdChange = this.handleRoomIdChange.bind(this);
  }

  componentDidMount (){
    this.props.resetState();
  }

  handleNewClick (e){
    this.props.showModal('requesting', {
      title: '',
      displayClose: false
    });

    axios.get('/newRoomId')
      .then((result) => {
        this.props.showModal('newUser', {
          title:  'Enter Display Name',
          displayClose: true,
          host:   true,
          roomId: result.data.roomId,
          redirect: this.props.history.push.bind(this, `/${result.data.roomId}`)
        });
      });
  }

  handleJoinClick (e){
    axios.get('/checkRoomId', {params: { roomId: this.state.roomId }})
      .then((result) => {
        if (result.data.roomExists){
          this.props.showModal('newUser', {
            title:  'Enter Display Name',
            displayClose: true,
            host:   false,
            roomId: this.state.roomId,
            redirect: this.props.history.push.bind(this, `/${this.state.roomId}`)
          });
        } else {
          this.props.showModal('alert', {
            title: '',
            displayClose: false,
            alertText: `Room ID "${this.state.roomId}" does not exist.`
          });
        }
      });
  }

  handleRoomIdChange (e){
    this.setState({ roomId: e.target.value });
  }

  render() {
    return (
      <div className="lobby-cont h-100">

        <div>
          <div className="lobby-inp-cont w-100">
            <div className="lobby-inp-label">Enter Room ID to join:</div>
            <div><input className="lobby-inp-field w-100" type="tel" onChange={this.handleRoomIdChange}/></div>
            <button className="btn btn-hot w-100 cursor-pointer" onClick={this.handleJoinClick}>
              <FontAwesomeIcon icon="sign-in-alt"/>
              <div className="btn-text">Join Existing Room</div>
            </button>
          </div>

          <div className="align-center">or</div>

          <div className="lobby-inp-cont w-100">
            <div className="lobby-inp-label">Click here to start your own Room:</div>
            <button className="btn btn-hot w-100 cursor-pointer" onClick={this.handleNewClick}>
              <FontAwesomeIcon icon="tools"/>
              <div className="btn-text">Start New Room</div>
            </button>
            </div>
        </div>

      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Lobby);
