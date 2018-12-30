import React, { Component, Fragment } from 'react';

// Font Awesome Library
import '../fontAwesome/fontAwesome.js';

// Styles
import '../styles/normalize.css';
import '../styles/styles.scss';

// Components
import Header from './header/header';
import Body from './body/body';
import Modal from './modal/modal';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header/>
        <Body/>
        <Modal/>
      </Fragment>
    );
  }
}

export default App;
