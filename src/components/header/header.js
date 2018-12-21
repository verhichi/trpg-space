import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './header.scss';

class Header extends Component {
  render() {
    return (
      <header>
        <div className="header-title">TRPG PARTY TOOL</div>
        <div className="header-help cursor-pointer">
          <FontAwesomeIcon icon="question-circle" />
        </div>
      </header>
    );
  }
}

export default Header;
