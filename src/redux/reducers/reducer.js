import { ADD_TO_CHAT_LOG, TOGGLE_CHAR_LIST, TOGGLE_DICE_BUBBLE } from '../constants/actionTypes';

const initialState = {
  chatLog: [],
  showCharList: false,
  showDiceSetting: false
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
