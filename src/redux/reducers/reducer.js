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
  RESET_STATE,
  SET_ROOM_ID,
  SET_USER_ID,
  SHOW_CHAR_LIST,
  SHOW_MODAL,
  SHOW_USER_LIST,
  TOGGLE_DICE_BUBBLE,
  SHOW_ENEMY_LIST,
  HIDE_ENEMY_LIST,
  ADD_ENEMY,
  EDIT_ENEMY,
  REMOVE_ENEMY,
  USER_CLEANUP,
  NEW_HOST
} from '../constants/actionTypes';

export const initialState = {
  isMobile: /Mobile/.test(navigator.userAgent),
  id: '',
  roomId: '',
  modalSetting: {
    display: false,
    modalType: '',
    modalProp: {}
    //   {
    //   *required
    //   title*: header title of modal
    //   displayClose*: display the X button on the top-right to close modal
    // }
  },
  displayCharList: false,
  displayDiceSetting: false,
  displayUserList: false,
  displayEnemyList: false,
  userList: [
  //   {
  //   id: '123457',
  //   name: 'Daichi Nishida',
  //   host: false,
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
  enemyList: [
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
    case RESET_STATE:
      return initialState;

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

    case SHOW_ENEMY_LIST:
      return {
        ...state,
        displayEnemyList: true
      };


    case HIDE_ENEMY_LIST:
      return {
        ...state,
        displayEnemyList: false
      };

    case ADD_ENEMY:
      return {
        ...state,
        enemyList: [...state.enemyList, action.enemyData]
      };

    case EDIT_ENEMY:
      return {
        ...state,
        enemyList: state.enemyList.map((enemy) => {
          if (enemy.charId === action.enemyData.charId){
            return {
              ...enemy,
              name: action.enemyData.name,
              maxHp: action.enemyData.maxHp,
              curHp: action.enemyData.curHp,
              maxMp: action.enemyData.maxMp,
              curMp: action.enemyData.curMp
            };
          } else {
            return enemy;
          }
        })
      };

    case REMOVE_ENEMY:
      return {
        ...state,
        enemyList: state.enemyList.filter((enemy) => enemy.charId !== action.enemyId)
      };

    case USER_CLEANUP:
      return {
        ...state,
        userList: state.userList.filter((user) => user.id !== action.id),
        enemyList: state.enemyList.filter((enemy) => enemy.ownerId !== action.id),
        charList: state.charList.filter((char) => char.ownerId !== action.id)
      }

    case NEW_HOST:
      return {
        ...state,
        userList: state.userList.map((user) => {
          if (user.id === action.id){
            return {
              ...user,
              host: true
            };
          } else {
            return user;
          }
        })
      }

    default:
      return state;
  }
};

export default rootReducer;
