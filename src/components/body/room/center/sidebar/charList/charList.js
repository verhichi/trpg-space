import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { CHAR_TYPE_ALLY, CHAR_TYPE_ENEMY, MODAL_TYPE_NEW_CHAR, MODAL_TYPE_IMPORT_CHAR } from '../../../../../../constants/constants';
import { showModal } from '../../../../../../redux/actions/modal';
import { createCharBtnLabel, charListLabel, enemyListLabel } from './charList.i18n';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './charList.scss';

// Component
import Char from './char/char';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    charList: state.charList,
    global:   state.global
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return { showModal: (modalType, modalProp) => dispatch(showModal(modalType, modalProp)) };
};

class CharList extends Component {
  constructor (props){
    super(props);

    this.handleNewClick = this.handleNewClick.bind(this);
    this.handleImportClick = this.handleImportClick.bind(this);
  }

  handleNewClick (){
    this.props.showModal(MODAL_TYPE_NEW_CHAR, {
      title:        'Create New Character',
      displayClose: true
    });
  }

  handleImportClick (){
    this.props.showModal(MODAL_TYPE_IMPORT_CHAR, {
      title:        'Import Character',
      displayClose: true
    });
  }

  render() {
    const charList = this.props.charList.filter(char => char.general.type === CHAR_TYPE_ALLY).map(charData => {
      return <Char key={charData.charId} charData={charData}/>;
    });

    const enemyList = this.props.charList.filter(char => char.general.type === CHAR_TYPE_ENEMY).map(charData => {
      return <Char key={charData.charId} charData={charData}/>;
    });

    return (
      <Fragment>

        <div className="d-flex mb-2 mt-2 f-shrink-0">
          <button className="btn-append btn-slim btn-hot cursor-pointer align-center f-grow-1 p-2" onClick={this.handleNewClick}>
            <span class="mr-3"><FontAwesomeIcon icon="user-plus"/></span>
            {createCharBtnLabel[this.props.global.lang]}
          </button>
          <button className="btn-prepend btn-slim btn-hot cursor-pointer align-center f-shrink-0 p-2" onClick={this.handleImportClick}>
            <FontAwesomeIcon icon="file-import"/>
          </button>
        </div>


        <div className="mb-2">
          <div className="char-list-label align-center font-weight-bold text-dec-underline pb-1">{charListLabel[this.props.global.lang]}</div>
          <div className="d-flex f-grow-1 f-dir-col">
            {charList.length === 0
              ? (<div className="empty-cont p-3 font-size-lg align-center font-weight-bold cursor-pointer" onClick={this.handleNewClick}>Create New Ally</div>)
              : charList}
          </div>
        </div>

        <div>
           <div className="char-list-label align-center font-weight-bold text-dec-underline pb-1">{enemyListLabel[this.props.global.lang]}</div>
           <div className="d-flex f-grow-1 f-dir-col">
             {enemyList.length === 0
               ? (<div className="empty-cont p-3 font-size-lg align-center font-weight-bold cursor-pointer" onClick={this.handleNewClick}>Create New Enemy</div>)
               : enemyList}
           </div>
         </div>

       </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharList);
