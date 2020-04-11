import React, { Component, Fragment, lazy, Suspense } from 'react';

// Font Awesome Library
import '../fontAwesome/fontAwesome.js';

// Styles
import '../styles/normalize.css';
import '../styles/styles.scss';

// Components
import Loader from './loader/loader'
const Header = lazy(() => import('./header/header'));
const Body   = lazy(() => import('./body/body'));
const Modal  = lazy(() => import('./modal/modal'));

class App extends Component {
  constructor (props){
    super(props);
    window.addEventListener('touchmove', function(e){
      e.preventDefault();
    }, {passive: false} );

    document.querySelector('#root').addEventListener('touchmove', function (e){
      e.stopPropagation();
    });
  }

  render() {
    return (
      <Suspense fallback={<Loader/>}>
        <Fragment>
          <Header/>
          <Body/>
          <Modal/>
        </Fragment>
      </Suspense>
    );
  }
}

// export default App;
export default App