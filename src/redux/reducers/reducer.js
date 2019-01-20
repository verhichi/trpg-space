import uuid from 'uuid';

import {
  ADD_USER,
  ADD_TO_CHAT_LOG,
  ADD_TO_CHAR_LIST,
  EDIT_CHAR,
  EDIT_USER,
  HIDE_SIDEBAR,
  HIDE_MODAL,
  HIDE_USER_LIST,
  REMOVE_FROM_CHAR_LIST,
  REMOVE_USER,
  RESET_STATE,
  SET_ROOM_ID,
  SET_USER_ID,
  SHOW_SIDEBAR,
  SHOW_MODAL,
  SHOW_USER_LIST,
  SHOW_DICE_BUBBLE,
  HIDE_DICE_BUBBLE,
  USER_CLEANUP,
  NEW_HOST,
  SHOW_CHAT,
  SHOW_MAP,
  EDIT_MAP_IMAGE,
  SET_MAP_MODE,
  ADD_MAP_CHAR,
  EDIT_MAP_CHAR,
  REMOVE_MAP_CHAR,
  SHOW_PLACE_CHAR,
  HIDE_PLACE_CHAR,
  SHOW_REMOVE_CHAR,
  HIDE_REMOVE_CHAR,
  SET_CHAR_TO_PLACE,
  TOGGLE_MAP_GRID,
  REMOVE_ALL_MAP_CHAR,
  SET_SIDEBAR_TAB_MODE,
  LOCK_NOTE,
  UNLOCK_NOTE,
  EDIT_NOTE,
  EDIT_MAP_POSITION
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
  centerMode: 'chat',
  mapSetting: {
    image: {
      src: '',
      id: '',
      left: 0,
      top: 0
    },
    mode: '',
    charToPlace: ''
  },
  displaySidebar: false,
  displayDiceSetting: false,
  displayUserList: false,
  displayEnemyList: false,
  displayPlaceChar: false,
  displayRemoveChar: false,
  displayMapGrid: false,
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
    //   general: {
    //     name: 'Daichi',
    //     type: 'ally/enemy',
    //     color: '#010101',
    //     image: 'image-src',
    //     privacy: '0/1/2/3',
    //     link: 'link to an external character sheet link'
    //   },
    //   status: [
    //     {
    //        id: 'statId',
    //        type: 'value/param',
    //        label: 'labelName',
    //        value: 'currentValue',
    //        maxValue: 'maximumValue'(only if type is param)
    //     }
    //   ],
    //   detail: [
    //     {
    //        id: 'statId',
    //        type: 'value/param',
    //        label: 'labelName',
    //        value: 'currentValue',
    //        maxValue: 'maximumValue'(only if type is param)
    //     }
    //   ],
    //   map: {
    //     onMap: true/false,
    //     x: x-coordinate,
    //     y: y-coordinate
    //   }
    // }
  ],
  chatLog: [
    { type: 'help', id: 'abc' }
    // {
    //   type: 'text/help/image/join/leave/newHost/help,'
    // }
  ],
  sidebarTabMode: 'char',
  notes: '',
  isNoteLocked: ''
};

