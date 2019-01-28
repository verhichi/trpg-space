import uuid from 'uuid';
import {
  ADD_CHAT,
  CHECK_SEND_MSG_TO_ALL,
  UNCHECK_SEND_MSG_TO_ALL,
  ADD_SEND_MSG_USER,
  REMOVE_SEND_MSG_USER,
  CHECK_SEND_AS_PLAYER,
  UNCHECK_SEND_AS_PLAYER,
  EDIT_SEND_AS
} from '../../../constants/actionTypes';
import { CHAT_TYPE_HELP } from '../../../constants/constants';

const initialState = {
  chatLog: [
    { type: CHAT_TYPE_HELP, id: 'abc' }
    // {
    //   type: 'text/help/image/join/leave/newHost/help,'
    // }
  ],
  chatSetting: {
    sendTo: {
      sendToAll: true,
      sendToUsers: []
    },
    sendAs: {
      sendAsUser: true,
      sendAsCharacter: ''
    }
  }
};

const chatReducer = (state = initialState, action) => {
  switch(action.type){
    case ADD_CHAT:
      const id = uuid.v4();

      const now  = new Date();
      const hour = now.getHours().toString().padStart(2, '0');
      const min  = now.getMinutes().toString().padStart(2, '0');
      const time = `${hour}:${min}`;

      return {
        ...state,
        chatLog: [...state.chatLog, {
          ...action.content,
          time,
          id
        }]
      };

    case CHECK_SEND_MSG_TO_ALL:
      return {
        ...state,
        chatSetting: {
          ...state.chatSetting,
          sendTo: {
            ...state.chatSetting.sendTo,
            sendToAll: true
          }
        }
      };

    case UNCHECK_SEND_MSG_TO_ALL:
      return {
        ...state,
        chatSetting: {
          ...state.chatSetting,
          sendTo: {
            ...state.chatSetting.sendTo,
            sendToAll: false
          }
        }
      };

    case ADD_SEND_MSG_USER:
      return {
        ...state,
        chatSetting: {
          ...state.chatSetting,
          sendTo: {
            ...state.chatSetting.sendTo,
            sendToUsers: [...state.chatSetting.sendTo.sendToUsers, action.userId]
          }
        }
      }

    case REMOVE_SEND_MSG_USER:
      return {
        ...state,
        chatSetting: {
          ...state.chatSetting,
          sendTo: {
            ...state.chatSetting.sendTo,
            sendToUsers: state.chatSetting.sendTo.sendToUsers.filter(id => id !== action.userId)
          }
        }
      };

    case EDIT_SEND_AS:
      return {
        ...state,
        chatSetting: {
          ...state.chatSetting,
          sendAs: {
            ...state.chatSetting.sendAs,
            sendAsCharacter: action.charId
          }
        }
      };

    case UNCHECK_SEND_AS_PLAYER:
      return {
        ...state,
        chatSetting: {
          ...state.chatSetting,
          sendAs: {
            ...state.chatSetting.sendAs,
            sendAsPlayer: false
          }
        }
      };

    case CHECK_SEND_AS_PLAYER:
      return {
        ...state,
        chatSetting: {
          ...state.chatSetting,
          sendAs: {
            ...state.chatSetting.sendAs,
            sendAsPlayer: true
          }
        }
      };

    default:
      return state;
  }

};

export default chatReducer;
