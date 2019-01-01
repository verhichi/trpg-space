import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../../redux/actions/action';
import socket from '../../../socket/socketClient';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './editChar.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    id:           state.id,
    roomId:       state.roomId,
    charList:     state.charList,
    enemyList:    state.enemyList,
    modalSetting: state.modalSetting
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return { hideModal: () => dispatch(hideModal()) };
};


class EditChar extends Component {
  constructor (props){
    super(props);
    const char = this.props.charType === 'char'
      ? this.props.charList.find((char) => char.charId === this.props.modalSetting.modalProp.charId)
      : this.props.enemyList.find((enemy) => enemy.charId === this.props.modalSetting.modalProp.charId);

    this.state = {
      name: char.name,
      maxHp: char.maxHp,
      curHp: char.curHp,
      maxMp: char.maxMp,
      curMp: char.curMp
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleMaxHpChange = this.handleMaxHpChange.bind(this);
    this.handleCurHpChange = this.handleCurHpChange.bind(this);
    this.handleMaxMpChange = this.handleMaxMpChange.bind(this);
    this.handleCurMpChange = this.handleCurMpChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleNameChange (e){
    this.setState({ name: e.target.value });
  }

  handleMaxHpChange (e){
    this.setState({ maxHp: e.target.value });
  }

  handleCurHpChange (e){
    this.setState({ curHp: e.target.value });
  }

  handleMaxMpChange (e){
    this.setState({ maxMp: e.target.value });
  }

  handleCurMpChange (e){
    this.setState({ curMp: e.target.value });
  }

  handleButtonClick (e){
    e.preventDefault();

    if (this.props.charType === 'char'){
      socket.emit('char', this.props.roomId, {
        charId: this.props.modalSetting.modalProp.charId,
        ownerId: this.props.id,
        name: this.state.name.trim(),
        maxHp: this.state.maxHp.trim(),
        curHp: this.state.curHp.trim(),
        maxMp: this.state.maxMp.trim(),
        curMp: this.state.curMp.trim()
      });
    } else {
      socket.emit('enemy', this.props.roomId, {
        charId: this.props.modalSetting.modalProp.charId,
        ownerId: this.props.id,
        name: this.state.name.trim(),
        maxHp: this.state.maxHp.trim(),
        curHp: this.state.curHp.trim(),
        maxMp: this.state.maxMp.trim(),
        curMp: this.state.curMp.trim()
      });
    }

    this.setState({
      name: '',
      maxHp: '',
      curHp: '',
      maxMp: '',
      curMp: ''
    });

    this.props.hideModal();
  }

  render() {
    const isDisabled = this.state.name.trim().length  === 0 ||
                       this.state.maxHp.trim().length === 0 ||
                       this.state.curHp.trim().length === 0 ||
                       this.state.maxMp.trim().length === 0 ||
                       this.state.curMp.trim().length === 0;

    return (
      <div className="d-flex f-dir-col f-grow-1">
        <div className="f-grow-1 font-size-lg">
          <div className="mb-2">
            <div>Name:</div>
            <input className="inp w-100" type="text" placeholder="Enter character name..." value={this.state.name} onChange={this.handleNameChange}/>
          </div>
          <div className="mb-2">
            <div>HP:</div>
            <input className="inp stat-inp" type="tel" value={this.state.curHp} onChange={this.handleCurHpChange}/> / <input className="inp stat-inp" type="tel" value={this.state.maxHp} onChange={this.handleMaxHpChange}/>
          </div>
          <div className="mb-2">
            <div>MP:</div>
            <input className="inp stat-inp" type="tel" value={this.state.curMp} onChange={this.handleCurMpChange}/> / <input className="inp stat-inp" type="tel" value={this.state.maxMp} onChange={this.handleMaxMpChange}/>
          </div>
        </div>
        <button className="btn btn-hot cursor-pointer" disabled={isDisabled} onClick={this.handleButtonClick}>
          <FontAwesomeIcon icon="check"/>
          <div className="btn-text">Submit</div>
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditChar);
