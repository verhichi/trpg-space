import { combineReducers } from 'redux';

import charReducer        from './sliceReducers/char';
import chatLogReducer     from './sliceReducers/chatLog';
import chatSettingReducer from './sliceReducers/chatSetting';
import displayReducer     from './sliceReducers/display';
import globalReducer      from './sliceReducers/global';
import mapReducer         from './sliceReducers/map';
import modalReducer       from './sliceReducers/modal';
import noteReducer        from './sliceReducers/note';
import userReducer        from './sliceReducers/user';

import { RESET_STATE } from '../../constants/actionTypes';

const appReducer = combineReducers({
  charList:       charReducer,
  chatLog:        chatLogReducer,
  chatSetting:    chatSettingReducer,
  displaySetting: displayReducer,
  global:         globalReducer,
  mapSetting:     mapReducer,
  modalSetting:   modalReducer,
  noteSetting:    noteReducer,
  userList:       userReducer,
});

const rootReducer = (state, action) => {
  if (action.type === RESET_STATE){
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
