import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { hideModal } from '../../../redux/actions/modal';
import { addChar } from '../../../redux/actions/char';
import socket from '../../../socket/socketClient';
import { CHAR_PRIVACY_LEVEL_ZERO, CHAR_PRIVACY_LEVEL_ONE, CHAR_PRIVACY_LEVEL_TWO, CHAR_PRIVACY_LEVEL_THREE, CHAR_TYPE_ALLY, CHAR_TYPE_ENEMY } from '../../../constants/constants';
import { fileInpLabel, fileTypeError, fileContError, submitBtnLabel, charImageLabel, charTypeLabel, charTypeAllyLabel, charTypeEnemyLabel, charNameLabel, charPrivacyLabel, privacyLevelZeroLabel, privacyLevelOneLabel, privacyLevelTwoLabel, privacyLevelThreeLabel } from './importChar.i18n';
import jszip from 'jszip';


// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './importChar.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { global: state.global };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    addChar:   (charData) => dispatch(addChar(charData)),
    hideModal: ()         => dispatch(hideModal())
  };
};


class ImportChar extends Component {
  constructor (props){
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      submitted:     false,
      fileExist:     false,
      fileTypeError: false,
      fileContError: false,
      fileName:      '',
      isDragOver:    false,
      charData:      null
    };

    this.handleFile        = this.handleFile.bind(this);
    this.handleFileChange  = this.handleFileChange.bind(this);
    this.handleDrop        = this.handleDrop.bind(this);
    this.handleDragOver    = this.handleDragOver.bind(this);
    this.handleDragLeave   = this.handleDragLeave.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.validateCharData  = this.validateCharData.bind(this);
  }

  handleFileChange (e){
    e.preventDefault();

    this.handleFile(this.fileInput.current.files[0]);
  }

  handleDragOver (e){
    e.preventDefault();
    e.stopPropagation();

    if (!this.state.isDragOver){
      this.setState({ isDragOver: true });
    }
  }

  handleDragLeave (e){
    e.preventDefault();
    e.stopPropagation();

    this.setState({ isDragOver: false });
  }

  handleDrop (e){
    e.preventDefault();
    e.stopPropagation();

    this.setState({ isDragOver: false });
    if (e.dataTransfer.items){
      for (let file of e.dataTransfer.items){
        if (file.kind === 'file' && file.type === 'application/x-zip-compressed'){
          this.handleFile(file.getAsFile());
          break;
        }
      }
    }
  }

  handleFile (zipFile){
    jszip
      .loadAsync(zipFile)
      .then(content => {
        const file = content.files[Object.keys(content.files)[0]];
        this.setState({
          fileExist: file.name.length !== 0,
          fileTypeError: !/\.json$/i.test(file.name),
          fileName: zipFile.name
        })
        return file.async('string')
      })
      .then(charData => {
        this.setState({
           fileContError: !this.validateCharData(charData)
         }, () => {
          if (!this.state.fileTypeError && !this.state.fileContError){
            this.setState({ charData: JSON.parse(charData) });
          } else {
            this.setState({ charData: null });
          }
        });
      })
      .catch(() => {
        this.setState({ fileTypeError: true })
      })
  }

  validateCharData (objStr){
    try {
      var charData = JSON.parse(objStr)
    } catch (err){
      return false;
    }

    if (!(charData.hasOwnProperty('charId') && typeof charData['charId'] === 'string')){
      return false;
    }

    if (!(charData.hasOwnProperty('ownerId') && typeof charData['ownerId'] === 'string')){
      return false;
    }

    if (!(charData.hasOwnProperty('general') && typeof charData['general'] === 'object')){
      return false;
    }

    if (!(charData.hasOwnProperty('status') && charData['status'].constructor === Array)){
      return false;
    }

    if (!(charData.hasOwnProperty('detail') && charData['detail'].constructor === Array)){
      return false;
    }

    return true
  }

  handleSubmitClick (e){
    if (!this.state.submitted){
      this.setState({ submitted: true });

      const charData = {
        ...this.state.charData,
        charId:  uuid.v4(),
        ownerId: this.props.global.id,
      };

      this.props.addChar(charData);

      if (this.state.charData.general.privacy !== CHAR_PRIVACY_LEVEL_THREE){
        socket.emit('char', this.props.global.roomId, charData);
      }

      this.props.hideModal();
    }
  }

  render() {
    const dragOverClass = this.state.isDragOver ? 'is-dragover' : '';
    const isDisabled    = !this.state.fileExist || this.state.fileTypeError || this.state.fileContError || this.state.submitted;

    const privacyText = {
      [CHAR_PRIVACY_LEVEL_ZERO]:  privacyLevelZeroLabel[this.props.global.lang],
      [CHAR_PRIVACY_LEVEL_ONE]:   privacyLevelOneLabel[this.props.global.lang],
      [CHAR_PRIVACY_LEVEL_TWO]:   privacyLevelTwoLabel[this.props.global.lang],
      [CHAR_PRIVACY_LEVEL_THREE]: privacyLevelThreeLabel[this.props.global.lang]
    };

    const typeText = {
      [CHAR_TYPE_ALLY]:  charTypeAllyLabel[this.props.global.lang],
      [CHAR_TYPE_ENEMY]: charTypeEnemyLabel[this.props.global.lang]
    };

    const imageStyle = this.state.charData
                         ? this.state.charData.general.image.length === 0
                             ? null
                             : { backgroundImage: `url(${this.state.charData.general.image})`}
                         : null;

    return (
      <div className="d-flex f-dir-col f-grow-1">
        <div className="f-grow-1 font-size-lg">
          <div>{fileInpLabel[this.props.global.lang]}:</div>
          <label className={`inp-file-cont d-flex w-100 cursor-pointer ${dragOverClass}`} onDragOver={this.handleDragOver} onDragLeave={this.handleDragLeave} onDrop={this.handleDrop}>
            <FontAwesomeIcon icon="upload"/>
            <div className="one-line-ellipsis f-grow-1 pl-3">{this.state.fileName.length === 0 ? 'Choose or Drag a Character File...' : this.state.fileName}</div>
            <input id="imageInput" className="d-none" type="file" accept=".zip" ref={this.fileInput} onChange={this.handleFileChange}/>
          </label>
          {this.state.fileTypeError && (<div className="text-danger">{fileTypeError[this.props.global.lang]}</div>)}
          {this.state.fileContError && (<div className="text-danger">{fileContError[this.props.global.lang]}</div>)}

          { this.state.charData !== null
            && (<Fragment>
              <div className="mt-2 mb-2">
                <div>{charImageLabel[this.props.global.lang]}:</div>
                <div className="profile-circle d-inline-block" style={imageStyle}></div>
              </div>

              <div className="mb-2 font-size-lg">
                <div>{charNameLabel[this.props.global.lang]}:</div>
                <div className="pl-2">{this.state.charData.general.name}</div>
              </div>

              <div className="mb-2 font-size-lg">
                <div>{charTypeLabel[this.props.global.lang]}:</div>
                <div className="pl-2">{typeText[this.state.charData.general.type]}</div>
              </div>

              <div className="mb-2 font-size-lg">
                <div>{charPrivacyLabel[this.props.global.lang]}:</div>
                <div className="pl-2">{privacyText[this.state.charData.general.privacy]}</div>
              </div>
            </Fragment>
          )}
        </div>

        <button className="btn btn-hot cursor-pointer" disabled={isDisabled} onClick={this.handleSubmitClick}>
          <span className="mr-3"><FontAwesomeIcon icon="check"/></span>
          {submitBtnLabel[this.props.global.lang]}
        </button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportChar);
