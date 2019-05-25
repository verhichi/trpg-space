import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CHAR_TYPE_ALLY, CHAR_TYPE_ENEMY, CHAR_PRIVACY_LEVEL_ZERO, CHAR_PRIVACY_LEVEL_ONE, CHAR_PRIVACY_LEVEL_TWO, CHAR_PRIVACY_LEVEL_THREE } from '../../../../constants/constants';
import { GithubPicker } from 'react-color';
import { optionalLabel, charImageLabel, charTypeLabel, charTypeAllyLabel, charTypeEnemyLabel, charNameLabel, charColorLabel, charPrivacyLabel, privacyLevelZeroLabel, privacyLevelOneLabel, privacyLevelTwoLabel, privacyLevelThreeLabel } from './general.i18n';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import AppRadio from '../../../partials/appRadio/appRadio'

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { global: state.global };
};


class General extends Component {
  constructor (props){
    super(props);
    this.fileInput = React.createRef();
    this.colorRef = React.createRef();
    this.state = {
      displayColorPicker: false,
      charData: {
        type:    CHAR_TYPE_ALLY,
        name:    '',
        color:   '#ff0000',
        privacy: CHAR_PRIVACY_LEVEL_ZERO,
        image:   '',
      },
      file: {
        fileSizeError: false,
        fileTypeError: false
      }
    };

    this.colorList = [
      '#FFFFFF', '#E4E4E4', '#C0C0C0', '#A0A0A0', '#808080', '#606060', '#404040', '#202020', '#000000',
      '#7F0000', '#7F5000', '#7F7F00', '#007F00', '#007F50', '#007F7F', '#00007F', '#50007F', '#7F007F',
      '#FF0000', '#FFA000', '#FFFF00', '#00FF00', '#00FFA0', '#00FFFF', '#0000FF', '#A000FF', '#FF00FF',
      '#FF7F7F', '#FFCF7F', '#FFFF7F', '#7FFF7F', '#7FFFCF', '#7FFFFF', '#7F7FFF', '#CF7FFF', '#FF7FFF',
    ];

    this.handleNameChange      = this.handleNameChange.bind(this);
    this.handleColorChange     = this.handleColorChange.bind(this);
    this.handleColorClick      = this.handleColorClick.bind(this);
    this.handleOutsideClick    = this.handleOutsideClick.bind(this);
    this.handleTypeChange      = this.handleTypeChange.bind(this);
    this.handlePrivacyChange   = this.handlePrivacyChange.bind(this);
    this.handleFileChange      = this.handleFileChange.bind(this);
    this.handleFileRemoveClick = this.handleFileRemoveClick.bind(this);
  }

  componentDidMount (){
    this.props.returnGeneralValue(this.state.charData);
  }

