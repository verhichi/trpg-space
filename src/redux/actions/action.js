import  { ADD_TO_CHAT_LOG, TOGGLE_CHAR_LIST, TOGGLE_DICE_BUBBLE, TOGGLE_MODAL } from '../constants/actionTypes';

export const addToChatLog = (content) => {
  return {
    type: ADD_TO_CHAT_LOG,
    content: content
  };
};

export const toggleDiceBubble = () => {
  return { type: TOGGLE_DICE_BUBBLE };
};

export const toggleCharList = () => {
  return { type: TOGGLE_CHAR_LIST };
};

export const toggleModal = () => {
  return { type: TOGGLE_MODAL };
};
