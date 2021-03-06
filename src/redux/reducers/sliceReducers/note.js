import {
  ADD_NOTE,
  EDIT_NOTE,
  REMOVE_NOTE,
  REMOVE_USER_NOTE,
  REORDER_NOTE
} from '../../../constants/actionTypes';

import { arrayMove } from 'react-sortable-hoc';

const initialState = [
    // {
    //   noteId:  id of note,
    //   ownerId: id of owner of note,
    //   title:   title of note,
    //   text:    content of note
    // }
  ];

const noteReducer = (state = initialState, action) => {
  switch(action.type){
    case ADD_NOTE:
      if (!state.some(note => note.noteId === action.noteData.noteId)){
        return [...state, action.noteData];
      } else {
        return state;
      }

    case EDIT_NOTE:
      return state.map(note => {
        if (note.noteId === action.noteData.noteId){
          return {
            ...note,
            title: action.noteData.title,
            text:  action.noteData.text
          };
        } else {
          return note;
        }
      });

    case REMOVE_NOTE:
      return state.filter(note => note.noteId !== action.noteId);

    case REMOVE_USER_NOTE:
      return state.filter(note => note.ownerId !== action.userId);

    case REORDER_NOTE:
      return arrayMove(state, action.oldIndex, action.newIndex);

    default:
      return state;
  }

};

export default noteReducer;