const rootReducer = (state = initialState, action) => {
  switch(action.type){
    case RESET_STATE:
      return initialState;

    case ADD_TO_CHAT_LOG:
      const id = uuid.v4();

      const now = new Date();
      const hour = now.getHours().toString().padStart(2, '0');
      const min = now.getMinutes().toString().padStart(2, '0');
      const time = `${hour}:${min}`;

      return {
        ...state,
        chatLog: [...state.chatLog, {
          ...action.content,
          time,
          id
        }]
      };

    case ADD_TO_CHAR_LIST:
      if (!state.charList.some(char => char.charId === action.charData.charId)){
        return { ...state, charList: [...state.charList, action.charData] };
      } else {
        return state;
      }

    case EDIT_CHAR:
      return {
        ...state,
        charList: state.charList.map((char) => {
          if (char.charId === action.charData.charId){
            return {
              ...char,
              general: action.charData.general,
              status: action.charData.status,
              detail: action.charData.detail
            };
          } else {
            return char;
          }
        })
      };

      case ADD_USER:
        if (state.userList.some(user => user.id === action.userData.id)){
          return state;
        } else {
          return { ...state, userList: [...state.userList, action.userData] };
        }

      case EDIT_USER:
        return {
          ...state,
          userList: state.userList.map((user) => {
            if (user.id === action.userData.id){
              return { ...user, name: action.userData.name };
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

    case SHOW_DICE_BUBBLE:
      return {
        ...state,
        displayDiceSetting: true
      };

    case HIDE_DICE_BUBBLE:
      return {
        ...state,
        displayDiceSetting: false
      };

    case SHOW_SIDEBAR:
      return {
        ...state,
        displaySidebar: true
      };

    case HIDE_SIDEBAR:
      return {
        ...state,
        displaySidebar: false
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

    case USER_CLEANUP:
      return {
        ...state,
        userList: state.userList.filter((user) => user.id !== action.id),
        charList: state.charList.filter((char) => char.ownerId !== action.id)
      };

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
      };

    case SHOW_CHAT:
      return {
        ...state,
        centerMode: 'chat'
      };

    case SHOW_MAP:
      return {
        ...state,
        centerMode: 'map'
      };

    case EDIT_MAP_IMAGE:
      return {
        ...state,
        mapSetting: {
          ...state.mapSetting,
          image: action.imageData
        }
      };

    case SET_MAP_MODE:
      return {
        ...state,
        mapSetting: {
          ...state.mapSetting,
          mode: action.mode
        }
      };

    case ADD_MAP_CHAR:
      return {
        ...state,
        charList: state.charList.map((char) => {
          if (char.charId === action.charData.charId){
            return {
              ...char,
              map: {
                onMap: true,
                x: action.charData.x,
                y: action.charData.y
              }
            };
          } else {
            return char;
          }
        })
      };

    case EDIT_MAP_CHAR:
      return {
        ...state,
        charList: state.charList.map((char) => {
          if (char.charId === action.charData.charId){
            return {
              ...char,
              map: {
                ...char.map,
                x: action.charData.x,
                y: action.charData.y
              }
            };
          } else {
            return char;
          }
        })
      };

    case REMOVE_MAP_CHAR:
      return {
        ...state,
        charList: state.charList.map((char) => {
          if (char.charId === action.charId){
            return {
              ...char,
              map: {
                onMap: false,
                x: '',
                y: ''
              }
            };
          } else {
            return char;
          }
        })
      };

    case SHOW_PLACE_CHAR:
      return {
        ...state,
        displayPlaceChar: true
      };

    case HIDE_PLACE_CHAR:
      return {
        ...state,
        displayPlaceChar: false
      };

    case SHOW_REMOVE_CHAR:
      return {
        ...state,
        displayRemoveChar: true
      };

    case HIDE_REMOVE_CHAR:
      return {
        ...state,
        displayRemoveChar: false
      };

    case SET_CHAR_TO_PLACE:
      return {
        ...state,
        mapSetting: {
          ...state.mapSetting,
          charToPlace: action.charId
        }
      };

    case TOGGLE_MAP_GRID:
      return {
        ...state,
        displayMapGrid: !state.displayMapGrid
      };

    case REMOVE_ALL_MAP_CHAR:
      return {
        ...state,
        charList: state.charList.map(charData => {
          return {
            ...charData,
            map: {
              onMap: false,
              x: '',
              y: ''
            }
          };
        })
      };

    case SET_SIDEBAR_TAB_MODE:
      return {
        ...state,
        sidebarTabMode: action.sidebarTabMode
      };

    case LOCK_NOTE:
      return {
        ...state,
        isNoteLocked: action.userId
      };

    case UNLOCK_NOTE:
      return {
        ...state,
        isNoteLocked: ''
      };

    case EDIT_NOTE:
      return {
        ...state,
        notes: action.notes
      };

    case EDIT_MAP_POSITION:
      return {
        ...state,
        mapSetting: {
          ...state.mapSetting,
          image: {
            ...state.mapSetting.image,
            left: action.left,
            top: action.top
          }
        }
      };

    default:
      return state;
  }
};

export default rootReducer;
