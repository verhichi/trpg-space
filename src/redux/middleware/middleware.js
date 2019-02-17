import socket from '../../socket/socketClient';

export const customMiddleware = store => next => action => {
  const roomExpireTimestamp = store.getState().expireSetting.roomExpireTimestamp;
  const curDate = new Date();
  const curTimestamp = curDate.getTime();

  // if (!roomExpireTimestamp){
  //   return next(action);
  // }

  if (roomExpireTimestamp && roomExpireTimestamp <= curTimestamp){
    socket.disconnect();
  }

  return next(action);
};
