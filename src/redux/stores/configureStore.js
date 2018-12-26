import { applyMiddleware, createStore } from 'redux';
import socketMiddleware from '../../socket/socketMiddleware.js';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer, { initialState } from '../reducers/reducer';

export const configureStore = (socketClient) => {
  const middlewares = [
    thunk,
    socketMiddleware(socketClient),
    logger
  ];
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares));
  return store;
};
