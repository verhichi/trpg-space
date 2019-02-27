import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CHAR_PRIVACY_LEVEL_ZERO, CHAR_PRIVACY_LEVEL_ONE, CHAR_PRIVACY_LEVEL_TWO, CHAR_TYPE_ALLY, CHAR_TYPE_ENEMY } from '../../../../constants/constants';
import { charImageLabel, charTypeLabel, charTypeAllyLabel, charTypeEnemyLabel, charNameLabel, charColorLabel, charPrivacyLabel, privacyLevelZeroLabel, privacyLevelOneLabel, privacyLevelTwoLabel } from './general.i18n';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { global: state.global };
};


class General extends Component {
  render() {

    const toggleActiveClass = this.props.isActive ? 'is-active' : '';
    const toggleScrollClass = this.props.global.isMobile ? '' : 'hide-scroll';

    const privacyText = {
      [CHAR_PRIVACY_LEVEL_ZERO]: privacyLevelZeroLabel[this.props.global.lang],
      [CHAR_PRIVACY_LEVEL_ONE]:  privacyLevelOneLabel[this.props.global.lang],
      [CHAR_PRIVACY_LEVEL_TWO]:  privacyLevelTwoLabel[this.props.global.lang],
    };

    const typeText = {
      [CHAR_TYPE_ALLY]:  charTypeAllyLabel[this.props.global.lang],
      [CHAR_TYPE_ENEMY]: charTypeEnemyLabel[this.props.global.lang]
    };

    const imageStyle = this.props.general.image.length === 0
                         ? null
                         : { backgroundImage: `url(${this.props.general.image})`};

    return (
      <div className={`char-modal f-grow-1 ${toggleActiveClass} ${toggleScrollClass}`}>

        <div className="mb-2">
          <div>{charImageLabel[this.props.global.lang]}:</div>
          <div className="profile-circle d-inline-block" style={imageStyle}></div>
        </div>

        <div className="mb-2 font-size-lg">
          <div>{charNameLabel[this.props.global.lang]}:</div>
          <div className="pl-2">{this.props.general.name}</div>
        </div>

        <div className="mb-2 font-size-lg">
          <div>{charTypeLabel[this.props.global.lang]}:</div>
          <div className="pl-2">{typeText[this.props.general.type]}</div>
        </div>

        <div className="mb-2 font-size-lg">
          <div>{charColorLabel[this.props.global.lang]}:</div>
          <div className="pl-2 d-flex p-relative w-100">
            <div className="inp-clr-circle f-shrink-0" style={{background: this.props.general.color}}></div>
            <div className="pseudo-inp f-grow-1">{this.props.general.color}</div>
          </div>
        </div>

        <div className="mb-2 font-size-lg">
          <div>{charPrivacyLabel[this.props.global.lang]}:</div>
          <div className="pl-2">{privacyText[this.props.general.privacy]}</div>
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps)(General);
