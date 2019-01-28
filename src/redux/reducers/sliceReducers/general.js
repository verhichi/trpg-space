import { SET_ROOM_ID, SET_USER_ID } from '../../../constants/actionTypes';

const initialState = {
  isMobile: /Mobile/.test(navigator.userAgent),
  id:       '',
  roomId:   ''
};

const generalReducer = (state = initialState, action) => {
  switch(action.type){
    case SET_ROOM_ID:
      return {
        ...state,
        roomId: action.roomId
      };

    case SET_USER_ID:
      return {
        ...state,
        id: action.userId
      };

    default:
      return state;
  }

};

export default generalReducer;
