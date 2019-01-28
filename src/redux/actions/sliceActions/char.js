import {
  ADD_CHAR,
  EDIT_CHAR,
  REMOVE_CHAR,
  ADD_MAP_CHAR,
  EDIT_MAP_CHAR,
  REMOVE_MAP_CHAR,
  REMOVE_ALL_MAP_CHAR
} from '../../../constants/actionTypes';

export const addChar = (charData) => {
  return {
    type: ADD_CHAR,
    charData
  };
};

export const editChar = (charData) => {
  return {
    type: EDIT_CHAR,
    charData
  };
};

export const removeChar = (charId) => {
  return {
    type: REMOVE_CHAR,
    charId
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

export const removeAllMapChar = () => {
  return { type: REMOVE_ALL_MAP_CHAR };
};
