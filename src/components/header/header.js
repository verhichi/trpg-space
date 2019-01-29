import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal } from '../../redux/actions/modal';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './header.scss';

// Redux Map State To Prop
const mapDispatchToProps = (dispatch) => {
  return { showModal: (modalType, modalProp) => dispatch(showModal(modalType, modalProp)) };
};

class Header extends Component {
  constructor (props){
    super(props);
    this.handleHelpClick = this.handleHelpClick.bind(this);
  }

  handleHelpClick (e){
    this.props.showModal('help', {
      title: 'Help',
      displayClose: true
    });
  }

  render() {
    return (
      <header>
        <div className="header-title">TRPG PARTY TOOL</div>
        <div className="header-help cursor-pointer" onClick={this.handleHelpClick}>
          <FontAwesomeIcon icon="question-circle" />
        </div>
      </header>
    );
  }
}

export default connect(null, mapDispatchToProps)(Header);
