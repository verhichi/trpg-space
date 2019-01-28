import { combineReducers } from 'redux';

import charReducer        from './sliceReducers/char';
import chatLogReducer     from './sliceReducers/chatLog';
import chatSettingReducer from './sliceReducers/chatSetting';
import displayReducer     from './sliceReducers/display';
import generalReducer     from './sliceReducers/general';
import mapReducer         from './sliceReducers/map';
import modalReducer       from './sliceReducers/modal';
import noteReducer        from './sliceReducers/note';
import userReducer        from './sliceReducers/user';

const rootReducer = combineReducers({
  charList:       charReducer,
  chatLog:        chatLogReducer,
  chatSetting:    chatSettingReducer,
  displaySetting: displayReducer,
  general:        generalReducer,
  mapSetting:     mapReducer,
  modalSetting:   modalReducer,
  note:           noteReducer,
  userList:       userReducer,
});

export default rootReducer;
