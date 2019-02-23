import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MODAL_TYPE_NEW_USER } from '../../../constants/constants';
import { lobbyInpJoinLabel, lobbyInpJoinBtnLabel, lobbyInpCreateLabel, lobbyInpCreateBtnLabel, lobbyNameInpModalTitle } from './lobby.i18n';
import { showModal } from '../../../redux/actions/modal';
import { resetState } from '../../../redux/actions/global';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './lobby.scss';

const mapStateToProps = (state) => {
  return { global: state.global };
};

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
      title:        lobbyNameInpModalTitle[this.props.global.lang],
      displayClose: true,
      host:         true,
      redirect:     this.props.history.push.bind(this)
    });
  }

  handleJoinClick (e){
    this.props.showModal(MODAL_TYPE_NEW_USER, {
      title:        lobbyNameInpModalTitle[this.props.global.lang],
      displayClose: true,
      host:         false,
      roomId:       this.state.roomId,
      redirect:     this.props.history.push.bind(this)
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

          <div className="lobby-animate-cont">
            <div className="lobby-inp-cont">
              <div className="lobby-inp-label">{lobbyInpJoinLabel[this.props.global.lang]}</div>
              <div><input className="lobby-inp-field w-100" type="text" onChange={this.handleRoomIdChange}/></div>
              <button className="btn btn-hot w-100 cursor-pointer" disabled={isDisabled} onClick={this.handleJoinClick}>
                <FontAwesomeIcon icon="sign-in-alt"/>
                <div className="btn-text">{lobbyInpJoinBtnLabel[this.props.global.lang]}</div>
              </button>
            </div>
          </div>

          <div className="lobby-animate-cont">
            <div className="lobby-or-cont">or</div>
          </div>

          <div className="lobby-animate-cont">
            <div className="lobby-inp-cont">
              <div className="lobby-inp-label">{lobbyInpCreateLabel[this.props.global.lang]}</div>
              <button className="btn btn-hot w-100 cursor-pointer" onClick={this.handleNewClick}>
                <FontAwesomeIcon icon="tools"/>
                <div className="btn-text">{lobbyInpCreateBtnLabel[this.props.global.lang]}</div>
              </button>
            </div>
          </div>

        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
