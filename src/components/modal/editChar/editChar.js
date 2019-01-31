import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CHAR_PRIVACY_LEVEL_THREE, CHAR_MODAL_TAB_GENERAL, CHAR_MODAL_TAB_STATUS, CHAR_MODAL_TAB_DETAIL, STATUS_TYPE_VALUE } from '../../../constants/constants';
import { hideModal } from '../../../redux/actions/modal';
import { editChar } from '../../../redux/actions/char';
import socket from '../../../socket/socketClient';
import { generalTabLabel, statusTabLabel, detailTabLabel, submitBtnLabel } from './editChar.i18n';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './editChar.scss';

// Component
import Detail  from './detail/detail';
import General from './general/general';
import Status  from './status/status';


// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    global:       state.global,
    charList:     state.charList,
    modalSetting: state.modalSetting
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    hideModal: ()         => dispatch(hideModal()),
    editChar:  (charData) => dispatch(editChar(charData)),
  };
};


class EditChar extends Component {
  constructor (props){
    super(props);
    const char = this.props.charList.find((char) => char.charId === this.props.modalSetting.modalProp.charId);

    this.state = {
      tabMode: CHAR_MODAL_TAB_GENERAL,
      general: char.general,
      status:  char.status,
      detail:  char.detail,
      map:     char.map
    };

    this.returnStatusValue     = this.returnStatusValue.bind(this);
    this.returnDetailValue     = this.returnDetailValue.bind(this);
    this.returnGeneralValue    = this.returnGeneralValue.bind(this);
    this.handleGeneralTabClick = this.handleTabClick.bind(this, CHAR_MODAL_TAB_GENERAL);
    this.handleStatusTabClick  = this.handleTabClick.bind(this, CHAR_MODAL_TAB_STATUS);
    this.handleDetailTabClick  = this.handleTabClick.bind(this, CHAR_MODAL_TAB_DETAIL);
    this.handleSubmitClick     = this.handleSubmitClick.bind(this);
  }

  returnStatusValue (status){
    const trimmedData = status.map(status => {
      if (status.type === STATUS_TYPE_VALUE){
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
      if (status.type === STATUS_TYPE_VALUE){
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
      charId:  this.props.modalSetting.modalProp.charId,
      ownerId: this.props.global.id,
      general: this.state.general,
      status:  this.state.status,
      detail:  this.state.detail,
      map:     this.state.map
    };

    this.props.editChar(charData);

    if (this.state.general.privacy !== CHAR_PRIVACY_LEVEL_THREE){
      socket.emit('char', this.props.global.roomId, charData);
    } else {
      socket.emit('delChar', this.props.global.roomId, this.props.modalSetting.modalProp.charId);
    }

    this.props.hideModal();
  }

  render() {
    const toggleGeneralTabClass = this.state.tabMode === CHAR_MODAL_TAB_GENERAL ? 'is-active' : '';
    const toggleStatusTabClass =  this.state.tabMode === CHAR_MODAL_TAB_STATUS  ? 'is-active' : '';
    const toggleDetailTabClass =  this.state.tabMode === CHAR_MODAL_TAB_DETAIL  ? 'is-active' : '';

    const hasErrorGeneral = this.state.general.name.length === 0 ||
                            (this.state.general.link.length !== 0 && !/^http(s)?:\/\/.+/.test(this.state.general.link));

    const hasErrorStatus  = this.state.status.some(status => {
      if (status.type === STATUS_TYPE_VALUE){
        return status.label.length === 0 ||
               status.value.length === 0
      } else {
        return status.label.length    === 0 ||
               status.value.length    === 0 ||
               status.maxValue.length === 0;
      }
    });
    const hasErrorDetail  = this.state.detail.some(status => {
      if (status.type === STATUS_TYPE_VALUE){
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
          <div className={`char-tab cursor-pointer p-2 ${toggleGeneralTabClass}`} onClick={this.handleGeneralTabClick}> {generalTabLabel[this.props.global.lang]}<span className={`text-danger ${hasErrorGeneral ? '' : 'v-hidden'}`}><FontAwesomeIcon icon="exclamation-circle"/></span></div>
          <div className={`char-tab cursor-pointer p-2 ${toggleStatusTabClass}`} onClick={this.handleStatusTabClick}> {statusTabLabel[this.props.global.lang]}<span className={`text-danger ${hasErrorStatus ? '' : 'v-hidden'}`}><FontAwesomeIcon icon="exclamation-circle"/></span></div>
          <div className={`char-tab cursor-pointer p-2 ${toggleDetailTabClass}`} onClick={this.handleDetailTabClick}> {detailTabLabel[this.props.global.lang]}<span className={`text-danger ${hasErrorDetail ? '' : 'v-hidden'}`}><FontAwesomeIcon icon="exclamation-circle"/></span></div>
        </div>

        <General isActive={this.state.tabMode === CHAR_MODAL_TAB_GENERAL} returnGeneralValue={this.returnGeneralValue} charId={this.props.modalSetting.modalProp.charId}/>
        <Status  isActive={this.state.tabMode === CHAR_MODAL_TAB_STATUS}  returnStatusValue={this.returnStatusValue}   charId={this.props.modalSetting.modalProp.charId}/>
        <Detail  isActive={this.state.tabMode === CHAR_MODAL_TAB_DETAIL}  returnDetailValue={this.returnDetailValue}   charId={this.props.modalSetting.modalProp.charId}/>

        <button type="button" className="btn btn-hot w-100 cursor-pointer f-shrink-0 f-align-self-end" disabled={isDisabled} onClick={this.handleSubmitClick}>
          <FontAwesomeIcon icon="check"/>
          <div className="btn-text">{submitBtnLabel[this.props.global.lang]}</div>
        </button>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditChar);
