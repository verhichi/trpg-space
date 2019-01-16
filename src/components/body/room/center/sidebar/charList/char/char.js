import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal, hideModal, removeFromCharList, removeMapChar } from '../../../../../../../redux/actions/action';
import socket from '../../../../../../../socket/socketClient';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './char.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    id: state.id,
    roomId: state.roomId
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    showModal: (modalType, modalProp) => dispatch(showModal(modalType, modalProp)),
    hideModal: () => dispatch(hideModal()),
    removeFromCharList: (charId) => dispatch(removeFromCharList(charId)),
    removeMapChar: (charId) => dispatch(removeMapChar(charId))
  };
};

class Char extends Component {
  constructor (props){
    super(props);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleViewClick = this.handleViewClick.bind(this);
  }

  handleRemoveClick (charId, e){
    this.props.showModal('confirm', {
      title: 'Delete Character',
      displayClose: false,
      confirmText: `Are you sure you want to delete ${this.props.charData.general.name}?`,
      accept: [
        this.props.removeFromCharList.bind(null, this.props.charData.charId),
        this.props.removeMapChar.bind(null, this.props.charData.charId),
        socket.emit.bind(socket, 'delChar', this.props.roomId, this.props.charData.charId),
        this.props.hideModal
      ],
      decline: this.props.hideModal
    });
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

    const statList = this.props.charData.status.map(status => {
      if (status.type === 'value'){
        return(<div><span className="font-weight-bold">{status.label}</span>: {showStat ? status.value : '???'}</div>);
      } else {
        return(<div><span className="font-weight-bold">{status.label}</span>: {showStat ? status.value : '???'} / {showStat ? status.maxValue : '???'}</div>);
      }
    });

    return(
      <div className="char-cont w-100" style={{background: `linear-gradient(135deg, #fff 85%, ${this.props.charData.general.color} 0)`}}>
        <div className="char-head d-flex mb-3">
          {this.props.charData.ownerId === this.props.id
            ? (<div className="pr-1 cursor-pointer" onClick={this.handleEditClick}>
                 <FontAwesomeIcon icon="pen-square"/>
               </div>)
            : (<div className="cursor-pointer" onClick={this.handleViewClick}>
                 <FontAwesomeIcon icon="eye"/>
               </div>)}
          <div className="char-name f-grow-1 font-weight-bold">{charName}</div>
          {this.props.charData.ownerId === this.props.id
            ? (<div className="cursor-pointer" onClick={this.handleRemoveClick}>
                 <FontAwesomeIcon icon="window-close"/>
               </div>)
            : null}
        </div>
        <div className="char-body">
          {statList}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Char);
