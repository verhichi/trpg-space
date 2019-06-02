import { DiceBotLoader } from 'bcdice-js'
import {
  APP_LANG_EN,
  APP_LANG_JP,
} from './constants'


export const diceBots = DiceBotLoader.collectDiceBots().map(diceBot => {
  return {
    name: {
      [APP_LANG_EN]: diceBot.gameType(),
      [APP_LANG_JP]: diceBot.gameName()
    },
    type: diceBot.gameType()
  }
})
