import {
  ADD_USER,
  ADD_TO_CHAT_LOG,
  ADD_TO_CHAR_LIST,
  EDIT_CHAR,
  EDIT_USER,
  HIDE_CHAR_LIST,
  HIDE_MODAL,
  HIDE_USER_LIST,
  REMOVE_FROM_CHAR_LIST,
  REMOVE_USER,
  SET_ROOM_ID,
  SET_USER_ID,
  SHOW_CHAR_LIST,
  SHOW_MODAL,
  SHOW_USER_LIST,
  TOGGLE_DICE_BUBBLE,
} from '../constants/actionTypes';

export const initialState = {
  id: '',
  roomId: '',
  modalSetting: {
    display: false,
    modalType: '',
    modalProp: {}
  },
  displayCharList: false,
  displayDiceSetting: false,
  displayUserList: false,
  userList: [
  //   {
  //   id: '123457',
  //   name: 'Daichi Nishida',
  //   host: false
  // }
],
  charList: [
  //   {
  //   charId: '23984743543',
  //   ownerId: '1234567',
  //   name: 'Djakovich',
  //   maxHp: '50',
  //   curHp: '15',
  //   maxMp: '60',
  //   curMp: '45'
  // }
],
  chatLog: [],
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

    case EDIT_CHAR:
      return {
        ...state,
        charList: state.charList.map((char) => {
          if (char.charId === action.charData.charId){
            return {
              ...char,
              name: action.charData.name,
              maxHp: action.charData.maxHp,
              curHp: action.charData.curHp,
              maxMp: action.charData.maxMp,
              curMp: action.charData.curMp
            };
          } else {
            return char;
          }
        })
      };

      case ADD_USER:
        return {
          ...state,
          userList: [...state.userList, action.userData]
        };

      case EDIT_USER:
        return {
          ...state,
          userList: state.userList.map((user) => {
            if (user.id === action.userData.id){
              return {
                ...user,
                name: action.userData.name
              };
            } else {
              return user;
            }
          })
        };

    case REMOVE_FROM_CHAR_LIST:
      return {
        ...state,
        charList: state.charList.filter((char) => char.charId !== action.charId)
      };

    case REMOVE_USER:
      return {
        ...state,
        userList: state.userList.filter((user) => user.id !== action.userId)
      };

    case SHOW_MODAL:
      return {
        ...state,
        modalSetting: {
          display: true,
          modalType: action.modalType,
          modalProp: action.modalProp
        }
      };

    case HIDE_MODAL:
      return {
        ...state,
        modalSetting: {
          display: false,
          modalType: '',
          modalProp: {}
        }
      };

    case TOGGLE_DICE_BUBBLE:
      return {
        ...state,
        displayDiceSetting: !state.displayDiceSetting
      };

    case SHOW_CHAR_LIST:
      return {
        ...state,
        displayCharList: true,
        displayUserList: false
      };

    case HIDE_CHAR_LIST:
      return {
        ...state,
        displayCharList: false
      };

    case SHOW_USER_LIST:
      return {
        ...state,
        displayUserList: true,
        displayCharList: false
      };

    case HIDE_USER_LIST:
      return {
        ...state,
        displayUserList: false
      };

    case SET_ROOM_ID:
      return {
        ...state,
        roomId: action.roomId
      };

    case SET_USER_ID:
      return {
        ...state,
        id: action.userId
      };

    default:
      return state;
  }
};

export default rootReducer;
