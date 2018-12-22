import { ADD_TO_CHAT_LOG } from '../constants/actionTypes';

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

    default:
      return state;
  }
};

export default rootReducer;
