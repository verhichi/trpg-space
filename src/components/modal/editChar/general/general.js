import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TwitterPicker } from 'react-color';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

class General extends Component {
  constructor (props){
    super(props);
    this.fileInput = React.createRef();
    this.colorRef = React.createRef();
    this.state = {
      displayColorPicker: false,
      charData: this.props.charList.find((char) => char.charId === this.props.charId).general,
      file: {
        fileSizeError: false,
        fileTypeError: false
      }
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleColorClick = this.handleColorClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handlePrivacyChange = this.handlePrivacyChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleLinkChange = this.handleLinkChange.bind(this);
    this.handleFileRemoveClick = this.handleFileRemoveClick.bind(this);
  }

  componentWillUnmount (){
    document.removeEventListener('click', this.handleOutsideClick);
  }

  componentDidMount (){
    this.props.returnGeneralValue(this.state.charData);
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

  handleLinkChange (e){
    this.setState({ charData: {...this.state.charData, link: e.target.value} }, () => {
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
    const toggleScrollClass = this.props.isMobile ? '' : 'hide-scroll';
    const toggleColorPickerClass = this.state.displayColorPicker ? '' : 'd-none';

    const imageStyle = this.state.charData.image.length === 0
                         ? null
                         : { backgroundImage: `url(${this.state.charData.image})`};

    return (
      <div className={`char-modal f-grow-1 ${toggleActiveClass} ${toggleScrollClass}`}>

        <div className="mb-2">
          <div>Profile Image <span className="font-size-sm text-optional">(optional)</span>:</div>
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

        <div className="mb-2">
          <div>Type <span className="font-size-sm text-danger">(required)</span>:</div>
          <div className="d-flex justify-content-around">
            <label><input className="inp-radio" type="radio" value="ally" checked={this.state.charData.type === 'ally'} onChange={this.handleTypeChange}/>Ally</label>
            <label><input className="inp-radio" type="radio" value="enemy" checked={this.state.charData.type === 'enemy'} onChange={this.handleTypeChange}/>Enemy</label>
          </div>
        </div>

        <div className="mb-2">
          <div>Name <span className="font-size-sm text-danger">(required)</span>:</div>
          <input className="inp w-100" type="text" value={this.state.charData.name} onChange={this.handleNameChange}/>
        </div>

        <div className="mb-2">
          <div>Theme Color <span className="font-size-sm text-danger">(required)</span>:</div>
          <div className="d-flex p-relative w-100" onClick={this.handleColorClick} ref={ this.colorRef }>
            <div className="inp-clr-circle f-shrink-0" style={{background: this.state.charData.color}}></div>
            <div className="pseudo-inp f-grow-1">{this.state.charData.color}</div>
            <div className={`p-absolute t-100 ${toggleColorPickerClass}`}>
              <TwitterPicker color={this.state.charData.color} onChange={this.handleColorChange}/>
            </div>
          </div>
        </div>

        <div className="mb-2">
          <div>Privacy Level <span className="font-size-sm text-danger">(required)</span>:</div>
          <div className="sel-cont char-sel w-100">
            <select value={this.state.charData.privacy} onChange={this.handlePrivacyChange}>
              <option value="0">Display all data</option>
              <option value="1">Only display name</option>
              <option value="2">Hide all data</option>
              <option value="3">Do not share character</option>
            </select>
          </div>
        </div>

        <div className="mb-2">
          <div>External Character sheet link <span className="font-size-sm text-optional">(optional)</span>:</div>
          <input className="inp w-100" type="text" placeholder="http(s)://..." value={this.state.charData.link} onChange={this.handleLinkChange}/>
          {this.state.charData.link.trim().length !== 0 && !/^http(s)?:\/\/.+/.test(this.state.charData.link.trim())
            ? (<div className="text-danger">Link must start with "http(s)://""</div>)
            : null}
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps)(General);
