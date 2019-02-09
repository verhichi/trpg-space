import {
  ADD_MAP_CHAR,
  EDIT_MAP_CHAR,
  REMOVE_MAP_CHAR,
  REMOVE_ALL_CHAR_FROM_SEL_MAP,
  REMOVE_SEL_CHAR_FROM_ALL_MAP
} from '../../constants/actionTypes';

export const addMapChar = (mapCharData) => {
  return {
    type: ADD_MAP_CHAR,
    mapCharData
  };
};

export const editMapChar = (mapCharData) => {
  return {
    type: EDIT_MAP_CHAR,
    mapCharData
  };
};

export const removeMapChar = (mapId, charId) => {
  return {
    type: REMOVE_MAP_CHAR,
    mapId,
    charId
  };
};

export const removeAllCharFromSelMap = (mapId) => {
  return {
    type: REMOVE_ALL_CHAR_FROM_SEL_MAP,
    mapId
  };
};

export const removeSelCharFromAllMap = (charId) => {
  return {
    type: REMOVE_SEL_CHAR_FROM_ALL_MAP,
    charId
  };
};
