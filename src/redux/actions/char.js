import {
  ADD_CHAR,
  EDIT_CHAR,
  REMOVE_CHAR,
  EDIT_CHAR_STAT
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

export const editCharStat = (charId, statId, value) => {
  return {
    type: EDIT_CHAR_STAT,
    charId,
    statId,
    value
  }
};
