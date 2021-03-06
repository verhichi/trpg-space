import React, { Component } from 'react';
import { CHAR_PRIVACY_LEVEL_ZERO, STATUS_TYPE_VALUE } from '../../../../constants/constants';
import { connect } from 'react-redux';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { global: state.global };
};

class Detail extends Component {
  render() {

    const toggleActiveClass = this.props.isActive ? 'is-active' : '';
    const toggleScrollClass = this.props.global.isMobile ? '' : 'hide-scroll';
    const showStat = this.props.privacy <= CHAR_PRIVACY_LEVEL_ZERO || this.props.ownerId === this.props.global.id;

    const detailList = this.props.detail.map(detail => {
      if (detail.type === STATUS_TYPE_VALUE){
        return (
          <div className="stat-inp-cont mb-1 font-size-lg">
            <span className="font-weight-bold">{detail.label}</span>: {showStat ? detail.value : '???'}
          </div>
        );
      } else {
        return (
          <div className="stat-inp-cont mb-1 font-size-lg">
            <span className="font-weight-bold">{detail.label}</span>: {showStat ? detail.value : '???'} / {showStat ? detail.maxValue : '???'}
          </div>
        );
      }
    });

    return (
        <div className={`char-modal f-grow-1 ${toggleActiveClass} ${toggleScrollClass}`}>

          {detailList.length === 0
            ? (<div className="align-center p-2">No Details</div>)
            : detailList }

        </div>
    );
  }
}

export default connect(mapStateToProps)(Detail);
