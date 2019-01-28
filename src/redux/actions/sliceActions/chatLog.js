import { ADD_CHAT } from '../../../constants/actionTypes';

export const addChat = (content) => {
  return {
    type: ADD_CHAT,
    content
  };
};
