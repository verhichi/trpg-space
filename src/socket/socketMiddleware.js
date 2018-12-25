import {
  SEND_DATA,
  CONNECT,
  DISCONNECT,
} from '../redux/constants/actionTypes'

export default function socketMiddleware(socket) {
  // Socket param is the client. We'll show how to set this up later.
  return ({dispatch, getState}) => next => action => {

    console.log('INSIDE MIDDLEWARE');
    console.log(action);

    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    /*
     * Socket middleware usage.
     * promise: (socket) => socket.emit('MESSAGE', 'hello world!')
     * type: always 'socket'
     * types: [REQUEST, SUCCESS, FAILURE]
     */
    const { promise, type } = action;

    if (!promise) {
      // Move on! Not a socket request or a badly formed one.
      console.log('NOT SOCKET RELATED');
      return next(action);
    }

    // const [REQUEST, SUCCESS, FAILURE] = types;
    // next({type: REQUEST});

    return promise(socket)
      .then((result) => {
        return next({result, type: 'success' });
      })
      .catch((error) => {
        return next({error, type: 'failure' });
      })
  };
}
