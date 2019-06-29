import React, { Component, Fragment } from 'react';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class HowToManageMap extends Component {
  render() {
    return (
      <Fragment>
        <div className="mb-3">
          <div className="border-bottom mb-2">
            <h2 className="m-0">How do I view my boards?</h2>
          </div>
          <div>
            Easy! Click the <FontAwesomeIcon icon="map-marked-alt"/> to toggle the board view.
            <br/>If any boards have been set, they will appear as tabs(unless the owner of the board doesn't want to share it).
            <br/>To view the board, simple click on the tab that you want to view.
          </div>
        </div>

        <div className="mb-3">
          <div className="border-bottom mb-2">
            <h2 className="m-0">How do I create a board?</h2>
          </div>
          <div>
            Just click the <FontAwesomeIcon icon="plus"/> button!
            <br/>Once clicked, a board creation menu will open.
            <br/>Users will be able to create their own board.
          </div>
        </div>

        <div className="mb-3">
          <div className="border-bottom mb-2">
            <h2 className="m-0">How do I edit a board?</h2>
          </div>
          <div>
            Just click the <FontAwesomeIcon icon="pen-square"/> button!
            <br/>Once clicked, a board edit menu will open.
            <br/>Users will be able to edit their own board.
          </div>
        </div>

        <div className="mb-3">
          <div className="border-bottom mb-2">
            <h2 className="m-0">How do I delete a board?</h2>
          </div>
          <div>
            Just click the <FontAwesomeIcon icon="window-close"/> button!
            <br/>Once clicked, a confirm window will open.
            <br/>Your board will be deleted after you confirm your deletion.
          </div>
        </div>

        <div className="mb-3">
          <div className="border-bottom mb-2">
            <h2 className="m-0">How do I export a board?</h2>
          </div>
          <div>
            Just click the <FontAwesomeIcon icon="file-export"/> button!
            <br/>Once clicked, the download will start.
          </div>
        </div>

        <div className="mb-3">
          <div className="border-bottom mb-2">
            <h2 className="m-0">How do I import a board?</h2>
          </div>
          <div>
            Just click the <FontAwesomeIcon icon="file-import"/> button!
            <br/>Once clicked, an upload window will open.
            <br/>Upload your board file.
          </div>
        </div>
      </Fragment>
    );
  }
}

export default HowToManageMap;
