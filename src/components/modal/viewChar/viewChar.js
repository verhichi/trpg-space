import React, { Component } from 'react';
import { CHAR_MODAL_TAB_GENERAL, CHAR_MODAL_TAB_STATUS, CHAR_MODAL_TAB_DETAIL } from '../../../constants/constants';
import { connect } from 'react-redux';
import { generalTabLabel, statusTabLabel, detailTabLabel } from './viewChar.i18n';

// Component
import Detail  from './detail/detail';
import General from './general/general';
import Status  from './status/status';


// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    charList:     state.charList,
    global:       state.global,
    modalSetting: state.modalSetting
  };
};

class ViewChar extends Component {
  constructor (props){
    super(props);
    const char = this.props.charList.find((char) => char.charId === this.props.modalSetting.modalProp.charId);

    this.state = {
      tabMode: CHAR_MODAL_TAB_GENERAL,
      general: char.general,
      status:  char.status,
      detail:  char.detail
    };

    this.handleGeneralTabClick = this.handleTabClick.bind(this, CHAR_MODAL_TAB_GENERAL);
    this.handleStatusTabClick  = this.handleTabClick.bind(this, CHAR_MODAL_TAB_STATUS);
    this.handleDetailTabClick  = this.handleTabClick.bind(this, CHAR_MODAL_TAB_DETAIL);
  }

  handleTabClick (tabMode, e){
    this.setState({ tabMode: tabMode });
  }

  render() {
    const toggleGeneralTabClass = this.state.tabMode === CHAR_MODAL_TAB_GENERAL ? 'is-active' : '';
    const toggleStatusTabClass  = this.state.tabMode === CHAR_MODAL_TAB_STATUS  ? 'is-active' : '';
    const toggleDetailTabClass  = this.state.tabMode === CHAR_MODAL_TAB_DETAIL  ? 'is-active' : '';

    return (
      <div className="d-flex f-dir-col f-grow-1">

        <div className="char-tab-cont f-shrink-0 d-flex mb-1">
          <div className={`char-tab cursor-pointer p-2 ${toggleGeneralTabClass}`} onClick={this.handleGeneralTabClick}>{generalTabLabel[this.props.global.lang]}</div>
          <div className={`char-tab cursor-pointer p-2 ${toggleStatusTabClass}`} onClick={this.handleStatusTabClick}>{statusTabLabel[this.props.global.lang]}</div>
          <div className={`char-tab cursor-pointer p-2 ${toggleDetailTabClass}`} onClick={this.handleDetailTabClick}>{detailTabLabel[this.props.global.lang]}</div>
        </div>

        <General isActive={this.state.tabMode === CHAR_MODAL_TAB_GENERAL} ownerId={this.state.general.ownerId} privacy={this.state.general.privacy} general={this.state.general}/>
        <Status  isActive={this.state.tabMode === CHAR_MODAL_TAB_STATUS}  ownerId={this.state.general.ownerId} privacy={this.state.general.privacy} status={this.state.status}/>
        <Detail  isActive={this.state.tabMode === CHAR_MODAL_TAB_DETAIL}  ownerId={this.state.general.ownerId} privacy={this.state.general.privacy} detail={this.state.detail}/>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ViewChar);
