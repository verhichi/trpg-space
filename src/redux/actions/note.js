import {
  ADD_NOTE,
  EDIT_NOTE,
  REMOVE_NOTE,
  REMOVE_USER_NOTE
} from '../../constants/actionTypes';

export const addNote = (noteData) => {
  return {
    type: ADD_NOTE,
    noteData
  };
};

export const editNote = (noteData) => {
  return {
    type: EDIT_NOTE,
    noteData
  };
};

export const removeNote = (noteId) => {
  return {
    type: REMOVE_NOTE,
    noteId
  };
};

export const removeUserNote = (userId) => {
  return {
    type: REMOVE_USER_NOTE,
    userId
  };
}
