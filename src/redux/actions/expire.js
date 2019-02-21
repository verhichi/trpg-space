import {
  SET_ROOM_EXPIRE_TIME,
  SET_ROOM_EXPIRE,
  SET_ROOM_EXPIRE_NOTICE_TRUE,
  SET_ROOM_EXPIRE_NOTICE_FALSE
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

export const setRoomExpireNoticeTrue = () => {
  return { type: SET_ROOM_EXPIRE_NOTICE_TRUE };
};

export const setRoomExpireNoticeFalse = () => {
  return { type: SET_ROOM_EXPIRE_NOTICE_FALSE };
};
