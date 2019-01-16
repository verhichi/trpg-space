import React, { Component } from 'react';
import { connect } from 'react-redux';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    isMobile:     state.isMobile,
    id:           state.id,
    modalSetting: state.modalSetting
  };
};

class Detail extends Component {
  render() {

    const toggleActiveClass = this.props.isActive ? 'is-active' : '';
    const toggleScrollClass = this.props.isMobile ? '' : 'hide-scroll';
    const showStat = this.props.privacy <= 0 || this.props.ownerId === this.props.id;

    const detailList = this.props.detail.map(detail => {

      if (detail.type === 'value'){
        return (
          <div className="stat-inp-cont d-flex mb-2 font-size-lg">
            <span className="font-weight-bold">{detail.label}</span>: {showStat ? detail.value : '???'}
          </div>
        );
      } else {
        return (
          <div className="stat-inp-cont d-flex mb-2 font-size-lg">
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
