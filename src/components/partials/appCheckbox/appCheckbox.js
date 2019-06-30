import React, { Component } from 'react';

// Style
import './appCheckbox.scss';

/**
 *  @props id          - [string] id used for htmlfor
 *  @props className   - [string] additional class to cont
 *  @props checked     - [boolean] is checkbox checked
 *  @props value       - [string] value
 *  @props label       - [string] label
 *  @props onChange    - [func]   what to do when a user edits the meter(while user is moving it)
 */
class AppCheckbox extends Component {
  constructor (props){
    super (props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (e){
    this.props.handleChange(e)
  }

  render() {
    return (
      <div className={`inp-check-cont cursor-pointer d-flex f-align-items-center p-relative ${this.props.className}`}>
        <input className="inp-check p-absolute" type="checkbox" value={this.props.value} checked={this.props.checked} id={`checkbox_${this.props.id}`} onChange={this.handleChange}/>
        <label className="inp-check-label one-line-ellipsis" htmlFor={`checkbox_${this.props.id}`}>{ this.props.label }</label>
      </div>
    );
  }
}

export default AppCheckbox;
