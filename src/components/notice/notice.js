import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NOTICE_TYPE_EXPIRE } from '../../constants/constants';

// Style
import './notice.scss';

import Expire from './expire/expire';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { noticeSetting: state.noticeSetting };
};

class Notice extends Component {
  render() {
    const noticeBody = {
      [NOTICE_TYPE_EXPIRE]: <Expire/>
    };

    const toggleClass = this.props.noticeSetting.display ? 'is-active' : '';

    return (
      <div className={`room-notice ${toggleClass}`}>
        {noticeBody[this.props.noticeSetting.noticeType]}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Notice);
