import React, { Component, Fragment } from 'react';

// Style
import './statusInput.scss';

/**
 *  @props statId      - [String] id of status to change
 *  @props value       - [string] numerator value
 *  @props onChange    - [func]   what to do when a user edits the meter(while user is moving it)
 *  @props onChangeEnd - [func]   what to do when a user finishes editting the meter
 */
class StatusInput extends Component {
  constructor (props){
    super (props);
    this.inpRef = React.createRef();
    this.state = { isFocused: false };

    this.handleChange  = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleBlur    = this.handleBlur.bind(this);
    this.handleClick   = this.handleClick.bind(this);
  }

  handleClick (e){
    e.preventDefault();
    e.stopPropagation();

    this.setState({ isFocused: true }, () => {
      this.inpRef.current.focus();
    });
  }

  handleKeyDown (e){
    if (e.which === 13 && this.props.value.trim().length !== 0){
      e.preventDefault();
      this.inpRef.current.blur();
    }
  }

  handleChange (e){
    e.preventDefault();
    this.props.onChange(this.props.statId, e.target.value);
  }

  handleBlur (e){
    if (this.props.value.trim().length !== 0){
      this.setState({ isFocused: false });
      this.props.onChangeEnd(this.props.statId, this.props.value);
    }
  }

  render() {
    const showOnFocusClass = this.state.isFocused ? '' : 'd-none';
    const hideOnBlurClass = this.state.isFocused ? 'd-none' : '';

    return (
      <Fragment>
        <input ref={this.inpRef} className={`char-stat-inp ${showOnFocusClass}`} type="text" value={this.props.value} onChange={this.handleChange} onBlur={this.handleBlur} onKeyDown={this.handleKeyDown}/>
        <span className={`char-stat-text ${hideOnBlurClass}`} onClick={this.handleClick}>{this.props.value}</span>
      </Fragment>
    );
  }
}

// export default Confirm;
export default StatusInput;
