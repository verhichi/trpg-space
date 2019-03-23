import {
  ADD_NOTE,
  EDIT_NOTE,
  REMOVE_NOTE,
  REMOVE_USER_NOTE,
  REORDER_NOTE
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
};

export const reorderNote = (oldIndex, newIndex) => {
  return {
    type: REORDER_NOTE,
    oldIndex,
    newIndex
  };
};
