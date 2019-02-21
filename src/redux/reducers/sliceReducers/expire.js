import {
  SET_ROOM_EXPIRE_TIME,
  SET_ROOM_EXPIRE,
  SET_ROOM_EXPIRE_NOTICE_TRUE,
  SET_ROOM_EXPIRE_NOTICE_FALSE
} from '../../../constants/actionTypes';

const initialState = {
  hasRoomExpired:         false,
  displayedExpireNotice:  false,
  roomExpireSettingHour:  null,
  roomExpireTimestamp:    null
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

    case SET_ROOM_EXPIRE_NOTICE_TRUE:
      return {
        ...state,
        displayedExpireNotice: true
      };

    case SET_ROOM_EXPIRE_NOTICE_FALSE:
      return {
        ...state,
        displayedExpireNotice: false
      };

    default:
      return state;
  }

};

export default expireReducer;
