import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { addToCharList, hideModal } from '../../../redux/actions/action';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './newChar.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    id:           state.id,
    modalSetting: state.modalSetting
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    addToCharList: (charData) => dispatch(addToCharList(charData)),
    hideModal: () => dispatch(hideModal())
  };
};


class NewChar extends Component {
  constructor (props){
    super(props);
    this.state = {
      name: '',
      maxHp: '',
      curHp: '',
      maxMp: '',
      curMp: ''
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
    const randomNum = uuid.v4();

    this.props.addToCharList({
      charId: randomNum,
      ownerId: this.props.id,
      name: this.state.name.trim(),
      maxHp: this.state.maxHp.trim(),
      curHp: this.state.curHp.trim(),
      maxMp: this.state.maxMp.trim(),
      curMp: this.state.curMp.trim()
    });

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
    const isDisabled = this.state.name.length  === 0 ||
                       this.state.maxHp.length === 0 ||
                       this.state.curHp.length === 0 ||
                       this.state.maxMp.length === 0 ||
                       this.state.curMp.length === 0;

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

export default connect(mapStateToProps, mapDispatchToProps)(NewChar);