  componentWillUnmount (){
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

  handleOutsideClick (e){
    if (this.colorRef.current.contains(e.target)) return;
    document.removeEventListener('click', this.handleOutsideClick);
    this.setState({ displayColorPicker: false });
  }

  handleNameChange (e){
    this.setState({ charData: {...this.state.charData, name: e.target.value} }, () => {
      this.props.returnGeneralValue(this.state.charData);
    });
  }

  handleTypeChange (e){
    this.setState({ charData: {...this.state.charData, type: e.target.value} }, () => {
      this.props.returnGeneralValue(this.state.charData);
    });
  }

  handleColorClick (e){
    document.addEventListener('click', this.handleOutsideClick);
    this.setState({ displayColorPicker: true });
  }

  handleColorChange (color, e){
    this.setState({ charData: {...this.state.charData, color: color.hex} }, () => {
      this.props.returnGeneralValue(this.state.charData);
    });
  }

  handlePrivacyChange (e){
    this.setState({ charData: {...this.state.charData, privacy: e.target.value} }, () => {
      this.props.returnGeneralValue(this.state.charData);
    });
  }

  handleFileChange (e){
    e.preventDefault();
    const imagePattern = /\.(jpg|jpeg|png|gif)$/i;
    const file = this.fileInput.current.files[0];
    this.setState({ file: {
      fileTypeError: !imagePattern.test(file.name),
      fileSizeError: file.size > 1000000
    }}, () => {
      if (!(this.state.file.fileTypeError || this.state.file.fileSizeError)){
        const reader = new FileReader();
        reader.readAsDataURL(this.fileInput.current.files[0]);

        reader.onload = () => {
          this.setState({ charData: { ...this.state.charData, image: reader.result } }, () => {
            this.props.returnGeneralValue(this.state.charData);
          });
        };
      }
    });
  }

  handleFileRemoveClick (e){
    this.setState({
      charData: { ...this.state.charData, image: '' },
      file: {
        fileTypeError: false,
        fileSizeError: false
      }
    }, () => {
      this.props.returnGeneralValue(this.state.charData);
    });
  }

  render() {

    const toggleActiveClass = this.props.isActive ? 'is-active' : '';
    const toggleScrollClass = this.props.global.isMobile ? '' : 'hide-scroll';
    const toggleColorPickerClass = this.state.displayColorPicker ? '' : 'd-none';

    const imageStyle = this.state.charData.image.length === 0
                         ? null
                         : { backgroundImage: `url(${this.state.charData.image})`};

    return (
      <div className={`char-modal f-grow-1 ${toggleActiveClass} ${toggleScrollClass}`}>

        <div className="mb-2">
          <div>{charImageLabel[this.props.global.lang]} <span className="font-size-sm text-optional">({optionalLabel[this.props.global.lang]})</span>:</div>
          <div className="d-flex p-relative">
            <label className="profile-circle cursor-pointer p-relative" style={imageStyle}>
              <div className="profile-side-btn align-center p-absolute"><FontAwesomeIcon icon="camera"/></div>
              <input id="imageInput" className="d-none" type="file" accept="image/*" ref={this.fileInput} onChange={this.handleFileChange}/>
            </label>
            <div className="profile-remove-btn p-absolute align-center cursor-pointer" onClick={this.handleFileRemoveClick}><FontAwesomeIcon icon="trash"/></div>
          </div>
          {this.state.file.fileTypeError
            ? (<div className="text-danger">File must be in jpg/png/gif format</div>)
            : null}
          {this.state.file.fileSizeError
            ? (<div className="text-danger">File must be smaller than 1MB</div>)
            : null}
        </div>

        <div className="mb-2 d-flex">
          <div className="char-inp-label pr-1">{charNameLabel[this.props.global.lang]}:</div>
          <input className="inp f-grow-1" type="text" value={this.state.charData.name} onChange={this.handleNameChange}/>
        </div>

        <div className="mb-2 d-flex">
          <div className="char-inp-label pr-1">{charTypeLabel[this.props.global.lang]}:</div>
          <AppRadio id={'char_type_ally'} className={'mr-1'} value={CHAR_TYPE_ALLY} checked={this.state.charData.type === CHAR_TYPE_ALLY} handleChange={this.handleTypeChange} label={charTypeAllyLabel[this.props.global.lang]}/>
          <AppRadio id={'char_type_enemy'} value={CHAR_TYPE_ENEMY} checked={this.state.charData.type === CHAR_TYPE_ENEMY} handleChange={this.handleTypeChange} label={charTypeEnemyLabel[this.props.global.lang]}/>
        </div>

        <div className="mb-2 d-flex">
          <div className="char-inp-label pr-1">{charColorLabel[this.props.global.lang]}:</div>
          <div className="d-flex p-relative f-grow-1" onClick={this.handleColorClick} ref={ this.colorRef }>
            <div className="inp-clr-circle f-shrink-0" style={{background: this.state.charData.color}}></div>
            <div className="pseudo-inp f-grow-1">{this.state.charData.color}</div>
            <div className={`p-absolute t-100 ${toggleColorPickerClass}`}>
              <GithubPicker color={this.state.charData.color} colors={this.colorList} onChange={this.handleColorChange} triangle={'hide'} width={240}/>
            </div>
          </div>
        </div>

        <div className="mb-2 d-flex">
          <div className="char-inp-label pr-1">{charPrivacyLabel[this.props.global.lang]}:</div>
          <div className="sel-cont char-sel f-grow-1">
            <select value={this.state.charData.privacy} onChange={this.handlePrivacyChange}>
              <option value={CHAR_PRIVACY_LEVEL_ZERO}>{privacyLevelZeroLabel[this.props.global.lang]}</option>
              <option value={CHAR_PRIVACY_LEVEL_ONE}>{privacyLevelOneLabel[this.props.global.lang]}</option>
              <option value={CHAR_PRIVACY_LEVEL_TWO}>{privacyLevelTwoLabel[this.props.global.lang]}</option>
              <option value={CHAR_PRIVACY_LEVEL_THREE}>{privacyLevelThreeLabel[this.props.global.lang]}</option>
            </select>
          </div>
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps)(General);
