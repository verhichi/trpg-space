import {
  SET_ROOM_EXPIRE_TIME,
  SET_ROOM_EXPIRE
} from '../../../constants/actionTypes';

const initialState = {
  hasRoomExpired:        false,
  roomExpireSettingHour: null,
  roomExpireTimestamp:   null
};

const expireReducer = (state = initialState, action) => {
  switch(action.type){
    case SET_ROOM_EXPIRE_TIME:
      return {
        ...state,
        roomExpireSettingHour: action.roomExpireSettingHour,
        roomExpireTimestamp:   action.roomExpireTimestamp
      };

    case SET_ROOM_EXPIRE:
      return {
        ...state,
        hasRoomExpired: true
      };

    default:
      return state;
  }

};

export default expireReducer;
