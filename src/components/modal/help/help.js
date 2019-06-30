import React, { Component, Fragment, lazy, Suspense } from 'react';
import { connect } from 'react-redux';

// Style
import './help.scss';

// Component
import Loader from '../../loader/loader'
const General = lazy(() => import('./topics/general'));
const HowToStart = lazy(() => import('./topics/howToStart'));
const HowToRollDice = lazy(() => import('./topics/howToRollDice'));
const HowToManageChar = lazy(() => import('./topics/howToManageChar'));
const HowToManageNote = lazy(() => import('./topics/howToManageNote'));
const HowToManageMap = lazy(() => import('./topics/howToManageMap'));

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { global: state.global };
};


class Help extends Component {
  constructor (props){
    super(props);
    this.state = { topic: 'general' };

    this.handleTopicChange = this.handleTopicChange.bind(this);
  }

  handleTopicChange (e){
    this.setState({ topic: e.target.value });
  }

  render() {
    const helpTopic = {
      general: <General lang={this.props.global.lang}/>,
      howToStart: <HowToStart lang={this.props.global.lang}/>,
      howToRollDice: <HowToRollDice lang={this.props.global.lang}/>,
      howToManageChar: <HowToManageChar lang={this.props.global.lang}/>,
      howToManageNote: <HowToManageNote lang={this.props.global.lang}/>,
      howToManageMap: <HowToManageMap lang={this.props.global.lang}/>,
    };

    return (
      <Fragment>
        <div className="mb-3">
          <div>Select help topic:</div>
          <div className="sel-cont balloon-sel w-100">
            <select className="border" value={this.state.topic} onChange={this.handleTopicChange}>
              <option value="general">General</option>
              <option value="howToStart">How to start</option>
              <option value="howToRollDice">How to roll the dice</option>
              <option value="howToManageChar">How to manage characters</option>
              <option value="howToManageNote">How to manage notes</option>
              <option value="howToManageMap">How to manage boards</option>
            </select>
          </div>
        </div>
        <div className="d-flex f-dir-col f-grow-1 overflow-y-auto">
          <Suspense fallback={<Loader/>}>
            { helpTopic[this.state.topic] }
          </Suspense>
        </div>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(Help);
