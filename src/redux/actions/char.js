import {
  ADD_CHAR,
  EDIT_CHAR,
  REMOVE_CHAR,
} from '../../constants/actionTypes';

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
