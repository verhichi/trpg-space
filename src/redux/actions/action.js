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
  TOGGLE_DICE_BUBBLE,
  SHOW_ENEMY_LIST,
  HIDE_ENEMY_LIST,
  ADD_ENEMY,
  EDIT_ENEMY,
  REMOVE_ENEMY
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

export const toggleDiceBubble = () => {
  return { type: TOGGLE_DICE_BUBBLE };
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

export const addEnemy = (enemyData) => {
  return {
    type: ADD_ENEMY,
    enemyData
  };
};

export const editEnemy = (enemyData) => {
  return {
    type: EDIT_ENEMY,
    enemyData
  };
};

export const removeEnemy = (enemyId) => {
  return {
    type: REMOVE_ENEMY,
    enemyId
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

export const showEnemyList = () => {
  return { type: SHOW_ENEMY_LIST };
};

export const hideEnemyList = () => {
  return { type: HIDE_ENEMY_LIST };
};
