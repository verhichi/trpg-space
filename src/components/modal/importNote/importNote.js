import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { hideModal } from '../../../redux/actions/modal';
import { addNote } from '../../../redux/actions/note';
import socket from '../../../socket/socketClient';
import { fileInpLabel, fileTypeError, fileContError, submitBtnLabel, titleInpLabel, sharedNotesInpLabel } from './importNote.i18n';
import jszip from 'jszip';


// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './importNote.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { global: state.global };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    addNote:   (noteData) => dispatch(addNote(noteData)),
    hideModal: ()         => dispatch(hideModal())
  };
};


class ImportNote extends Component {
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
      noteData:      null
    };

    this.handleFile        = this.handleFile.bind(this);
    this.handleFileChange  = this.handleFileChange.bind(this);
    this.handleDrop        = this.handleDrop.bind(this);
    this.handleDragOver    = this.handleDragOver.bind(this);
    this.handleDragLeave   = this.handleDragLeave.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.validateNoteData  = this.validateNoteData.bind(this);
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
      .then(noteData => {
        this.setState({
          fileContError: !this.validateNoteData(noteData)
        }, () => {
          if (!this.state.fileTypeError && !this.state.fileContError){
            this.setState({ noteData: JSON.parse(noteData) });
          } else {
            this.setState({ noteData: null });
          }
        });
      })
      .catch(() => {
        this.setState({ fileTypeError: true })
      })
  }

  validateNoteData (objStr){
    try {
      var noteData = JSON.parse(objStr)
    } catch (err){
      return false;
    }

    if (!(noteData.hasOwnProperty('noteId') && typeof noteData['noteId'] === 'string')){
      return false;
    }

    if (!(noteData.hasOwnProperty('ownerId') && typeof noteData['ownerId'] === 'string')){
      return false;
    }

    if (!(noteData.hasOwnProperty('title') && typeof noteData['title'] === 'string')){
      return false;
    }

    if (!(noteData.hasOwnProperty('text') && typeof noteData['text'] === 'string')){
      return false;
    }

    return true
  }

  handleSubmitClick (e){
    if (!this.state.submitted){
      this.setState({ submitted: true });

      const noteData = {
        ...this.state.noteData,
        noteId:  uuid.v4(),
        ownerId: this.props.global.id,
      };

      this.props.addNote(noteData);
      socket.emit('note', this.props.global.roomId, noteData);

      this.props.hideModal();
    }
  }

  render() {
    const dragOverClass = this.state.isDragOver ? 'is-dragover' : '';
    const isDisabled    = !this.state.fileExist || this.state.fileTypeError || this.state.fileContError || this.state.submitted;

    return (
      <div className="d-flex f-dir-col f-grow-1">
        <div className="d-flex f-dir-col f-grow-1 font-size-lg">
          <div>{fileInpLabel[this.props.global.lang]}:</div>
          <label class={`inp-file-cont d-flex w-100 cursor-pointer ${dragOverClass}`} onDragOver={this.handleDragOver} onDragLeave={this.handleDragLeave} onDrop={this.handleDrop}>
            <FontAwesomeIcon icon="upload"/>
            <div className="one-line-ellipsis f-grow-1 pl-3">{this.state.fileName.length === 0 ? 'Choose or Drag a Note File...' : this.state.fileName}</div>
            <input id="imageInput" className="d-none" type="file" accept=".zip" ref={this.fileInput} onChange={this.handleFileChange}/>
          </label>
          {this.state.fileTypeError && (<div className="text-danger">{fileTypeError[this.props.global.lang]}</div>)}
          {this.state.fileContError && (<div className="text-danger">{fileContError[this.props.global.lang]}</div>)}

          { this.state.noteData !== null
            && (<div className="f-grow-1 d-flex f-dir-col">
              <div className="mt-2 mb-2">
                <div>{titleInpLabel[this.props.global.lang]}:</div>
                <div className="one-line-ellipsis font-size-xl font-weight-bold mb-1">{ this.state.noteData.title }</div>
              </div>

              <div className="mb-2 d-flex f-dir-col f-grow-1">
                <div className="font-size-lg">{sharedNotesInpLabel[this.props.global.lang]}:</div>
                <div className="note-text-preview f-grow-1" dangerouslySetInnerHTML={{ __html: this.state.noteData.text }}></div>
              </div>
            </div>
          )}
        </div>

        <button className="btn btn-hot cursor-pointer" disabled={isDisabled} onClick={this.handleSubmitClick}>
          <span class="mr-3"><FontAwesomeIcon icon="check"/></span>
          {submitBtnLabel[this.props.global.lang]}
        </button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportNote);
