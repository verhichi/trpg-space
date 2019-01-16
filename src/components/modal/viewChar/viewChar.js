import React, { Component } from 'react';
import { connect } from 'react-redux';

// Component
import Detail from './detail/detail';
import General from './general/general';
import Status from './status/status';


// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    isMobile:     state.isMobile,
    id:           state.id,
    charList:     state.charList,
    modalSetting: state.modalSetting
  };
};

class ViewChar extends Component {
  constructor (props){
    super(props);
    const char = this.props.charList.find((char) => char.charId === this.props.modalSetting.modalProp.charId);

    this.state = {
      tabMode: 'general',
      general: char.general,
      status:  char.status,
      detail:  char.detail
    };

    this.handleGeneralTabClick = this.handleTabClick.bind(this, 'general');
    this.handleStatusTabClick = this.handleTabClick.bind(this, 'status');
    this.handleDetailTabClick = this.handleTabClick.bind(this, 'detail');
  }

  handleTabClick (tabMode, e){
    this.setState({ tabMode: tabMode });
  }

  render() {
    const toggleGeneralTabClass = this.state.tabMode === 'general' ? 'is-active' : '';
    const toggleStatusTabClass =  this.state.tabMode === 'status' ? 'is-active' : '';
    const toggleDetailTabClass =  this.state.tabMode === 'detail' ? 'is-active' : '';

    return (
      <div className="d-flex f-dir-col f-grow-1">

        <div className="char-tab-cont f-shrink-0 d-flex mb-1">
          <div className={`char-tab cursor-pointer p-2 ${toggleGeneralTabClass}`} onClick={this.handleGeneralTabClick}>General</div>
          <div className={`char-tab cursor-pointer p-2 ${toggleStatusTabClass}`} onClick={this.handleStatusTabClick}>Status</div>
          <div className={`char-tab cursor-pointer p-2 ${toggleDetailTabClass}`} onClick={this.handleDetailTabClick}>Detail</div>
        </div>

        <General isActive={this.state.tabMode === 'general'} ownerId={this.state.general.ownerId} privacy={this.state.general.privacy} general={this.state.general}/>
        <Status  isActive={this.state.tabMode === 'status'}  ownerId={this.state.general.ownerId} privacy={this.state.general.privacy} status={this.state.status}/>
        <Detail  isActive={this.state.tabMode === 'detail'}  ownerId={this.state.general.ownerId} privacy={this.state.general.privacy} detail={this.state.detail}/>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ViewChar);
