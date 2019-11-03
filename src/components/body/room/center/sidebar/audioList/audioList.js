import React, { Component, Fragment } from 'react';
// import { connect } from 'react-redux';

// // Font Awesome Component
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './audioList.scss';

// Component
import Audio from './audio/audio';


// // Redux Map State To Prop
// const mapStateToProps = (state) => {
//   return {
//     charList: state.charList,
//     global:   state.global
//   };
// };

// // Redux Map Dispatch To Props
// const mapDispatchToProps = (dispatch) => {
//   return { showModal: (modalType, modalProp) => dispatch(showModal(modalType, modalProp)) };
// };

class AudioList extends Component {
  // constructor (props){
  //   super(props);
  // }

  render() {
    return (
      <Fragment>
        <Audio src={'https://www.computerhope.com/jargon/m/example.mp3'}/>
      </Fragment>
    );
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(CharList);
export default AudioList;
