import {
  SHOW_DICE_BUBBLE,
  HIDE_DICE_BUBBLE,
  SHOW_SIDEBAR,
  HIDE_SIDEBAR,
  SHOW_CHAT,
  SHOW_MAP,
  SHOW_PLACE_CHAR,
  HIDE_PLACE_CHAR,
  SHOW_REMOVE_CHAR,
  HIDE_REMOVE_CHAR,
  SHOW_MAP_SCALE,
  HIDE_MAP_SCALE,
  SET_SIDEBAR_CHAR,
  SET_SIDEBAR_NOTE
} from '../../../constants/actionTypes';

export const showDiceBubble = () => {
  return { type: SHOW_DICE_BUBBLE };
};

export const hideDiceBubble = () => {
  return { type: HIDE_DICE_BUBBLE };
};

export const showSidebar = () => {
  return { type: SHOW_SIDEBAR };
};

export const hideSidebar = () => {
  return { type: HIDE_SIDEBAR };
};

export const setSidebarChar = () => {
  return { type: SET_SIDEBAR_CHAR };
};

export const setSidebarNote = () => {
  return { type: SET_SIDEBAR_NOTE };
};

export const showChat = () => {
  return { type: SHOW_CHAT};
};

export const showMap = () => {
  return { type: SHOW_MAP };
};

export const showPlaceChar = () => {
  return { type: SHOW_PLACE_CHAR };
};

export const hidePlaceChar = () => {
  return { type: HIDE_PLACE_CHAR };
};

export const showRemoveChar = () => {
  return { type: SHOW_REMOVE_CHAR };
};

export const hideRemoveChar = () => {
  return { type: HIDE_REMOVE_CHAR };
};

export const showMapScale = () => {
  return { type: SHOW_MAP_SCALE };
};

export const hideMapScale = () => {
  return { type: HIDE_MAP_SCALE };
};
