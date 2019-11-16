import React, { Component, Fragment, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { timeUpdateAudio, pauseAudio } from '../redux/actions/audio';

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

// audio el
const AUDIO_BGM_EL = document.querySelector('#audio_bgm');
const AUDIO_SE_EL = document.querySelector('#audio_se');

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { audioList: state.audioList };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    timeUpdateAudio: (id, curTime) => dispatch(timeUpdateAudio(id, curTime)),
    pauseAudio: (audio) => dispatch(pauseAudio(audio))
  };
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

    AUDIO_BGM_EL.addEventListener('timeupdate', (function(e){
      e.stopPropagation();
      this.props.timeUpdateAudio(AUDIO_BGM_EL.id, Math.round(AUDIO_BGM_EL.currentTime));
    }).bind(this));

    
    AUDIO_BGM_EL.addEventListener('ended', (function(e){
      e.stopPropagation();
      this.props.pauseAudio(AUDIO_BGM_EL.id);
      this.props.timeUpdateAudio(AUDIO_BGM_EL.id, 0);
    }).bind(this));

    AUDIO_SE_EL.addEventListener('timeupdate', (function(e){
      e.stopPropagation();
      this.props.timeUpdateAudio(AUDIO_SE_EL.id, Math.round(AUDIO_SE_EL.currentTime));
    }).bind(this));

    
    AUDIO_SE_EL.addEventListener('ended', (function(e){
      e.stopPropagation();
      this.props.pauseAudio(AUDIO_SE_EL.id);
      this.props.timeUpdateAudio(AUDIO_SE_EL.id, 0);
    }).bind(this));
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
export default connect(mapStateToProps, mapDispatchToProps)(App)