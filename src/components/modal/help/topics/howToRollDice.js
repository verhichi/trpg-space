import React, { Component, Fragment } from 'react';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class HowToRollDice extends Component {
  render() {
    return (
      <Fragment>
        <div className="mb-3">
          <div className="border-bottom mb-2">
            <h2 className="m-0">How to roll the dice</h2>
          </div>
          <div className="m-0">
            There are 2 ways to roll the dice:
            <ul>
              <li>Dice tool on the bottom-left corner</li>
              <li>Entering specific text into the chat input(Dice Bot)</li>
            </ul>
            All dice roll results are displayed on chat.
          </div>
        </div>

        <div className="mb-3">
          <div className="border-bottom mb-2">
            <h2 className="m-0">Using the Dice Tool</h2>
          </div>
          <div>
            Just click on the <FontAwesomeIcon icon="dice"/> to toggle the Dice Tool.
            <br/>Then just change the dice setting to your liking and click the "Roll" button to roll.
            <br/>
            <br/>Here are 2 input examples and what they represent:
            <br/>
            <br/>Dice: 2 d 6 (Roll 2, 6-sided dies)
            <br/>Bonus: + 2 (Then add 2 to the result)
            <br/>[x] Share Dice Roll (Share the dice roll result and total to everyone in the room)
            <br/>
            <br/>Dice: 3 d 12 (Roll 3, 12-sided dies)
            <br/>Bonus: - 3 (Then subtract 3 from the result)
            <br/>[ ] Share Dice Roll (Keep the dice roll result and total to yourself, noone else can see it)
          </div>
        </div>

        <div className="mb-3">
          <div className="border-bottom mb-2">
            <h2 className="m-0">Using the Dice Bot</h2>
          </div>
          <div>
            For more keyboard-centered users; you can roll the dice just by typing it in the chat.
            <br/>It's really simple, written below is what you need to type in:
            <br/>
            <br/><b>n</b>d<b>s</b>
            <br/>The <b>n</b> represents the number of dies.
            <br/>The <b>s</b> represents how many sides each dice has.
            <br/>
            <br/>Ex:
            <br/><b>2</b>d<b>6</b> = "Rolling 2, 6-sided dies"
            <br/><b>3</b>d<b>8</b> = "Rolling 3, 8-sided dies"
            <br/>
            <br/>
            <br/>If you would like to keep the dice roll result to yourself, just prepend a <b>s</b> (for secret)
            <br/>Otherwise it will be shared with everyone in the room.
            <br/>
            <br/>Ex:
            <br/>s<b>2</b>d<b>6</b> = "Rolling 2, 6-sided dies and keeping the result to yourself"
            <br/><b>3</b>d<b>8</b> = "Rolling 3, 8-sided dies and sharing the result to evyerone in the room"
            <br/>
            <br/>
            <br/>If you would like add or subtract from the dice roll result, just append a <b>+</b> or <b>-</b> and then a number.
            <br/>
            <br/>Ex:
            <br/><b>2</b>d<b>6</b><b>+2</b> = "Rolling 2, 6-sided dies and add 2 to the result"
            <br/><b>3</b>d<b>8</b><b>-10</b> = "Rolling 3, 8-sided dies and subtract 10 from the result"
          </div>
        </div>
      </Fragment>
    );
  }
}

export default HowToRollDice;
