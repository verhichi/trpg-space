import  { ADD_TO_CHAT_LOG, ADD_TO_CHAR_LIST, EDIT_CHAR, REMOVE_FROM_CHAR_LIST, TOGGLE_CHAR_LIST, TOGGLE_DICE_BUBBLE, SHOW_MODAL, HIDE_MODAL } from '../constants/actionTypes';

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

export const showModal = (modalType, modalProp) => {
  return {
    type: SHOW_MODAL,
    modalType,
    modalProp
  }
}

export const hideModal = () => {
  return { type: HIDE_MODAL };
}

export const addToCharList = (charData) => {
  return {
    type: ADD_TO_CHAR_LIST,
    charData
  };
};

export const removeFromCharList = (charId) => {
  return {
    type: REMOVE_FROM_CHAR_LIST,
    charId
  };
};

export const editChar = (charData) => {
  return {
    type: EDIT_CHAR,
    charData
  };
}
