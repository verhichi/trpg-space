import { createStore } from 'redux';
import rootReducer, { initialState } from '../reducers/reducer';

export const store = createStore(rootReducer, initialState);
