import socket from '../../socket/socketClient';
import { MODAL_TYPE_ALERT } from '../../constants/constants.js';
import { setRoomExpire } from '../actions/expire';
import { showModal } from '../actions/modal';

export const customMiddleware = store => next => action => {
  const roomExpireSetting   = store.getState().expireSetting;
  const hasRoomExpired      = roomExpireSetting.hasRoomExpired;
  const roomExpireTimestamp = roomExpireSetting.roomExpireTimestamp;
  const curDate             = new Date();
  const curTimestamp        = curDate.getTime();

  if (!hasRoomExpired && roomExpireTimestamp && roomExpireTimestamp <= curTimestamp){
    socket.disconnect();
    next(setRoomExpire());
    return next(showModal(MODAL_TYPE_ALERT, {
      title:        '',
      displayClose: false,
      alertText:    'The room has expired!'
    }));
  }

  return next(action);
};
