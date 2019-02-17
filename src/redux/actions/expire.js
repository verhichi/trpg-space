import { SET_ROOM_EXPIRE_TIME } from '../../constants/actionTypes';

export const setRoomExpireTime = (roomExpireSettingHour, roomExpireTimestamp) => {
  return {
    type: SET_ROOM_EXPIRE_TIME,
    roomExpireSettingHour,
    roomExpireTimestamp
  };
};
