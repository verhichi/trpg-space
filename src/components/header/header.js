import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal } from '../../redux/actions/modal';
import { setAppLang } from '../../redux/actions/global';
import { MODAL_TYPE_HELP, APP_LANG_EN, APP_LANG_JP } from '../../constants/constants';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './header.scss';

// Redux state to prop
const mapStateToProps = (state) => {
  return { global: state.global };
};

// Redux Map Dispatch To Prop
const mapDispatchToProps = (dispatch) => {
  return {
    setAppLang: (lang)                 => dispatch(setAppLang(lang)),
    showModal:  (modalType, modalProp) => dispatch(showModal(modalType, modalProp))
  };
};

class Header extends Component {
  constructor (props){
    super(props);

    this.handleLangEnClick = this.handleLangEnClick.bind(this);
    this.handleLangJpClick = this.handleLangJpClick.bind(this);
    this.handleHelpClick   = this.handleHelpClick.bind(this);
  }

  handleHelpClick (e){
    this.props.showModal(MODAL_TYPE_HELP, {
      title:        'Help',
      displayClose: true
    });
  }

  handleLangEnClick (){
    this.props.setAppLang(APP_LANG_EN);
  }

  handleLangJpClick (){
    this.props.setAppLang(APP_LANG_JP);
  }

  render() {
    return (
      <header>
        <div className="header-title">TRPG PARTY TOOL</div>
        <div className="header-lang font-size-xl pl-2 pr-2 cursor-pointer" onClick={this.handleLangClick}>
          <FontAwesomeIcon icon="globe" />
          <div className="lang-list-cont">
            <div className="lang-cont" onClick={this.handleLangEnClick}>
              <div className="lang-check">
                {this.props.global.lang === APP_LANG_EN && <FontAwesomeIcon icon="check" />}
              </div>
              <div className="d-inline-block">English</div>
            </div>
            <div className="lang-cont" onClick={this.handleLangJpClick}>
              <div className="lang-check">
                {this.props.global.lang === APP_LANG_JP && <FontAwesomeIcon icon="check" />}
              </div>
              <div className="d-inline-block">日本語</div>
            </div>
          </div>
        </div>
        <div className="header-help pr-2 pl-2 font-size-xl cursor-pointer" onClick={this.handleHelpClick}>
          <FontAwesomeIcon icon="question-circle" />
        </div>
      </header>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
