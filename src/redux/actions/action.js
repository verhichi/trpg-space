import {
  ADD_USER,
  ADD_TO_CHAT_LOG,
  ADD_TO_CHAR_LIST,
  EDIT_CHAR,
  EDIT_USER,
  HIDE_CHAR_LIST,
  HIDE_MODAL,
  HIDE_USER_LIST,
  REMOVE_FROM_CHAR_LIST,
  REMOVE_USER,
  RESET_STATE,
  SET_ROOM_ID,
  SET_USER_ID,
  SHOW_CHAR_LIST,
  SHOW_MODAL,
  SHOW_USER_LIST,
  SHOW_DICE_BUBBLE,
  HIDE_DICE_BUBBLE,
  USER_CLEANUP,
  NEW_HOST,
  SHOW_CHAT,
  SHOW_MAP,
  EDIT_MAP_IMAGE,
  SET_MAP_MODE,
  ADD_MAP_CHAR,
  EDIT_MAP_CHAR,
  REMOVE_MAP_CHAR,
  TOGGLE_PLACE_CHAR,
  TOGGLE_REMOVE_CHAR,
  SET_CHAR_TO_PLACE,
  TOGGLE_MAP_GRID
} from '../constants/actionTypes';

export const resetState = () => {
  return { type: RESET_STATE };
};

export const addToChatLog = (content) => {
  return {
    type: ADD_TO_CHAT_LOG,
    content: content
  };
};

export const showDiceBubble = () => {
  return { type: SHOW_DICE_BUBBLE };
};

export const hideDiceBubble = () => {
  return { type: HIDE_DICE_BUBBLE };
};

export const showCharList = () => {
  return { type: SHOW_CHAR_LIST };
};

export const hideCharList = () => {
  return { type: HIDE_CHAR_LIST };
};

export const showUserList = () => {
  return { type: SHOW_USER_LIST };
};

export const hideUserList = () => {
  return { type: HIDE_USER_LIST };
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
};

export const addUser = (userData) => {
  return {
    type: ADD_USER,
    userData
  };
}

export const editUser = (userData) => {
  return {
    type: EDIT_USER,
    userData
  };
};

export const removeUser = (userId) => {
  return {
    type: REMOVE_USER,
    userId
  };
};

export const setRoomId = (roomId) => {
  return {
    type: SET_ROOM_ID,
    roomId
  };
};

export const setUserId = (userId) => {
  return {
    type: SET_USER_ID,
    userId
  };
};

export const userCleanup = (id) => {
  return {
    type: USER_CLEANUP,
    id
  };
};

export const newHost = (id) => {
  return {
    type: NEW_HOST,
    id
  };
};

export const showChat = () => {
  return { type: SHOW_CHAT};
};

export const showMap = () => {
  return { type: SHOW_MAP };
};

export const editMapImage = (imageData) => {
  return {
    type: EDIT_MAP_IMAGE,
    imageData
  };
};

export const setMapMode = (mode) => {
  return {
    type: SET_MAP_MODE,
    mode
  };
};

export const addMapChar = (charData) => {
  return {
    type: ADD_MAP_CHAR,
    charData
  };
};

export const editMapChar = (charData) => {
  return {
    type: EDIT_MAP_CHAR,
    charData
  };
};

export const removeMapChar = (charId) => {
  return {
    type: REMOVE_MAP_CHAR,
    charId
  };
};

export const togglePlaceChar = () => {
  return { type: TOGGLE_PLACE_CHAR };
};

export const toggleRemoveChar = () => {
  return { type: TOGGLE_REMOVE_CHAR };
};

export const setCharToPlace = (charId) => {
  return {
    type: SET_CHAR_TO_PLACE,
    charId
  };
};

export const toggleMapGrid = () => {
  return { type: TOGGLE_MAP_GRID };
};
