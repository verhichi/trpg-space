import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { CHAR_PRIVACY_LEVEL_ZERO, CHAR_PRIVACY_LEVEL_ONE, CHAR_PRIVACY_LEVEL_THREE, MODAL_TYPE_VIEW_CHAR, MODAL_TYPE_CONFIRM, MODAL_TYPE_EDIT_CHAR, STATUS_TYPE_VALUE, STATUS_TYPE_PARAM } from '../../../../../../../constants/constants'
import { showModal, hideModal } from '../../../../../../../redux/actions/modal';
import { removeMapChar, removeSelCharFromAllMap } from '../../../../../../../redux/actions/mapChar';
import { addChar, removeChar } from '../../../../../../../redux/actions/char';
import { checkSendAsUser, editSendAs } from '../../../../../../../redux/actions/chatSetting';

import socket from '../../../../../../../socket/socketClient';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './char.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    global:         state.global,
    userList:       state.userList,
    displaySetting: state.displaySetting,
    chatSetting:    state.chatSetting,
    mapSetting:     state.mapSetting
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    showModal:               (modalType, modalProp) => dispatch(showModal(modalType, modalProp)),
    hideModal:               ()                     => dispatch(hideModal()),
    addChar:                 (charData)             => dispatch(addChar(charData)),
    removeChar:              (charId)               => dispatch(removeChar(charId)),
    removeMapChar:           (mapId, charId)        => dispatch(removeMapChar(mapId, charId)),
    checkSendAsUser:         ()                     => dispatch(checkSendAsUser()),
    editSendAs:              (charId)               => dispatch(editSendAs(charId)),
    removeSelCharFromAllMap: (charId)               => dispatch(removeSelCharFromAllMap(charId))
  };
};

class Char extends Component {
  constructor (props){
    super(props);

    this.handleRemoveClick   = this.handleRemoveClick.bind(this);
    this.handleRemoveConfirm = this.handleRemoveConfirm.bind(this);
    this.handleEditClick     = this.handleEditClick.bind(this);
    this.handleViewClick     = this.handleViewClick.bind(this);
    this.resetSendAsState    = this.resetSendAsState.bind(this);
    this.handleCopyClick     = this.handleCopyClick.bind(this);
    this.handleCopyConfirm   = this.handleCopyConfirm.bind(this);
  }

  handleRemoveClick (charId, e){
    this.props.showModal(MODAL_TYPE_CONFIRM, {
      title:        'Delete Character',
      displayClose: false,
      confirmText:  `Are you sure you want to delete ${this.props.charData.general.name}?`,
      accept:       this.handleRemoveConfirm,
      decline:      this.props.hideModal
    });
  }

  handleRemoveConfirm (){
    this.props.removeSelCharFromAllMap(this.props.charData.charId);
    this.props.removeChar(this.props.charData.charId);

    this.resetSendAsState();
    socket.emit('delChar', this.props.global.roomId, this.props.charData.charId);
    this.props.hideModal();
  }

  resetSendAsState (){
    if (this.props.charData.charId === this.props.chatSetting.sendAs.sendAsCharacter){
      this.props.checkSendAsUser();
      this.props.editSendAs('');
    }
  }

  handleEditClick (e){
    this.props.showModal(MODAL_TYPE_EDIT_CHAR, {
      title:        'Edit Character',
      displayClose: true,
      charId:       this.props.charData.charId
    });
  }

  handleViewClick (e){
    this.props.showModal(MODAL_TYPE_VIEW_CHAR, {
      title:        'View Character',
      displayClose: true,
      charId:       this.props.charData.charId
    });
  }

  handleCopyClick (e){
    this.props.showModal(MODAL_TYPE_CONFIRM, {
      title:        'Copy Character',
      displayClose: false,
      confirmText:  `Create a copy of ${this.props.charData.general.name}?`,
      accept:       this.handleCopyConfirm,
      decline:      this.props.hideModal
    });
  }

  handleCopyConfirm (){
    const newCharData = { ...this.props.charData, charId: uuid.v4()};
    this.props.addChar(newCharData);

    if (this.props.charData.general.privacy !== CHAR_PRIVACY_LEVEL_THREE){
      socket.emit('char', this.props.global.roomId, newCharData);
    }

    this.props.hideModal();
  }

  render() {
    const showName = this.props.charData.general.privacy <= CHAR_PRIVACY_LEVEL_ONE || this.props.charData.ownerId === this.props.global.id;
    const showStat = this.props.charData.general.privacy <= CHAR_PRIVACY_LEVEL_ZERO || this.props.charData.ownerId === this.props.global.id;
    const charName = showName ? this.props.charData.general.name : 'UNKNOWN';
    const userName = this.props.userList.find(user => user.id === this.props.charData.ownerId).name;

    const charDataType = {
      [STATUS_TYPE_VALUE]: (status) => (<div className="char-data"><span className="font-weight-bold">{status.label}</span>: {showStat ? status.value : '???'}</div>),
      [STATUS_TYPE_PARAM]: (status) => (<div className="char-data"><span className="font-weight-bold">{status.label}</span>: {showStat ? status.value : '???'} / {showStat ? status.maxValue : '???'}</div>)
    }

    const statList   = this.props.charData.status.map(status => charDataType[status.type](status));
    const imageStyle = this.props.charData.general.image.length === 0
                         ? null
                         : { backgroundImage: `url(${this.props.charData.general.image})`};

    return(
      <div className="char-cont d-flex" style={{background: `linear-gradient(135deg, ${this.props.charData.general.color} 10%, #fff 0)`}}>
        <div className="char-profile-circle f-shrink-0" style={imageStyle}></div>
        <div className="char-data-cont d-flex f-dir-col f-grow-1 pl-1 pt-1 pb-1">
          <div className="char-owner one-line-ellipsis font-size-sm font-weight-bold">{userName}</div>
          <div className="one-line-ellipsis font-weight-bold pb-1">{charName}</div>
          { statList }
        </div>
        <div className="d-flex f-dir-col f-shrink-0 pr-1 pt-1">
          {this.props.charData.ownerId === this.props.global.id
            ? (<div className="char-btn cursor-pointer align-center" onClick={this.handleRemoveClick}>
                 <FontAwesomeIcon icon="window-close"/>
               </div>)
            : null}
          {this.props.charData.ownerId === this.props.global.id
            ? (<div className="cursor-pointer char-btn align-center f-shrink-0" onClick={this.handleEditClick}>
                 <FontAwesomeIcon icon="pen-square"/>
               </div>)
            : (<div className="cursor-pointer char-btn align-center f-shrink-0" onClick={this.handleViewClick}>
                 <FontAwesomeIcon icon="eye"/>
               </div>)}
          {this.props.charData.ownerId === this.props.global.id
            && (<div className="cursor-pointer char-btn align-center f-shrink-0" onClick={this.handleCopyClick}>
                 <FontAwesomeIcon icon="copy"/>
               </div>)}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Char);
