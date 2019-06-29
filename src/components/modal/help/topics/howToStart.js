import React, { Component, Fragment } from 'react';

class HowToStart extends Component {
  render() {
    return (
      <Fragment>
        <div className="mb-3">
          <div className="border-bottom mb-2">
            <h2 className="m-0">How do I start?</h2>
          </div>
          <div>
            Easy! Just create a room and invite your friends by sharing the Room ID.
            <br/><br/>
            If you're the one being invited, just enter the Room ID and join the room.
          </div>
        </div>

        <div className="mb-3">
          <div className="border-bottom mb-2">
            <h2 className="m-0">How do I create a room?</h2>
          </div>
          <div>
            Also easy! Just click the "Start New Room" button!
          </div>
        </div>

        <div className="mb-3">
          <div className="border-bottom mb-2">
            <h2 className="m-0">How do I join a room?</h2>
          </div>
          <div>
            Again, easy! Just enter the Room ID and click the "Join Existing Room" button!
          </div>
        </div>
      </Fragment>
    );
  }
}

export default HowToStart;
