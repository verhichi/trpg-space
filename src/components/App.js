import React, { Component, Fragment } from 'react';

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
