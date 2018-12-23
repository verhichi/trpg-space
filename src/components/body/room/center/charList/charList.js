import React, { Component } from 'react';
import { connect } from 'react-redux';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './charList.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return {
    id: state.id,
    showCharList: state.showCharList ,
    charList: state.charList
  };
};

class CharList extends Component {
  render() {
    const toggleClass = this.props.showCharList ? 'is-active' : '';

    const charList = this.props.charList.map((char, idx) => {
      return(
        <div className="char-cont w-100">
          <div className="char-head d-flex">
            <div className="pr-1 cursor-pointer">
              <FontAwesomeIcon icon="pen-square"/>
            </div>
            <div className="f-grow-1 font-weight-bold">{char.name}</div>
            <div className="cursor-pointer">
              <FontAwesomeIcon icon="window-close"/>
            </div>
          </div>
          <div className="char-body">
            <div>
              <FontAwesomeIcon icon="heart"/> {char.curHp} / {char.maxHp}
            </div>
            <div>
              <FontAwesomeIcon icon="flask"/> {char.curMp} / {char.maxMp}
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className={`char-list-cont ${toggleClass}`}>
        <div className="char-list-tool-bar d-flex">
          <div className="f-grow-1 align-center font-weight-bold text-dec-underline">Character List</div>
          <div className="cursor-pointer">
            <FontAwesomeIcon icon="plus-square"/>
            <span className="d-none-sm"> New</span>
          </div>
        </div>
        <div className="char-list h-100">
          {charList}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CharList);
