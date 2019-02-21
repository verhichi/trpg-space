import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// Font Awesome Library
import '../fontAwesome/fontAwesome.js';

// Styles
import '../styles/normalize.css';
import '../styles/styles.scss';

// Components
import Header from './header/header';
import Body   from './body/body';
import Modal  from './modal/modal';
import Notice from './notice/notice';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { noticeSetting: state.noticeSetting };
};

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
      <Fragment>
        <Header/>
        <Body/>
        <Modal/>
        {this.props.noticeSetting.display && <Notice/>}
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(App);
