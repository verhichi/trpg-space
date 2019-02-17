import { SET_ROOM_EXPIRE_TIME } from '../../../constants/actionTypes';

const initialState = {
  roomExpireSettingHour: null,
  roomExpireTimestamp:   null
};

const expireReducer = (state = initialState, action) => {
  switch(action.type){
    case SET_ROOM_EXPIRE_TIME:
      return {
        roomExpireSettingHour: action.roomExpireSettingHour,
        roomExpireTimestamp:   action.roomExpireTimestamp
      };

    default:
      return state;
  }

};

export default expireReducer;
