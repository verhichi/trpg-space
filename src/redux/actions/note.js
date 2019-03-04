import {
  ADD_NOTE,
  EDIT_NOTE,
  REMOVE_NOTE
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
}
