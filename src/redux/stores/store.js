// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from '../reducers/reducer';
import { configureStore } from './configureStore';
import SocketAPI from '../../socket/socketClient';

const socketClient = new SocketAPI();
const store = configureStore(socketClient);
// const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
