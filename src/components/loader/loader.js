import React, { Component } from 'react';

// Style
import './loader.scss';

class Loader extends Component {
  render() {
    return (
      <div className="h-100 d-flex f-align-items-center justify-content-center">
        <div className="loader-cont align-center">
          <div className="loader-dice d-inline-block"></div>
          <div className="mt-2">Now Loading...</div>
        </div>
      </div>
    );
  }
}

export default Loader;
