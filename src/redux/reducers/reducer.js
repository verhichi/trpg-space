import { ADD_TO_CHAT_LOG, ADD_TO_CHAR_LIST, TOGGLE_CHAR_LIST, TOGGLE_DICE_BUBBLE, TOGGLE_MODAL } from '../constants/actionTypes';

const initialState = {
  id: '123456',
  modalSetting: {
    show: false,
    modalType: 'help'
  },
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
  }]
};

const rootReducer = (state = initialState, action) => {
  switch(action.type){
    case ADD_TO_CHAT_LOG:
      return {
        ...state,
        chatLog: [...state.chatLog, action.content]
      };

    case ADD_TO_CHAR_LIST:
      return {
        ...state,
        charList: [...state.charList, action.charData]
      };

    case TOGGLE_MODAL:
      return {
        ...state,
        modalSetting: {
          show: !state.modalSetting.show,
          modalType: action.modalType
        }
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
