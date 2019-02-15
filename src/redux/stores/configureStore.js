// import { createStore } from 'redux';
// import rootReducer from '../reducers/rootReducer';
//
// export const store = createStore(rootReducer);

import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import { customMiddleware } from '../middleware/middleware';

export const store = createStore(
  rootReducer,
  applyMiddleware(customMiddleware)
);
