import socket from '../../socket/socketClient';
import { MODAL_TYPE_ALERT, NOTICE_TYPE_EXPIRE } from '../../constants/constants.js';
import { setRoomExpire, setRoomExpireNoticeTrue } from '../actions/expire';
import { showModal } from '../actions/modal';
import { showNotice } from '../actions/notice';

export const customMiddleware = store => next => action => {
  const roomExpireSetting     = store.getState().expireSetting;
  const hasRoomExpired        = roomExpireSetting.hasRoomExpired;
  const displayedExpireNotice = roomExpireSetting.displayedExpireNotice;
  const roomExpireTimestamp   = roomExpireSetting.roomExpireTimestamp;
  const curDate               = new Date();
  const curTimestamp          = curDate.getTime();

  if (!hasRoomExpired && roomExpireTimestamp && roomExpireTimestamp <= curTimestamp){
    socket.disconnect();
    next(setRoomExpire());
    return next(showModal(MODAL_TYPE_ALERT, {
      title:        '',
      displayClose: false,
      alertText:    'The room has expired!'
    }));
  }

  if (!displayedExpireNotice && !hasRoomExpired && roomExpireTimestamp && roomExpireTimestamp - curTimestamp <= 60 * 1000){
    next(setRoomExpireNoticeTrue());
    next(showNotice(NOTICE_TYPE_EXPIRE));
  }

  return next(action);
};
