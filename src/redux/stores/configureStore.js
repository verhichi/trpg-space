import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer2';

// export const store = createStore(rootReducer, initialState);
export const store = createStore(rootReducer);

console.log(store.getState());
