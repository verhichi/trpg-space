import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal, hideModal, removeFromCharList, removeMapChar, checkSendAsPlayer, editSendAs } from '../../../../../../../redux/actions/action';
import socket from '../../../../../../../socket/socketClient';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './char.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    id:          state.id,
    roomId:      state.roomId,
    userList:    state.userList,
    chatSetting: state.chatSetting
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    showModal:          (modalType, modalProp) => dispatch(showModal(modalType, modalProp)),
    hideModal:          ()                     => dispatch(hideModal()),
    removeFromCharList: (charId)               => dispatch(removeFromCharList(charId)),
    removeMapChar:      (charId)               => dispatch(removeMapChar(charId)),
    checkSendAsPlayer:  ()                     => dispatch(checkSendAsPlayer()),
    editSendAs:         (charId)               => dispatch(editSendAs(charId))
  };
};

class Char extends Component {
  constructor (props){
    super(props);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleViewClick = this.handleViewClick.bind(this);
    this.resetSendAsState = this.resetSendAsState.bind(this);
  }

  handleRemoveClick (charId, e){
    this.props.showModal('confirm', {
      title: 'Delete Character',
      displayClose: false,
      confirmText: `Are you sure you want to delete ${this.props.charData.general.name}?`,
      accept: [
        this.props.removeFromCharList.bind(null, this.props.charData.charId),
        this.props.removeMapChar.bind(null, this.props.charData.charId),
        this.resetSendAsState,
        socket.emit.bind(socket, 'delChar', this.props.roomId, this.props.charData.charId),
        this.props.hideModal
      ],
      decline: this.props.hideModal
    });
  }

  resetSendAsState (){
    if (this.props.charData.charId === this.props.chatSetting.sendAs.sendAsCharacter){
      this.props.checkSendAsPlayer();
      this.props.editSendAs('');
    }
  }

  handleEditClick (e){
    this.props.showModal('editChar', {
      title: 'Edit Character',
      displayClose: true,
      charId: this.props.charData.charId
    });
  }

  handleViewClick (e){
    this.props.showModal('viewChar', {
      title: 'View Character',
      displayClose: true,
      charId: this.props.charData.charId
    });
  }

  render() {
    const showName = this.props.charData.general.privacy <= 1 || this.props.charData.ownerId === this.props.id;
    const showStat = this.props.charData.general.privacy <= 0 || this.props.charData.ownerId === this.props.id;

    const charName = showName ? this.props.charData.general.name : 'UNKNOWN';
    const userName = this.props.userList.find(user => user.id === this.props.charData.ownerId).name;

    const statList = this.props.charData.status.map(status => {
      if (status.type === 'value'){
        return(<div className="char-data"><span className="font-weight-bold">{status.label}</span>: {showStat ? status.value : '???'}</div>);
      } else {
        return(<div className="char-data"><span className="font-weight-bold">{status.label}</span>: {showStat ? status.value : '???'} / {showStat ? status.maxValue : '???'}</div>);
      }
    });

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
          {this.props.charData.ownerId === this.props.id
            ? (<div className="char-btn cursor-pointer align-center" onClick={this.handleRemoveClick}>
                 <FontAwesomeIcon icon="window-close"/>
               </div>)
            : null}
          {this.props.charData.ownerId === this.props.id
            ? (<div className="cursor-pointer char-btn align-center f-shrink-0" onClick={this.handleEditClick}>
                 <FontAwesomeIcon icon="pen-square"/>
               </div>)
            : (<div className="cursor-pointer char-btn align-center f-shrink-0" onClick={this.handleViewClick}>
                 <FontAwesomeIcon icon="eye"/>
               </div>)}
          {this.props.charData.general.link.length !== 0
            ? (<a className="char-btn text-dec-none align-center f-shrink-0 remove-link-dec" href={this.props.charData.general.link} target="_blank" rel='noreferrer noopener'>
                 <div className="cursor-pointer"><FontAwesomeIcon icon="link"/></div>
               </a>)
            : null}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Char);
