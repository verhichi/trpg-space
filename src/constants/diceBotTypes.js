import { DiceBotLoader } from 'bcdice-js'
import {
  APP_LANG_EN,
  APP_LANG_JP,
} from './constants'


const diceBotDesc = DiceBotLoader.collectDiceBotDescriptions();


const diceBotNameSort = (val1, val2) => {
  if (val1.name.toUpperCase() < val2.name.toUpperCase()){
    return -1;
  }
  if (val1.name.toUpperCase() > val2.name.toUpperCase()){
    return 1;
  }
  return 0;
}


const diceBotsEn = diceBotDesc.map(diceBot => {
    return {
      type: diceBot[0],
      name: diceBot[1],
    }
  }).sort(diceBotNameSort);


const diceBotsJp = diceBotDesc.map(diceBot => {
    return {
      type: diceBot[0],
      name: diceBot[2],
    }
  }).sort(diceBotNameSort);


export const diceBotList = {
  [APP_LANG_EN]: diceBotsEn,
  [APP_LANG_JP]: diceBotsJp
};
