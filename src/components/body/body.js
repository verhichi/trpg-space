import React, { Component } from 'react';

// Routing
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';

// Style
import './body.scss';

// Components
import Lobby from './lobby/lobby'
import Room from './room/room'

class Body extends Component {
  render() {
    return (
      <main>
        <Router>
          <Switch>
            <Route exact path="/"  component={Lobby} />
            <Route exact path="/:roomId" component={Room} />
          </Switch>
        </Router>
      </main>
    );
  }
}

export default Body;
