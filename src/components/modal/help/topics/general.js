import React, { Component, Fragment } from 'react';

class General extends Component {
  render() {
    return (
      <Fragment>
        <div className="mb-3">
          <div className="border-bottom mb-2">
            <h2 className="m-0">What is this?</h2>
          </div>
          <div className="m-0">
            Free responsive web application for private online TRPG sessions that anyone can use without having to subscribe. Comes with real-time chat, multilingual support(English and Japanese), and basic TRPG functionalities.
          <br/><br/>
            Seriously, it's free and you don't need to make accounts and stuff. Just try it out.
          </div>
        </div>

        <div className="mb-3">
          <div className="border-bottom mb-2">
            <h2 className="m-0">What can I do?</h2>
          </div>
          <div>
            <span className="mb-1">Listed below are some of the functionalities that are available within this tool.</span>
            <ul>
              <li className="mb-1">
                <p className="m-0">Multilingual Support</p>
                <ul>
                  <li>English</li>
                  <li>Japanese</li>
                </ul>
              </li>
              <li className="mb-1">
                <p className="m-0">Private session rooms</p>
                <ul>
                  <li>creating rooms</li>
                  <li>joining rooms</li>
                  <li>manage users in room (eg. kick users)</li>
                </ul>
              </li>
              <li className="mb-1">
                <p className="m-0">Role-play with users in the same room</p>
                <ul>
                  <li>
                    Real-time Chat
                    <ul>
                      <li>sending text</li>
                      <li>sending images</li>
                      <li>public and private chat settings</li>
                    </ul>
                  </li>
                  <li>Dice Rolling
                    <ul>
                      <li>intuitive GUI dice roll interface</li>
                      <li>public and private dice roll settings</li>
                      <li>chat activated dice roll(widely known as: Dice Bot)</li>
                    </ul>
                  </li>
                  <li>Character
                    <ul>
                      <li>intuitive character creation</li>
                      <li>public and private character settings</li>
                      <li>importing / exporting characters</li>
                    </ul>
                  </li>
                  <li>Map
                    <ul>
                      <li>creating multiple maps and organizing them by tabs</li>
                      <li>hiding areas of maps through map-masks</li>
                      <li>placing characters onto maps and moving them around</li>
                      <li>importing / exporting maps</li>
                    </ul>
                  </li>
                  <li>
                    Note
                    <ul>
                      <li>creating and sharing multiple rich-text notes</li>
                      <li>importing / exporting notes</li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default General;
