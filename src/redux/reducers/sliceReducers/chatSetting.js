import {
  CHECK_SEND_MSG_TO_ALL,
  UNCHECK_SEND_MSG_TO_ALL,
  ADD_SEND_MSG_USER,
  REMOVE_SEND_MSG_USER,
  CHECK_SEND_AS_USER,
  UNCHECK_SEND_AS_USER,
  EDIT_SEND_AS
} from '../../../constants/actionTypes';

const initialState = {
  sendTo: {
    sendToAll: true,
    sendToUsers: []
  },
  sendAs: {
    sendAsUser: true,
    sendAsCharacter: ''
  }
};

const chatReducer = (state = initialState, action) => {
  switch(action.type){
    case CHECK_SEND_MSG_TO_ALL:
      return {
        ...state,
        sendTo: {
          ...state.sendTo,
          sendToAll: true
        }
      };

    case UNCHECK_SEND_MSG_TO_ALL:
      return {
        ...state,
        sendTo: {
          ...state.sendTo,
          sendToAll: false
        }
      };

    case ADD_SEND_MSG_USER:
      return {
        ...state,
        sendTo: {
          ...state.sendTo,
          sendToUsers: [...state.sendTo.sendToUsers, action.userId]
        }
      }

    case REMOVE_SEND_MSG_USER:
      return {
        ...state,
        sendTo: {
          ...state.sendTo,
          sendToUsers: state.sendTo.sendToUsers.filter(id => id !== action.userId)
        }
      };

    case EDIT_SEND_AS:
      return {
        ...state,
        sendAs: {
          ...state.sendAs,
          sendAsCharacter: action.charId
        }
      };

    case UNCHECK_SEND_AS_USER:
      return {
        ...state,
        sendAs: {
          ...state.sendAs,
          sendAsUser: false
        }
      };

    case CHECK_SEND_AS_USER:
      return {
        ...state,
        sendAs: {
          ...state.sendAs,
          sendAsUser: true
        }
      };

    default:
      return state;
  }

};

export default chatReducer;
