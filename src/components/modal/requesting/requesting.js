import React, { Component } from 'react';

// Style
import './requesting.scss';

class Requesting extends Component {

  render() {

    return (
      <div className="h-100 d-flex f-align-items-center justify-content-center">
        <div className="loader-cont align-center loader-dark">
          <div className="loader-dice d-inline-block"></div>
          <div class="mt-2">Now Loading...</div>
        </div>
      </div>
    );
  }
}

export default Requesting;
