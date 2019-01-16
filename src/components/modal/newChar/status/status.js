import React, { Component, Fragment } from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    isMobile:     state.isMobile,
    id:           state.id,
    roomId:       state.roomId,
    modalSetting: state.modalSetting
  };
};

// // Redux Map Dispatch To Props
// const mapDispatchToProps = (dispatch) => {
//   return {
//     addToCharList: (charData) => dispatch(addToCharList(charData)),
//     hideModal: () => dispatch(hideModal())
//   };
// };


class Status extends Component {
  constructor (props){
    super(props);
    this.state = { status: [
      {
        id: uuid.v4(),
        type: 'param',
        label: 'HP',
        value: '',
        maxValue: ''
      },
      {
        id: uuid.v4(),
        type: 'param',
        label: 'MP',
        value: '',
        maxValue: ''
      }
    ]};

    this.handleNewValueStatusButtonClick = this.handleNewValueStatusButtonClick.bind(this);
    this.handleNewParameterStatusButtonClick = this.handleNewParameterStatusButtonClick.bind(this);
  }

  componentDidMount (){
    this.props.returnStatusValue(this.state.status);
  }

  handleNewValueStatusButtonClick (e){
    this.setState({ status: [ ...this.state.status, {
      id: uuid.v4(),
      type: 'value',
      label: '',
      value: ''
    }]}, () => {
      this.props.returnStatusValue(this.state.status);
    });
  }

  handleNewParameterStatusButtonClick (e){
    this.setState({ status: [ ...this.state.status, {
      id: uuid.v4(),
      type: 'parameter',
      label: '',
      value: '',
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
    const toggleScrollClass = this.props.isMobile ? '' : 'hide-scroll';

    const statusList = this.state.status.map(status => {
      if (status.type === 'value'){
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
          <div className="font-size-sm align-center pb-1">Statuses inputted here will be visible without having to open the character detail window.</div>
          <div className="d-flex justify-content-around mb-2">
            <button className="btn-slim btn-hot p-2 align-center cursor-pointer" type="button" onClick={this.handleNewValueStatusButtonClick}>
              <div className="d-none-sm pr-2"><FontAwesomeIcon icon="plus-square"/></div>
              <div className="btn-text">Add Value</div>
            </button>
            <button className="btn-slim btn-hot p-2 align-center cursor-pointer" type="button" onClick={this.handleNewParameterStatusButtonClick}>
              <div className="d-none-sm pr-2"><FontAwesomeIcon icon="plus-square"/></div>
              <div className="btn-text">Add Parameter</div>
              <div className="d-none-sm pl-2"><FontAwesomeIcon icon="percent"/></div>
            </button>
          </div>

          {statusList.length === 0
            ? (<div className="align-center p-2">No Status</div>)
            : statusList }

        </div>
    );
  }
}

export default connect(mapStateToProps)(Status);
