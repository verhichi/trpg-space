import  { ADD_TO_CHAT_LOG, ADD_TO_CHAR_LIST, TOGGLE_CHAR_LIST, TOGGLE_DICE_BUBBLE, TOGGLE_MODAL } from '../constants/actionTypes';

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

export const toggleModal = (modalType) => {
  return {
    type: TOGGLE_MODAL,
    modalType: modalType
  };
};

export const addToCharList = (charData) => {
  return {
    type: ADD_TO_CHAR_LIST,
    charData: charData
  };
};
