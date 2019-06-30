import React, { Component, Fragment } from 'react';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class HowToManageNote extends Component {
  render() {
    return (
      <Fragment>
        <div className="mb-3">
          <div className="border-bottom mb-2">
            <h2 className="m-0">How do I view my notes?</h2>
          </div>
          <div>
            Easy! Click the <FontAwesomeIcon icon="columns"/> to toggle the sidebar.
            <br/>Then click the <FontAwesomeIcon icon="sticky-note"/> tab to display the notes view.
            <br/>All notes made by users in the room will be listed here.
          </div>
        </div>

        <div className="mb-3">
          <div className="border-bottom mb-2">
            <h2 className="m-0">How do I create a note?</h2>
          </div>
          <div>
            Just click the "Create Note" button!
            <br/>Once clicked, a note creation menu will open.
            <br/>Users will be able to create their own note.
          </div>
        </div>

        <div className="mb-3">
          <div className="border-bottom mb-2">
            <h2 className="m-0">How do I edit a note?</h2>
          </div>
          <div>
            Just click the <FontAwesomeIcon icon="pen-square"/> button!
            <br/>Once clicked, a note edit menu will open.
            <br/>Where users will be able to edit their own note.
          </div>
        </div>

        <div className="mb-3">
          <div className="border-bottom mb-2">
            <h2 className="m-0">How do I delete a note?</h2>
          </div>
          <div>
            Just click the <FontAwesomeIcon icon="window-close"/> button!
            <br/>Once clicked, a confirm window will open.
            <br/>Your note will be deleted after you confirm your deletion.
          </div>
        </div>

        <div className="mb-3">
          <div className="border-bottom mb-2">
            <h2 className="m-0">How do I export a note?</h2>
          </div>
          <div>
            Just click the <FontAwesomeIcon icon="file-export"/> button!
            <br/>Once clicked, the download will start.
          </div>
        </div>

        <div className="mb-3">
          <div className="border-bottom mb-2">
            <h2 className="m-0">How do I import a note?</h2>
          </div>
          <div>
            Just click the <FontAwesomeIcon icon="file-import"/> button!
            <br/>Once clicked, an upload window will open.
            <br/>Upload your note file.
          </div>
        </div>
      </Fragment>
    );
  }
}

export default HowToManageNote;
