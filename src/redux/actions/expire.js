import {
  SET_ROOM_EXPIRE_TIME,
  SET_ROOM_EXPIRE
} from '../../constants/actionTypes';

export const setRoomExpireTime = (roomExpireSettingHour, roomExpireTimestamp) => {
  return {
    type: SET_ROOM_EXPIRE_TIME,
    roomExpireSettingHour,
    roomExpireTimestamp
  };
};

export const setRoomExpire = () => {
  return { type: SET_ROOM_EXPIRE };
};
