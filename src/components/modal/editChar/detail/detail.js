import React, { Component } from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    isMobile:     state.isMobile,
    id:           state.id,
    charList:     state.charList,
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


class Detail extends Component {
  constructor (props){
    super(props);
    this.state = { detail: this.props.charList.find((char) => char.charId === this.props.charId).detail };

    this.handleNewValueDetailButtonClick = this.handleNewValueDetailButtonClick.bind(this);
    this.handleNewParameterDetailButtonClick = this.handleNewParameterDetailButtonClick.bind(this);
  }

  componentDidMount (){
    this.props.returnDetailValue(this.state.detail);
  }

  handleNewValueDetailButtonClick (e){
    this.setState({ detail: [ ...this.state.detail, {
      id: uuid.v4(),
      type: 'value',
      label: '',
      value: ''
    }]}, () => {
      this.props.returnDetailValue(this.state.detail);
    });
  }

  handleNewParameterDetailButtonClick (e){
    this.setState({ detail: [ ...this.state.detail, {
      id: uuid.v4(),
      type: 'parameter',
      label: '',
      value: '',
      maxValue: ''
    }]}, () => {
      this.props.returnDetailValue(this.state.detail);
    });
  }

  handleRemoveChange (e, id){
    this.setState({ detail: this.state.detail.filter(detail => detail.id !== id) }, () => {
      this.props.returnDetailValue(this.state.detail);
    });
  }

  handleLabelChange (e, id){
    this.setState({ detail: this.state.detail.map(detail => {
      if (detail.id === id){
        return { ...detail, label: e.target.value }
      } else {
        return detail;
      }
    })}, () => {
      this.props.returnDetailValue(this.state.detail);
    });
  }

  handleValueChange (e, id){
    this.setState({ detail: this.state.detail.map(detail => {
      if (detail.id === id){
        return { ...detail, value: e.target.value }
      } else {
        return detail;
      }
    })}, () => {
      this.props.returnDetailValue(this.state.detail);
    });
  }

  handleMaxValueChange (e, id){
    this.setState({ detail: this.state.detail.map(detail => {
      if (detail.id === id){
        return { ...detail, maxValue: e.target.value }
      } else {
        return detail;
      }
    })}, () => {
      this.props.returnDetailValue(this.state.detail);
    });
  }

  render() {

    const toggleActiveClass = this.props.isActive ? 'is-active' : '';
    const toggleScrollClass = this.props.isMobile ? '' : 'hide-scroll';

    const detailList = this.state.detail.map(detail => {
      if (detail.type === 'value'){
        return (
          <div className="stat-inp-cont d-flex mb-2 font-size-lg font-weight-bold">
            <input className="inp stat-label f-shrink-0" type="text" value={this.state.detail.find(stat => stat.id === detail.id).label} onChange={e => this.handleLabelChange(e, detail.id)}/>
            <span className="ml-1 mr-1 f-shrink-0">:</span>
            <input className="inp f-grow-1" type="text" value={this.state.detail.find(stat => stat.id === detail.id).value} onChange={e => this.handleValueChange(e, detail.id)}/>
            <div className="status-close f-shrink-0 f-align-self-end cursor-pointer ml-1" onClick={(e) => this.handleRemoveChange(e, detail.id)}>
              <FontAwesomeIcon icon="window-close"/>
            </div>
          </div>
        );
      } else {
        return (
          <div className="stat-inp-cont d-flex mb-2 font-size-lg font-weight-bold">
            <input className="inp stat-label f-shrink-0" type="text" value={this.state.detail.find(stat => stat.id === detail.id).label} onChange={e => this.handleLabelChange(e, detail.id)}/>
            <span className="ml-1 mr-1 f-shrink-0">:</span>
            <input className="inp f-grow-1" type="text" value={this.state.detail.find(stat => stat.id === detail.id).value} onChange={e => this.handleValueChange(e, detail.id)}/>
            <span className="ml-1 mr-1 f-shrink-0">/</span>
            <input className="inp f-grow-1" type="text" value={this.state.detail.find(stat => stat.id === detail.id).maxValue} onChange={e => this.handleMaxValueChange(e, detail.id)}/>
            <div className="status-close f-shrink-0 f-align-self-end cursor-pointer ml-1" onClick={(e) => this.handleRemoveChange(e, detail.id)}>
              <FontAwesomeIcon icon="window-close"/>
            </div>
          </div>
        );
      }
    });

    return (
        <div className={`char-modal f-grow-1 ${toggleActiveClass} ${toggleScrollClass}`}>

          <div className="font-size-sm align-center pb-1">Details inputted here will only be visible when users open the character detail window.</div>
          <div className="d-flex justify-content-around mb-2">
            <button className="btn-slim btn-hot p-2 align-center cursor-pointer" type="button" onClick={this.handleNewValueDetailButtonClick}>
              <div className="d-none-sm pr-2"><FontAwesomeIcon icon="plus-square"/></div>
              <div className="btn-text">Add Value</div>
            </button>
            <button className="btn-slim btn-hot p-2 align-center cursor-pointer" type="button" onClick={this.handleNewParameterDetailButtonClick}>
              <div className="d-none-sm pr-2"><FontAwesomeIcon icon="plus-square"/></div>
              <div className="btn-text">Add Parameter</div>
              <div className="d-none-sm pl-2"><FontAwesomeIcon icon="percent"/></div>
            </button>
          </div>

          {detailList.length === 0
            ? (<div className="align-center p-2">No Details</div>)
            : detailList }

        </div>
    );
  }
}

export default connect(mapStateToProps)(Detail);
