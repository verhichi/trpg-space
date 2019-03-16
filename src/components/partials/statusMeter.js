import React, { Component } from 'react';

// Style
import './statusMeter.scss';

/**
 *  @props editable    - [bool]   true editable / false read-only
 *  @props value       - [string] numerator value
 *  @props MaxValue    - [string] denominator value
 *  @props color       - [string] hex code of color
 *  @props onChange    - [func]   what to do when a user edits the meter(while user is moving it)
 *  @props onChangeEnd - [func]   what to do when a user finishes editting the meter
 */
class StatusMeter extends Component {
  constructor (props){
    super(props);
    this.meterRef = React.createRef();
    this.state = { isMoveMode: false }

    this.handleMouseDown  = this.handleMouseDown.bind(this);
    this.handleMouseMove  = this.handleMouseMove.bind(this);
    this.handleMouseUp    = this.handleMouseUp.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove  = this.handleTouchMove.bind(this);
    this.handleTouchEnd   = this.handleTouchEnd.bind(this);
    this.moveCircle       = this.moveCircle.bind(this);
  }


  componentWillUnmount (){
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
    document.querySelector('.list-cont').removeEventListener('touchmove', this.handleTouchMove);
    document.querySelector('.list-cont').removeEventListener('touchend', this.handleTouchEnd);
  }


  handleMouseDown (e){
    e.stopPropagation();

    if (!this.state.isMoveMode && this.props.editable){
      this.setState({ isMoveMode: true });
      this.moveCircle(e.pageX);
      window.addEventListener('mousemove', this.handleMouseMove);
      window.addEventListener('mouseup', this.handleMouseUp);
    }
  }


  handleMouseMove (e){
    e.preventDefault();
    e.stopPropagation();

    if (this.state.isMoveMode && this.props.editable){
      this.moveCircle(e.pageX);
    }
  }


  handleMouseUp (e){
    e.preventDefault();

    if (this.state.isMoveMode && this.props.editable){
      this.setState({ isMoveMode: false });
      this.props.onChangeEnd(this.props.statId, this.props.value);
      window.removeEventListener('mousemove', this.handleMouseMove);
      window.removeEventListener('mouseup', this.handleMouseUp);
    }
  }


  handleTouchStart (e){
    e.stopPropagation();

    if (!this.state.isMoveMode && this.props.editable){
      this.setState({ isMoveMode: true });
      this.moveCircle(e.touches[0].pageX);
      document.querySelector('.list-cont').addEventListener('touchmove', this.handleTouchMove);
      document.querySelector('.list-cont').addEventListener('touchend', this.handleTouchEnd);
    }
  }


  handleTouchMove (e){
    e.stopPropagation();

    if (this.state.isMoveMode && this.props.editable){
      this.moveCircle(e.touches[0].pageX);
    }
  }


  handleTouchEnd (e){
    e.preventDefault();

    if (this.state.isMoveMode && this.props.editable){
      this.setState({ isMoveMode: false });
      this.props.onChangeEnd(this.props.statId, this.props.value);
      document.querySelector('.list-cont').removeEventListener('touchmove', this.handleTouchMove);
      document.querySelector('.list-cont').removeEventListener('touchend', this.handleTouchEnd);
    }
  }


  moveCircle (pointerPageX){
    const mouseOffsetLeftMeter = pointerPageX - this.meterRef.current.offsetLeft;
    const mouseOffsetLeftMeterPercent = mouseOffsetLeftMeter / this.meterRef.current.offsetWidth;
    const calcMeterPercent = mouseOffsetLeftMeterPercent < 0
                               ? 0
                               : mouseOffsetLeftMeterPercent > 1
                                 ? 1
                                 : mouseOffsetLeftMeterPercent;

    const newValue = Math.round(this.props.maxValue * calcMeterPercent).toString();

    this.props.onChange(this.props.statId, newValue);
  }


  render() {
    const cursorClass = this.props.editable ? 'cursor-pointer' : '';

    const statusMeterWidth = isNaN(this.props.value) || isNaN(this.props.maxValue) || this.props.value / this.props.maxValue * 100 < 0
                               ? 0
                               : this.props.value / this.props.maxValue * 100 > 100
                                 ? 100
                                 : this.props.value / this.props.maxValue * 100;

    return(
      <div className={`pt-1 pb-1 pr-2 ${cursorClass}`} onTouchStart={this.handleTouchStart} onMouseDown={this.handleMouseDown}>
        <div className="status-meter-cont" ref={this.meterRef}>
          <div className="status-meter" style={{background: this.props.color, width: `${statusMeterWidth}%`}}></div>
          { this.props.editable && <div className="status-meter-circle" style={{background: this.props.color, left: `calc(${statusMeterWidth}% - 5px)`}}></div>}
        </div>
      </div>
    );
  }
}

// export default Confirm;
export default StatusMeter;
