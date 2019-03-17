import {
  DICE_BOT_REGEXP,
  CHAT_TYPE_TEXT,
  CHAT_TYPE_ROLL
} from '../constants/constants';

import { getDiceRollResult } from './roll';

// Parse Text to see what type of message it is
export const parseMessageType = (message) => {
  const parseMessageDice = message.match(DICE_BOT_REGEXP);

  if (parseMessageDice){
    const diceConfig = {
      diceNumber: parseMessageDice[2],
      diceType:   parseMessageDice[3],
      symbol:     parseMessageDice[5] || '+',
      modifier:   parseMessageDice[6] || '0'
    };

    return {
      ...getDiceRollResult(diceConfig),
      type: CHAT_TYPE_ROLL,
      private: !!parseMessageDice[1],
      diceSetting: parseMessageDice[2] + 'd' + parseMessageDice[3]
    };
  }

  return { type: CHAT_TYPE_TEXT };
};
