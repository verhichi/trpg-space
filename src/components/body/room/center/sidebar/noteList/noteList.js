import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { MODAL_TYPE_ADD_NOTE, MODAL_TYPE_IMPORT_NOTE } from '../../../../../../constants/constants';
import { showModal } from '../../../../../../redux/actions/modal';
import { reorderNote } from '../../../../../../redux/actions/note';
import { noteEditBtnLabel, sharedNotesLabel } from './noteList.i18n';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './noteList.scss';

// Component
import Note from './note/note';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';


// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    global:   state.global,
    noteList: state.noteList
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    showModal: (modalType, modalProp) => dispatch(showModal(modalType, modalProp)),
    reorderNote: ({oldIndex, newIndex}) => dispatch(reorderNote(oldIndex, newIndex))
  };
};

const SortableItem = SortableElement(({value}) => <Note noteData={value}/>);
const SortableList = SortableContainer(({items}) => {
  return (
    <div className="note-list-cont">
      {items.filter((value, index) => !(value === undefined || index === undefined)).map((value, index) => {
        return <SortableItem key={value.noteId} index={index} value={value}/>;
      })}
    </div>
  );
});

class NoteList extends Component {
  constructor (props){
    super(props);

    this.handleNewClick = this.handleNewClick.bind(this);
    this.handleImportClick = this.handleImportClick.bind(this);
  }

  handleNewClick (e){
    this.props.showModal(MODAL_TYPE_ADD_NOTE, {
      title:        'Create New Note',
      displayClose: false
    });
  }

  handleImportClick (e){
    this.props.showModal(MODAL_TYPE_IMPORT_NOTE, {
      title:        'Import Note',
      displayClose: true
    });
  }

  render() {
    return (
      <Fragment>

        <div className="d-flex mb-2 mt-2 f-shrink-0">
          <button className="btn-append btn-slim btn-hot cursor-pointer align-center f-grow-1 p-2" onClick={this.handleNewClick}>
            <span class="mr-3"><FontAwesomeIcon icon="plus"/></span>
            {noteEditBtnLabel[this.props.global.lang]}
          </button>
          <button className="btn-prepend btn-slim btn-hot cursor-pointer align-center f-shrink-0 p-2" onClick={this.handleImportClick}>
            <FontAwesomeIcon icon="file-import"/>
          </button>
        </div>

        <div className="mb-2 f-grow-1">
          <div className="notes-label align-center font-weight-bold text-dec-underline pb-1">{sharedNotesLabel[this.props.global.lang]}</div>
          <SortableList items={this.props.noteList} onSortEnd={this.props.reorderNote} lockAxis={'y'} transitionDuration={300} lockOffset={'0px'} helperClass={'note-selected'} useDragHandle lockToContainerEdges/>
        </div>

      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);
