import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ChromePicker } from 'react-color';
import { editChar, hideModal } from '../../../redux/actions/action';
import socket from '../../../socket/socketClient';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './editChar.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    isMobile:     state.isMobile,
    id:           state.id,
    roomId:       state.roomId,
    charList:     state.charList,
    modalSetting: state.modalSetting
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    hideModal: () => dispatch(hideModal()),
    editChar: (charData) => dispatch(editChar(charData)),
  };
};


class EditChar extends Component {
  constructor (props){
    super(props);

    const char = this.props.charList.find((char) => char.charId === this.props.modalSetting.modalProp.charId);

    this.state = {
      displayColorPicker: false,
      charData: {
        name:  char.name,
        type:  char.type,
        color: char.color,
        maxHp: char.maxHp,
        curHp: char.curHp,
        maxMp: char.maxMp,
        curMp: char.curMp
      }
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleMaxHpChange = this.handleMaxHpChange.bind(this);
    this.handleCurHpChange = this.handleCurHpChange.bind(this);
    this.handleMaxMpChange = this.handleMaxMpChange.bind(this);
    this.handleCurMpChange = this.handleCurMpChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleColorClick = this.handleColorClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  componentWillUnmount (){
    window.removeEventListener('click', this.handleOutsideClick, false);
  }

  handleNameChange (e){
    this.setState({ charData: {
      ...this.state.charData,
      name: e.target.value
    }});
  }

  handleTypeChange (e){
    this.setState({ charData: {
      ...this.state.charData,
      type: e.target.value
    }});
  }


  handleColorChange (color, e){
    this.setState({ charData: {
      ...this.state.charData,
      color: color.hex
    }});
  }

  handleColorClick (e){
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
    window.addEventListener('click', this.handleOutsideClick, false)
  }

  handleOutsideClick (e){
    if (this.colorNode.contains(e.target)) return;

    this.setState({ displayColorPicker: false });
    window.removeEventListener('click', this.handleOutsideClick, false);
  }

  handleMaxHpChange (e){
    this.setState({ charData: {
      ...this.state.charData,
      maxHp: e.target.value
    }});
  }

  handleCurHpChange (e){
    this.setState({ charData: {
      ...this.state.charData,
      curHp: e.target.value
    }});
  }

  handleMaxMpChange (e){
    this.setState({ charData: {
      ...this.state.charData,
      maxMp: e.target.value
    }});
  }

  handleCurMpChange (e){
    this.setState({ charData: {
      ...this.state.charData,
      curMp: e.target.value
    }});
  }

  handleButtonClick (e){
    e.preventDefault();
    const charData = {
      charId: this.props.modalSetting.modalProp.charId,
      name: this.state.charData.name.trim(),
      type: this.state.charData.type.trim(),
      color: this.state.charData.color.trim(),
      maxHp: this.state.charData.maxHp.trim(),
      curHp: this.state.charData.curHp.trim(),
      maxMp: this.state.charData.maxMp.trim(),
      curMp: this.state.charData.curMp.trim()
    };

    this.props.editChar(charData);
    socket.emit('char', this.props.roomId, charData);

    this.setState({
      displayColorPicker: false,
      charData: {
        name: '',
        type: 'ally',
        color: '#e0e0e0',
        maxHp: '',
        curHp: '',
        maxMp: '',
        curMp: ''
      }
    });

    this.props.hideModal();
  }

  render() {
    const isDisabled = this.state.charData.name.trim().length  === 0 ||
                       this.state.charData.type.trim().length === 0  ||
                       this.state.charData.color.trim().length === 0 ||
                       this.state.charData.maxHp.trim().length === 0 ||
                       this.state.charData.curHp.trim().length === 0 ||
                       this.state.charData.maxMp.trim().length === 0 ||
                       this.state.charData.curMp.trim().length === 0;

    const toggleClass = this.props.isMobile ? '' : 'hide-scroll';

    const toggleColorPickerClass = this.state.displayColorPicker ? '' : 'd-none';

    return (
      <div className={`char-modal d-flex f-dir-col f-grow-1 ${toggleClass}`}>
        <div className="f-grow-1 font-size-lg">
          <div className="mb-2">
            <div>Type:</div>
            <div className="d-flex justify-content-around">
              <label><input className="inp-radio" type="radio" value="ally" checked={this.state.charData.type === 'ally'} onChange={this.handleTypeChange}/>Ally</label>
              <label><input className="inp-radio" type="radio" value="enemy" checked={this.state.charData.type === 'enemy'} onChange={this.handleTypeChange}/>Enemy</label>
            </div>
          </div>
          <div className="mb-2">
            <div>Name:</div>
            <input className="inp w-100" type="text" placeholder="Enter character name..." value={this.state.charData.name} onChange={this.handleNameChange}/>
          </div>
          <div className="mb-2">
            <div>Theme Color:</div>
            <div className="d-flex p-relative w-100" onClick={this.handleColorClick} ref={node => this.colorNode = node}>
              <div className="inp-clr-circle f-shrink-0" style={{background: this.state.charData.color}}></div>
              <div className="pseudo-inp f-grow-1">{this.state.charData.color}</div>
              <div className={`p-absolute t-100 ${toggleColorPickerClass}`}>
                <ChromePicker color={this.state.charData.color} disableAlpha={true} onChange={this.handleColorChange}/>
              </div>
            </div>
          </div>
          <div className="mb-2">
            <div>HP:</div>
            <input className="inp stat-inp" type="tel" value={this.state.charData.curHp} onChange={this.handleCurHpChange}/> / <input className="inp stat-inp" type="tel" value={this.state.charData.maxHp} onChange={this.handleMaxHpChange}/>
          </div>
          <div className="mb-2">
            <div>MP:</div>
            <input className="inp stat-inp" type="tel" value={this.state.charData.curMp} onChange={this.handleCurMpChange}/> / <input className="inp stat-inp" type="tel" value={this.state.charData.maxMp} onChange={this.handleMaxMpChange}/>
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
