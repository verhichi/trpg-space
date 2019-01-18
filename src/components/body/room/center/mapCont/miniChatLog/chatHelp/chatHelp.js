import React, { Component } from 'react';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// // Style
// import './chatHost.scss';

class ChatHelp extends Component {
  render() {
    return(
      <div className="chat-log mb-3 align-center">
        <div className="chat-log-system p-2 align-left">
          <div className="font-weight-bold">Click <FontAwesomeIcon icon="question-circle" /> for detailed help.</div>
          <div><FontAwesomeIcon icon="cog"/> to display room setting.</div>
          <div><FontAwesomeIcon icon="map-marked-alt"/> / <FontAwesomeIcon icon="comments"/> to toggle between chat and map view.</div>
          <div><FontAwesomeIcon icon="dice"/> to roll dice.</div>
          <div><FontAwesomeIcon icon="columns"/> to toggle sidebar.</div>
          <div><FontAwesomeIcon icon="door-open"/> to leave this room.</div>
        </div>
      </div>
    );

  }
}

export default ChatHelp;
