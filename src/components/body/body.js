import React, { Component } from 'react';

// Routing
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';

// Style
import './body.scss';

// Components
import Lobby from './lobby/lobby';

class Body extends Component {
  render() {
    return (
      <main>
        <Router>
          <Switch>
            <Route component={Lobby} />
          </Switch>
        </Router>
      </main>
    );
  }
}

export default Body;
