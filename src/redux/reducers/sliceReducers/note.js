import {
  LOCK_NOTE,
  UNLOCK_NOTE,
  EDIT_NOTE
} from '../../../constants/actionTypes';

const initialState = {
  // note: [
  //   {
  //     noteId:  id of note,
  //     ownerId: id of owner of note,
  //     title:   title of note,
  //     text:    content of note
  //   }
  // ],
  note: '',
  isNoteLocked: ''
};

const noteReducer = (state = initialState, action) => {
  switch(action.type){
    case EDIT_NOTE:
      return {
        ...state,
        note: action.note
      };

    case LOCK_NOTE:
      return {
        ...state,
        isNoteLocked: action.userId
      };

    case UNLOCK_NOTE:
      return {
        ...state,
        isNoteLocked: ''
      };

    default:
      return state;
  }

};

export default noteReducer;
