import { applyMiddleware, createStore } from 'redux';
import socketMiddleware from '../../socket/socketMiddleware.js';
import rootReducer from '../reducers/reducer';

export const configureStore = (socketClient) => {
  const store = createStore(rootReducer, applyMiddleware(socketMiddleware(socketClient)));
  return store;
};
