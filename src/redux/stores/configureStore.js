import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import { customMiddleware } from '../middleware/middleware';

export const store = createStore(
  rootReducer,
  applyMiddleware(customMiddleware)
);
