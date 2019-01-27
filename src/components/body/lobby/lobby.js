import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MODAL_TYPE_NEW_USER } from '../../../constants/constants';
import { showModal, resetState } from '../../../redux/actions/action';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './lobby.scss';

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    resetState: ()                     => dispatch(resetState()),
    showModal:  (modalType, modalProp) => dispatch(showModal(modalType, modalProp))
  };
};

class Lobby extends Component {
  constructor (props){
    super(props);
    this.state = { roomId: '' };

    this.handleNewClick     = this.handleNewClick.bind(this);
    this.handleJoinClick    = this.handleJoinClick.bind(this);
    this.handleRoomIdChange = this.handleRoomIdChange.bind(this);
  }

  componentDidMount (){
    this.props.resetState();
  }

  handleNewClick (e){

    this.props.showModal(MODAL_TYPE_NEW_USER, {
      title:  'Enter Display Name',
      displayClose: true,
      host: true,
      redirect: this.props.history.push.bind(this)
    });

  }

  handleJoinClick (e){
    this.props.showModal(MODAL_TYPE_NEW_USER, {
      title:  'Enter Display Name',
      displayClose: true,
      host:   false,
      roomId: this.state.roomId,
      redirect: this.props.history.push.bind(this)
    });
  }

  handleRoomIdChange (e){
    this.setState({ roomId: e.target.value.trim() });
  }

  render() {
    const isDisabled = this.state.roomId.trim().length === 0;

    return (
      <div className="lobby-cont h-100">

        <div>
          <div className="lobby-inp-cont w-100">
            <div className="lobby-inp-label">Enter Room ID to join:</div>
            <div><input className="lobby-inp-field w-100" type="tel" onChange={this.handleRoomIdChange}/></div>
            <button className="btn btn-hot w-100 cursor-pointer" disabled={isDisabled} onClick={this.handleJoinClick}>
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
