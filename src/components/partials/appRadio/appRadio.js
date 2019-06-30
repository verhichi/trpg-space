import React, { Component } from 'react';

// Style
import './appRadio.scss';

/**
 *  @props id           - [string] id used for htmlfor
 *  @props className    - [string] additional classes for container
 *  @props checked      - [boolean] is checkbox checked
 *  @props value        - [string] value
 *  @props label        - [string] label
 *  @props handleChange - [func]   what to do when a user edits the meter(while user is moving it)
 */
class AppRadio extends Component {
  constructor (props){
    super (props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (e){
    this.props.handleChange(e)
  }

  render() {
    return (
      <div className={`inp-radio-cont cursor-pointer d-flex f-align-items-center p-relative ${this.props.className}`}>
        <input className="inp-radio p-absolute" type="radio" value={this.props.value} checked={this.props.checked} id={`radio_${this.props.id}`} onChange={this.handleChange}/>
        <label className="inp-radio-label one-line-ellipsis" htmlFor={`radio_${this.props.id}`}>{ this.props.label }</label>
      </div>
    );
  }
}

export default AppRadio;
