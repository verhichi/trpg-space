import  { ADD_TO_CHAT_LOG } from '../constants/actionTypes';

export const addToChatLog = (content) => {
  return {
    type: ADD_TO_CHAT_LOG,
    content: content
  };
};
