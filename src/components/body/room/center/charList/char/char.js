import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal, hideModal, removeFromCharList } from '../../../../../../redux/actions/action';
import socket from '../../../../../../socket/socketClient';

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
    removeFromCharList: (charId) => dispatch(removeFromCharList(charId))
  };
};

class Char extends Component {
  constructor (props){
    super(props);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleRemoveClick (charId, e){
    const delCharEmit = socket.emit.bind(socket, 'delChar', this.props.roomId, this.props.charData.charId);

    this.props.showModal('confirm', {
      title: 'Delete Character',
      confirmText: `Are you sure you want to delete ${this.props.charData.name}?`,
      accept: [delCharEmit, this.props.hideModal],
      decline: this.props.hideModal
    });
  }

  handleEditClick (e){
     this.props.showModal('editChar', { title: 'Edit Character', charId: this.props.charData.charId });
  }

  render() {
    return(
      <div className="char-cont w-100">
        <div className="char-head d-flex mb-3">
          {this.props.charData.ownerId === this.props.id
            ? (<div className="pr-1 cursor-pointer" onClick={this.handleEditClick}>
                 <FontAwesomeIcon icon="user-cog"/>
               </div>)
            : null
          }
          <div className="char-name f-grow-1 font-weight-bold">{this.props.charData.name}</div>
          {this.props.charData.ownerId === this.props.id
            ? (<div className="cursor-pointer" onClick={this.handleRemoveClick}>
                 <FontAwesomeIcon icon="window-close"/>
               </div>)
            : null
          }
        </div>
        <div className="char-body">
          <div>
            <FontAwesomeIcon icon="heart"/> {this.props.charData.curHp} /  {this.props.charData.maxHp}
          </div>
          <div>
            <FontAwesomeIcon icon="flask"/> {this.props.charData.curMp} / {this.props.charData.maxMp}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Char);
