import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { hideNotice } from '../../../redux/actions/notice';
import { oneHourLeftMsg, hostExtendMsg } from './expire.i18n';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './expire.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { global: state.global };
};

// Redux Map Dispatch To Prop
const mapDispatchToProps = (dispatch) => {
  return { hideNotice: () => dispatch(hideNotice()) };
};

class Expire extends Component {
  constructor (props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (e){
    e.preventDefault();
    this.props.hideNotice();
  }

  render() {
    return (
      <Fragment>
        <div className="notice-icon p-1 pr-2">
          <FontAwesomeIcon icon="exclamation-circle"/>
        </div>
        <div>
          <div>{oneHourLeftMsg[this.props.global.lang]}</div>
          <div>{hostExtendMsg[this.props.global.lang]}</div>
        </div>
        <div className="notice-icon p-1 pl-2 cursor-pointer" onClick={this.handleClick}>
          <FontAwesomeIcon icon="times"/>
        </div>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Expire);
