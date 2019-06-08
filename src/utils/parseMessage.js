import {
  CHAT_TYPE_TEXT,
  CHAT_TYPE_ROLL
} from '../constants/constants';

import bcdice from '../bcdice/bcdiceBot'

// Parse Text to see what type of message it is
export const parseMessageType = (message) => {
  const parseMessageDice = bcdice.getDiceResult(message);

  if (parseMessageDice){
    return {
      result: parseMessageDice[0],
      type: CHAT_TYPE_ROLL,
      private: !!parseMessageDice[1]
    };
  }

  return { type: CHAT_TYPE_TEXT };
};
