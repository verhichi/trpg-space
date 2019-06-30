import React, { Component } from 'react';
import uuid from 'uuid';
import { STATUS_TYPE_PARAM, STATUS_TYPE_VALUE } from '../../../../constants/constants';
import { connect } from 'react-redux';
import { statusHelpText, addValBtnLabel, addParamBtnLabel } from './status.i18n';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { global: state.global };
};


class Status extends Component {
  constructor (props){
    super(props);
    this.state = { status: []};

    this.handleNewValueStatusButtonClick     = this.handleNewValueStatusButtonClick.bind(this);
    this.handleNewParameterStatusButtonClick = this.handleNewParameterStatusButtonClick.bind(this);
  }

  componentDidMount (){
    this.props.returnStatusValue(this.state.status);
  }

  handleNewValueStatusButtonClick (e){
    this.setState({ status: [ ...this.state.status, {
      id:    uuid.v4(),
      type:  STATUS_TYPE_VALUE,
      label: '',
      value: ''
    }]}, () => {
      this.props.returnStatusValue(this.state.status);
    });
  }

  handleNewParameterStatusButtonClick (e){
    this.setState({ status: [ ...this.state.status, {
      id:       uuid.v4(),
      type:     STATUS_TYPE_PARAM,
      label:    '',
      value:    '',
      maxValue: ''
    }]}, () => {
      this.props.returnStatusValue(this.state.status);
    });
  }

  handleRemoveChange (e, id){
    this.setState({ status: this.state.status.filter(status => status.id !== id) }, () => {
      this.props.returnStatusValue(this.state.status);
    });
  }

  handleLabelChange (e, id){
    this.setState({ status: this.state.status.map(status => {
      if (status.id === id){
        return { ...status, label: e.target.value }
      } else {
        return status;
      }
    })}, () => {
      this.props.returnStatusValue(this.state.status);
    });
  }

  handleValueChange (e, id){
    this.setState({ status: this.state.status.map(status => {
      if (status.id === id){
        return { ...status, value: e.target.value }
      } else {
        return status;
      }
    })}, () => {
      this.props.returnStatusValue(this.state.status);
    });
  }

  handleMaxValueChange (e, id){
    this.setState({ status: this.state.status.map(status => {
      if (status.id === id){
        return { ...status, maxValue: e.target.value }
      } else {
        return status;
      }
    })}, () => {
      this.props.returnStatusValue(this.state.status);
    });
  }

  render() {

    const toggleActiveClass = this.props.isActive ? 'is-active' : '';
    const toggleScrollClass = this.props.global.isMobile ? '' : 'hide-scroll';

    const statusList = this.state.status.map(status => {
      if (status.type === STATUS_TYPE_VALUE){
        return (
          <div className="stat-inp-cont d-flex mb-2 font-size-lg font-weight-bold">
            <input className="inp stat-label f-shrink-0" type="text" value={this.state.status.find(stat => stat.id === status.id).label} onChange={e => this.handleLabelChange(e, status.id)}/>
            <span className="ml-1 mr-1 f-shrink-0">:</span>
            <input className="inp f-grow-1" type="text" value={this.state.status.find(stat => stat.id === status.id).value} onChange={e => this.handleValueChange(e, status.id)}/>
            <div className="status-close f-shrink-0 f-align-self-end cursor-pointer ml-1" onClick={(e) => this.handleRemoveChange(e, status.id)}>
              <FontAwesomeIcon icon="window-close"/>
            </div>
          </div>
        );
      } else {
        return (
          <div className="stat-inp-cont d-flex mb-2 font-size-lg font-weight-bold">
            <input className="inp stat-label f-shrink-0" type="text" value={this.state.status.find(stat => stat.id === status.id).label} onChange={e => this.handleLabelChange(e, status.id)}/>
            <span className="ml-1 mr-1 f-shrink-0">:</span>
            <input className="inp f-grow-1" type="text" value={this.state.status.find(stat => stat.id === status.id).value} onChange={e => this.handleValueChange(e, status.id)}/>
            <span className="ml-1 mr-1 f-shrink-0">/</span>
            <input className="inp f-grow-1" type="text" value={this.state.status.find(stat => stat.id === status.id).maxValue} onChange={e => this.handleMaxValueChange(e, status.id)}/>
            <div className="status-close f-shrink-0 f-align-self-end cursor-pointer ml-1" onClick={(e) => this.handleRemoveChange(e, status.id)}>
              <FontAwesomeIcon icon="window-close"/>
            </div>
          </div>
        );
      }
    });

    return (
        <div className={`char-modal f-grow-1 ${toggleActiveClass} ${toggleScrollClass}`}>
          <div className="font-size-sm align-center pb-1">{statusHelpText[this.props.global.lang]}</div>
          <div className="d-flex justify-content-around mb-2">
            <button className="btn-slim btn-hot p-2 align-center cursor-pointer" type="button" onClick={this.handleNewValueStatusButtonClick}>
              <span className="d-none-sm mr-2"><FontAwesomeIcon icon="plus-square"/></span>
              {addValBtnLabel[this.props.global.lang]}
            </button>
            <button className="btn-slim btn-hot p-2 align-center cursor-pointer" type="button" onClick={this.handleNewParameterStatusButtonClick}>
              <span className="d-none-sm mr-2"><FontAwesomeIcon icon="plus-square"/></span>
              {addParamBtnLabel[this.props.global.lang]}
              <span className="d-none-sm ml-2"><FontAwesomeIcon icon="percent"/></span>
            </button>
          </div>

          {statusList.length === 0
            ? (<div className="align-center p-2">No Statuses</div>)
            : statusList }

        </div>
    );
  }
}

export default connect(mapStateToProps)(Status);
