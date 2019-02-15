import socket from '../../socket/socketClient';

export const customMiddleware = store => next => action => {
  const roomExpireTimestamp = store.getState().global.roomExpireTimestamp;
  const curDate = new Date();
  const curTimestamp = curDate.getTime();

  if (!roomExpireTimestamp){
    return next(action);
  }

  if (roomExpireTimestamp <= curTimestamp){
    socket.disconnect();
    console.log('SOCKET DISCONNECTED');
  }

  return next(action);
};
