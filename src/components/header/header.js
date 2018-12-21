import React, { Component } from 'react';

import './header.scss';

class Header extends Component {
  render() {
    return (
      <header>
        <div className="header-title">TRPG PARTY TOOL</div>
        <div className="header-help">HELP</div>
      </header>
    );
  }
}

export default Header;
