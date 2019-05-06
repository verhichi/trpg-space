import React, { Component, lazy, Suspense } from 'react';

// Routing
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';

// Style
import './body.scss';

// // Components
import Loader from './loader/loader';
const Lobby = (lazy(() => (import('./lobby/lobby'))));
const Room = (lazy(() => (import('./room/room'))));

class Body extends Component {
  render() {
    return (
      <main>
        <Router>
          <Suspense fallback={<Loader/>}>
            <Switch>
              <Route exact path="/"  component={Lobby} />
              <Route exact path="/:roomId" component={Room} />
            </Switch>
          </Suspense>
        </Router>
      </main>
    );
  }
}

export default Body;
