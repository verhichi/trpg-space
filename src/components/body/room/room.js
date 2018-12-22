import React, { Component } from 'react';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './room.scss';

class Room extends Component {
  render() {
    return (
      <div className="room-cont h-100">

        <div className="room-top-cont">
          <div className="tool-bar d-flex">
            <div className="f-grow-1">(2)Room ID: 123456</div>
            <div className="tool-bar-btn cursor-pointer">
              <FontAwesomeIcon icon="cog"/>
              <span className="d-none-sm"> Settings</span>
            </div>
          </div>
        </div>

        <div className="room-center-cont d-flex f-grow-1">
          <div className="char-list-cont">
            <div className="char-list-tool-bar d-flex">
              <div className="f-grow-1 align-center font-weight-bold text-dec-underline">Character List</div>
              <div className="cursor-pointer">
                <FontAwesomeIcon icon="plus-square"/>
                <span className="d-none-sm"> New</span>
              </div>
            </div>
            <div className="char-list h-100">
              <div className="char-cont w-100">
                <div className="char-head d-flex">
                  <div className="pr-1 cursor-pointer">
                    <FontAwesomeIcon icon="pen-square"/>
                  </div>
                  <div className="f-grow-1 font-weight-bold">Asumade</div>
                  <div className="cursor-pointer">
                    <FontAwesomeIcon icon="window-close"/>
                  </div>
                </div>
                <div className="char-body">
                  <div>
                    <FontAwesomeIcon icon="heart"/> 32 / 35
                  </div>
                  <div>
                    <FontAwesomeIcon icon="flask"/> 50 / 50
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="chat-log-cont h-100 w-100">
            <div className="chat-log">
              <div className="chat-log-head">
                <span className="chat-log-user">name</span>
                <span className="chat-log-time">4:21</span>
              </div>
              <div className="chat-log-body">
                Whats up nigga!
              </div>
            </div>
            <div className="chat-log">
              <div className="chat-log-head">
                <span className="chat-log-user">name2</span>
                <span className="chat-log-time">4:21</span>
              </div>
              <div className="chat-log-body">
                Hey!
              </div>
            </div>
          </div>
        </div>



        <div className="room-bottom-cont">
          <div className="chat-cont">
            <div className="chat-bar-btn cursor-pointer">
              <FontAwesomeIcon icon="address-card"/>
            </div>
            <div className="chat-bar-btn btn-hot cursor-pointer">
              <FontAwesomeIcon icon="dice"/>
            </div>
            <textarea className="chat-inp" placeholder="Enter text here"></textarea>
            <div className="chat-bar-btn btn-hot cursor-pointer">
              <FontAwesomeIcon icon="paper-plane"/>
              <span className="d-none-sm"> Send</span>
            </div>
          </div>
        </div>

        <div className="dice-help-balloon font-weight-bold is-active">
          <div class="dice-setting">
            Dice:
            <div className="sel-cont">
              <select name="dice-number">
                <option value="1">1</option>
                <option value="2" selected>2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            d
            <div className="sel-cont">
              <select name="dice-type">
                <option value="4">4</option>
                <option value="6" selected>6</option>
                <option value="8">8</option>
                <option value="10">10</option>
                <option value="12">12</option>
                <option value="20">20</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>
          <div className="dice-setting">
            Bonus:
            <div className="sel-cont">
              <select name="symbol">
                <option value="+" selected>+</option>
                <option value="-">-</option>
              </select>
            </div>
            <div className="sel-cont">
              <select name="modifier">
                <option value="0" selected>0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
          </div>
          <div className="">
            <input type="checkbox"/> Do not share result
          </div>
          <button className="btn btn-hot w-100 cursor-pointer">
            <div className="btn-text font-weight-bold">Roll</div>
          </button>

        </div>

      </div>
    );
  }
}

export default Room;
