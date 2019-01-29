import {
  CHECK_SEND_MSG_TO_ALL,
  UNCHECK_SEND_MSG_TO_ALL,
  ADD_SEND_MSG_USER,
  REMOVE_SEND_MSG_USER,
  CHECK_SEND_AS_USER,
  UNCHECK_SEND_AS_USER,
  EDIT_SEND_AS
} from '../../constants/actionTypes';


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

export const checkSendAsUser = () => {
  return { type: CHECK_SEND_AS_USER };
};

export const uncheckSendAsUser = () => {
  return { type: UNCHECK_SEND_AS_USER };
};

export const editSendAs = (charId) => {
  return {
    type: EDIT_SEND_AS,
    charId
  };
};
