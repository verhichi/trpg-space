import React, { Component } from 'react';

// Style
import './statusMeter.scss';

/**
 *  @props editable - [bool]   true editable / false read-only
 *  @props value    - [string] numerator value
 *  @props MaxValue - [string] denominator value
 *  @props color    - [string] hex code of color
 *  @props onChange - [func]   what to do when a user edits the meter
 */
class StatusMeter extends Component {
  render() {
    const calcMaxVal = isNaN(this.props.maxValue) ? 1 : this.props.maxValue;
    const calcVal    = isNaN(this.props.value)    ? 0 : this.props.value;

    const statusMeterWidth = calcVal / calcMaxVal * 100;
    const calcStatusMeterWidth = statusMeterWidth < 0
                                   ? 0
                                   : statusMeterWidth > 100
                                       ? 100
                                       : statusMeterWidth;

    return(
      <div>
        <div className="status-meter-cont">
          <div className="status-meter" style={{background: this.props.color, width: `${calcStatusMeterWidth}%`}}></div>
        </div>
      </div>
    );
  }
}

// export default Confirm;
export default StatusMeter;
