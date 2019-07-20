import {
  SET_ROOM_ID,
  SET_USER_ID,
  RESET_STATE,
  SET_APP_LANG,
} from '../../constants/actionTypes';

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

export const resetState = () => {
  return { type: RESET_STATE };
};

export const setAppLang = (lang) => {
  return {
    type: SET_APP_LANG,
    lang
  };
};
