// import { applyMiddleware, createStore } from 'redux';
// import socketMiddleware from '../../socket/socketMiddleware.js';
// import thunk from 'redux-thunk';
// import logger from 'redux-logger';
//
// export const configureStore = (/*socketClient*/) => {
//   const middlewares = [
//     thunk,
//     // socketMiddleware(socketClient),
//     logger
//   ];
//   const store = createStore(
//     rootReducer,
//     initialState,
//     applyMiddleware(...middlewares));
//   return store;
// };


import { createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import rootReducer, { initialState } from '../reducers/reducer';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['chatLog']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, initialState);
export const persistor = persistStore(store);
