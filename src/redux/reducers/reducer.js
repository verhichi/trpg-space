import { ADD_TO_CHAT_LOG, ADD_TO_CHAR_LIST, REMOVE_FROM_CHAR_LIST, TOGGLE_CHAR_LIST, TOGGLE_DICE_BUBBLE, SHOW_MODAL, HIDE_MODAL } from '../constants/actionTypes';

const initialState = {
  id: '123456',
  modalSetting: {
    show: false,
    modalType: '',
    modalProp: {}
  },
  showCharList: false,
  showDiceSetting: false,
  chatLog: [],
  charList: []
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

    case REMOVE_FROM_CHAR_LIST:
      return {
        ...state,
        charList: state.charList.filter((char) => char.charId !== action.charId)
      };

    case SHOW_MODAL:
      return {
        ...state,
        modalSetting: {
          show: true,
          modalType: action.modalType,
          modalProp: action.modalProp
        }
      };

    case HIDE_MODAL:
      return {
        ...state,
        modalSetting: {
          show: false,
          modalType: '',
          modalProp: {}
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
