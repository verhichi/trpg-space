import {
  LOCK_NOTE,
  UNLOCK_NOTE,
  EDIT_NOTE
} from '../../constants/actionTypes';

export const lockNote = (userId) => {
  return {
    type: LOCK_NOTE,
    userId
  };
};

export const unlockNote = () => {
  return { type: UNLOCK_NOTE };
};

export const editNote = (note) => {
  return {
    type: EDIT_NOTE,
    note
  };
};
