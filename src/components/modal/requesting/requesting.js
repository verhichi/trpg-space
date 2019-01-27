import React, { Component } from 'react';

// Style
import './requesting.scss';

class Requesting extends Component {

  render() {

    return (
      <div className="requesting-cont d-flex f-grow-1">
        <div>
          <div className="requesting-circle"></div>
          <div className="align-center font-size-xl mt-3">Loading...Please wait...</div>
        </div>
      </div>
    );
  }
}

export default Requesting;
