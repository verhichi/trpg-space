import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal, hideModal, removeEnemy } from '../../../../../../redux/actions/action';
import socket from '../../../../../../socket/socketClient';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './enemy.scss';

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
    removeEnemy: (enemyId) => dispatch(removeEnemy(enemyId))
  };
};

class Enemy extends Component {
  constructor (props){
    super(props);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleRemoveClick (charId, e){
    this.props.showModal('confirm', {
      title: 'Delete Character',
      confirmText: `Are you sure you want to delete ${this.props.enemyData.name}?`,
      accept: [socket.emit.bind(socket, 'delEnemy', this.props.roomId, this.props.enemyData.charId), this.props.hideModal],
      decline: this.props.hideModal
    });
  }

  handleEditClick (e){
     this.props.showModal('editEnemy', { title: 'Edit Character', charId: this.props.enemyData.charId });
  }

  render() {
    return(
      <div className="char-cont w-100">
        <div className="char-head d-flex mb-3">
          {this.props.enemyData.ownerId === this.props.id
            ? (<div className="pr-1 cursor-pointer" onClick={this.handleEditClick}>
                 <FontAwesomeIcon icon="user-cog"/>
               </div>)
            : null
          }
          <div className="char-name f-grow-1 font-weight-bold">{this.props.enemyData.name}</div>
          {this.props.enemyData.ownerId === this.props.id
            ? (<div className="cursor-pointer" onClick={this.handleRemoveClick}>
                 <FontAwesomeIcon icon="window-close"/>
               </div>)
            : null
          }
        </div>
        <div className="char-body">
          <div>
            <FontAwesomeIcon icon="heart"/> {this.props.enemyData.curHp} /  {this.props.enemyData.maxHp}
          </div>
          <div>
            <FontAwesomeIcon icon="flask"/> {this.props.enemyData.curMp} / {this.props.enemyData.maxMp}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Enemy);
