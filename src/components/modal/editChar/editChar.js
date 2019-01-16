import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ChromePicker } from 'react-color';
import { editChar, hideModal } from '../../../redux/actions/action';
import socket from '../../../socket/socketClient';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './editChar.scss';

// Component
import Detail from './detail/detail';
import General from './general/general';
import Status from './status/status';


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

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    hideModal: () => dispatch(hideModal()),
    editChar: (charData) => dispatch(editChar(charData)),
  };
};


class EditChar extends Component {
  constructor (props){
    super(props);
    const char = this.props.charList.find((char) => char.charId === this.props.modalSetting.modalProp.charId);

    this.state = {
      tabMode: 'general',
      general: char.general,
      status:  char.status,
      detail:  char.detail
    };

    this.returnStatusValue = this.returnStatusValue.bind(this);
    this.returnDetailValue = this.returnDetailValue.bind(this);
    this.returnGeneralValue = this.returnGeneralValue.bind(this);

    this.handleGeneralTabClick = this.handleTabClick.bind(this, 'general');
    this.handleStatusTabClick = this.handleTabClick.bind(this, 'status');
    this.handleDetailTabClick = this.handleTabClick.bind(this, 'detail');

    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  returnStatusValue (status){
    const trimmedData = status.map(status => {
      if (status.type === 'value'){
        return {
          ...status,
          label: status.label.trim(),
          value: status.value.trim()
        };
      } else {
        return {
          ...status,
          label: status.label.trim(),
          value: status.value.trim(),
          maxValue: status.maxValue.trim()
        };
      }
    });
    this.setState({ status: trimmedData });
  }

  returnDetailValue (detail){
    const trimmedData = detail.map(status => {
      if (status.type === 'value'){
        return {
          ...status,
          label: status.label.trim(),
          value: status.value.trim()
        };
      } else {
        return {
          ...status,
          label: status.label.trim(),
          value: status.value.trim(),
          maxValue: status.maxValue.trim()
        };
      }
    });
    this.setState({ detail: trimmedData });
  }

  returnGeneralValue (general){
    const trimmedData = {
      ...general,
      name: general.name.trim(),
      color: general.color.trim(),
      image: general.image.trim(),
      link: general.link.trim()
    }
    this.setState({ general: trimmedData });
  }

  handleTabClick (tabMode, e){
    this.setState({ tabMode: tabMode });
  }

  handleSubmitClick (e){
    const charData = {
      charId: this.props.modalSetting.modalProp.charId,
      ownerId: this.props.id,
      general: this.state.general,
      status: this.state.status,
      detail: this.state.detail,
      map: {
        onMap: false,
        x: '',
        y: ''
      }
    };

    this.props.editChar(charData);

    if (this.state.general.privacy !== '3'){
      socket.emit('char', this.props.roomId, charData);
    } else {
      socket.emit('delChar', this.props.roomId, this.props.modalSetting.modalProp.charId);
    }

    this.props.hideModal();
  }

  render() {
    const toggleGeneralTabClass = this.state.tabMode === 'general' ? 'is-active' : '';
    const toggleStatusTabClass =  this.state.tabMode === 'status' ? 'is-active' : '';
    const toggleDetailTabClass =  this.state.tabMode === 'detail' ? 'is-active' : '';

    const hasErrorGeneral = this.state.general.name.length === 0 ||
                            (this.state.general.link.length !== 0 && !/^http(s)?:\/\/.+/.test(this.state.general.link));

    const hasErrorStatus  = this.state.status.some(status => {
      if (status.type === 'value'){
        return status.label.length === 0 ||
               status.value.length === 0
      } else {
        return status.label.length    === 0 ||
               status.value.length    === 0 ||
               status.maxValue.length === 0;
      }
    });
    const hasErrorDetail  = this.state.detail.some(status => {
      if (status.type === 'value'){
        return status.label.length === 0 ||
               status.value.length === 0
      } else {
        return status.label.length    === 0 ||
               status.value.length    === 0 ||
               status.maxValue.length === 0;
      }
    });

    const isDisabled = hasErrorGeneral || hasErrorStatus || hasErrorDetail;

    return (
      <div className="d-flex f-dir-col f-grow-1">

        <div className="char-tab-cont f-shrink-0 d-flex mb-1">
          <div className={`char-tab cursor-pointer p-2 ${toggleGeneralTabClass}`} onClick={this.handleGeneralTabClick}>General <span className={`text-danger ${hasErrorGeneral ? '' : 'v-hidden'}`}><FontAwesomeIcon icon="exclamation-circle"/></span></div>
          <div className={`char-tab cursor-pointer p-2 ${toggleStatusTabClass}`} onClick={this.handleStatusTabClick}>Status <span className={`text-danger ${hasErrorStatus ? '' : 'v-hidden'}`}><FontAwesomeIcon icon="exclamation-circle"/></span></div>
          <div className={`char-tab cursor-pointer p-2 ${toggleDetailTabClass}`} onClick={this.handleDetailTabClick}>Detail <span className={`text-danger ${hasErrorDetail ? '' : 'v-hidden'}`}><FontAwesomeIcon icon="exclamation-circle"/></span></div>
        </div>

        <General isActive={this.state.tabMode === 'general'} returnGeneralValue={this.returnGeneralValue} charId={this.props.modalSetting.modalProp.charId}/>
        <Status  isActive={this.state.tabMode === 'status'} returnStatusValue={this.returnStatusValue} charId={this.props.modalSetting.modalProp.charId}/>
        <Detail  isActive={this.state.tabMode === 'detail'} returnDetailValue={this.returnDetailValue} charId={this.props.modalSetting.modalProp.charId}/>

        <button type="button" className="btn btn-hot w-100 cursor-pointer f-shrink-0 f-align-self-end" disabled={isDisabled} onClick={this.handleSubmitClick}>
          <FontAwesomeIcon icon="check"/>
          <div className="btn-text">Submit</div>
        </button>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditChar);
