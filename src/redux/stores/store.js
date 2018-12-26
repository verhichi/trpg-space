import { configureStore } from './configureStore';
import SocketAPI from '../../socket/socketClient';

const socketClient = new SocketAPI();
const store = configureStore(socketClient);

export default store;
