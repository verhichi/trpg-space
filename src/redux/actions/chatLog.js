import { ADD_CHAT, REMOVE_ALL_CHAT } from '../../constants/actionTypes';

export const addChat = (content) => {
  return {
    type: ADD_CHAT,
    content
  };
};

export const removeAllChat = () => {
  return { type: REMOVE_ALL_CHAT };
};
