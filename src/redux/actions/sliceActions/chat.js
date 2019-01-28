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

export const addChat = (content) => {
  return {
    type: ADD_CHAT,
    content
  };
};

export const checkSendMsgToAll = () => {
  return { type: CHECK_SEND_MSG_TO_ALL };
};

export const uncheckSendMsgToAll = () => {
  return { type: UNCHECK_SEND_MSG_TO_ALL };
};

export const addSendMsgUser = (userId) => {
  return {
    type: ADD_SEND_MSG_USER,
    userId
  };
};

export const removeSendMsgUser = (userId) => {
  return {
    type: REMOVE_SEND_MSG_USER,
    userId
  };
};

export const checkSendAsPlayer = () => {
  return { type: CHECK_SEND_AS_PLAYER };
};

export const uncheckSendAsPlayer = () => {
  return { type: UNCHECK_SEND_AS_PLAYER };
};

export const editSendAs = (charId) => {
  return {
    type: EDIT_SEND_AS,
    charId
  };
};
