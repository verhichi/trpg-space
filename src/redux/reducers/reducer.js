import { ADD_TO_CHAT_LOG, TOGGLE_CHAR_LIST, TOGGLE_DICE_BUBBLE } from '../constants/actionTypes';

const initialState = {
  id: '123456',
  showCharList: false,
  showDiceSetting: false,
  chatLog: [],
  charList: [{
    charId: '3545345235',
    ownerId: '123456',
    name: 'Asumade1',
    maxHp: 35,
    curHp: 12,
    maxMp: 50,
    curMp: 50
  },
  {
    charId: '354523235',
    ownerId: '123456',
    name: 'Asumade2',
    maxHp: 61,
    curHp: 61,
    maxMp: 15,
    curMp: 12
  }]
};

const rootReducer = (state = initialState, action) => {
  switch(action.type){
    case ADD_TO_CHAT_LOG:
      return {
        ...state,
        chatLog: [...state.chatLog, action.content]
      };

    case TOGGLE_DICE_BUBBLE:
      return {
        ...state,
        showDiceSetting: !state.showDiceSetting
      };

    case TOGGLE_CHAR_LIST:
      return {
        ...state,
        showCharList: !state.showCharList
      };

    default:
      return state;
  }
};

export default rootReducer;
