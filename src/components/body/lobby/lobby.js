import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MODAL_TYPE_NEW_USER, APP_LANG_EN, APP_LANG_JP } from '../../../constants/constants';
import { lobbyInpJoinLabel, lobbyInpJoinBtnLabel, lobbyInpCreateLabel, lobbyInpCreateBtnLabel, lobbyNameInpModalTitle, lobbySection01Title, lobbySection01Text, lobbySection02Title, lobbySection02Text1, lobbySection02Text2, lobbySection02Text3, lobbySection02Text4, lobbySection03Title, lobbySection03Text } from './lobby.i18n';
import { showModal } from '../../../redux/actions/modal';
import { resetState } from '../../../redux/actions/global';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './lobby.scss';

const mapStateToProps = (state) => {
  return { global: state.global };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    resetState: ()                     => dispatch(resetState()),
    showModal:  (modalType, modalProp) => dispatch(showModal(modalType, modalProp))
  };
};

class Lobby extends Component {
  constructor (props){
    super(props);
    this.state = {
      roomId: '',
      imageIdx: 0
    };
    this.intervalKey = null;

    this.setImageIdx        = this.setImageIdx.bind(this);
    this.handleNewClick     = this.handleNewClick.bind(this);
    this.handleJoinClick    = this.handleJoinClick.bind(this);
    this.handleRoomIdChange = this.handleRoomIdChange.bind(this);
  }

  componentDidMount (){
    this.props.resetState();
    this.intervalKey = setInterval(this.setImageIdx, 5000);
  }

  componentWillUnmount (){
    clearInterval(this.intervalKey);
  }

  setImageIdx (){
    let curIdx = this.state.imageIdx;
    this.setState({ imageIdx: ++curIdx % 2 });
  }  

  handleNewClick (e){
    this.props.showModal(MODAL_TYPE_NEW_USER, {
      title:        lobbyNameInpModalTitle[this.props.global.lang],
      displayClose: true,
      host:         true,
      redirect:     this.props.history.push.bind(this)
    });
  }

  handleJoinClick (e){
    this.props.showModal(MODAL_TYPE_NEW_USER, {
      title:        lobbyNameInpModalTitle[this.props.global.lang],
      displayClose: true,
      host:         false,
      roomId:       this.state.roomId,
      redirect:     this.props.history.push.bind(this)
    });
  }

  handleRoomIdChange (e){
    this.setState({ roomId: e.target.value.trim() });
  }

  render() {
    const isDisabled = this.state.roomId.trim().length === 0;
    const imgList = {
      [APP_LANG_EN]: [require('../../../styles/images/img1_en.png'), require('../../../styles/images/img2_en.png')],
      [APP_LANG_JP]: [require('../../../styles/images/img1_jp.png'), require('../../../styles/images/img2_jp.png')]
    };

    const imgElList = imgList[this.props.global.lang].map((src, idx) => {
      const displayClass = idx === this.state.imageIdx ? 'is-active' : '';
      return <img className={`lobbySection02Img ${displayClass}`} src={src} alt="lobbyImg"/>
    });

    return (
      <div className="lobby-bg h-100 p-relative">

        <section className="d-flex f-dir-col h-100 p-relative">
          <div className="lobby-cont f-grow-1">
            <div>
              <div className="lobby-inp-cont">
                <div className="lobby-inp-label">{lobbyInpJoinLabel[this.props.global.lang]}</div>
                <div><input className="inp w-100" type="text" onChange={this.handleRoomIdChange}/></div>
                <button className="btn btn-hot w-100 cursor-pointer" disabled={isDisabled} onClick={this.handleJoinClick}>
                  <div>
                    <span class="mr-3"><FontAwesomeIcon icon="sign-in-alt"/></span>
                    {lobbyInpJoinBtnLabel[this.props.global.lang]}
                  </div>
                </button>
              </div>

              <div className="align-center">or</div>

              <div className="lobby-inp-cont">
                <div className="lobby-inp-label">{lobbyInpCreateLabel[this.props.global.lang]}</div>
                <button className="btn btn-hot w-100 cursor-pointer" onClick={this.handleNewClick}>
                  <div>
                    <span class="mr-3"><FontAwesomeIcon icon="tools"/></span>
                    {lobbyInpCreateBtnLabel[this.props.global.lang]}
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="align-center text-white font-size-lg">
            <span className="lobby-scroll-down-icon d-inline-block">
              <FontAwesomeIcon icon="angle-double-down"/>
            </span>
          </div>
        </section>

        <section className="lobbySection01 border-bottom border-tertiary">
          <div className="align-center font-weight-bold font-size-xl m-3">
            { lobbySection01Title[this.props.global.lang] }
          </div>
          <div className="lobbySection01Text font-size-lg">
            { lobbySection01Text[this.props.global.lang] }
          </div>
        </section>

        <section className="lobbySection02 border-bottom border-tertiary">
          <div className="lobbySection02Inner">
            <div className="lobbySection02Text">
              <div className="align-center font-weight-bold font-size-xl mb-3">
                { lobbySection02Title[this.props.global.lang] }
              </div>
              <div className="font-size-lg">
                { lobbySection02Text1[this.props.global.lang] }
                <br/>
                <br/>{ lobbySection02Text2[this.props.global.lang] }
                <br/>
                <br/>{ lobbySection02Text3[this.props.global.lang] }
                <br/>
                <br/>{ lobbySection02Text4[this.props.global.lang] }
              </div>
            </div>
            {imgElList}
          </div>
        </section>

        <section className="lobbySection03">
          <div className="align-center font-weight-bold font-size-xl m-3">
            { lobbySection03Title[this.props.global.lang] }
          </div>
          <div className="lobbySection03Text font-size-lg">
            { lobbySection03Text[this.props.global.lang] }
          </div>
          <div className="lobbySection03ThreeCard">
            <div className="lobbySection03Card">
              <div className="lobbySection03CardIcon">
                <FontAwesomeIcon icon="mobile-alt"/>
              </div>
              <div className="lobbySection03CardText">
                Mobile
              </div>
            </div>

            <div className="lobbySection03Card">
              <div className="lobbySection03CardIcon">
                <FontAwesomeIcon icon="tablet-alt"/>
              </div>
              <div className="lobbySection03CardText">
                Tablet
              </div>
            </div>

            <div className="lobbySection03Card">
              <div className="lobbySection03CardIcon">
                <FontAwesomeIcon icon="desktop"/>
              </div>
              <div className="lobbySection03CardText">
                Desktop
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-black text-white align-center p-3">
          &copy; verhichi 2019
        </footer>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
