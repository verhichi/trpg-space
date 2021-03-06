import { combineReducers } from 'redux';

import audioReducer        from './sliceReducers/audio';
import charReducer        from './sliceReducers/char';
import chatLogReducer     from './sliceReducers/chatLog';
import chatSettingReducer from './sliceReducers/chatSetting';
import displayReducer     from './sliceReducers/display';
import geoReducer         from './sliceReducers/geo';
import globalReducer      from './sliceReducers/global';
import mapReducer         from './sliceReducers/map';
import mapCharReducer     from './sliceReducers/mapChar';
import modalReducer       from './sliceReducers/modal';
import noteReducer        from './sliceReducers/note';
import userReducer        from './sliceReducers/user';

import { RESET_STATE } from '../../constants/actionTypes';

const appReducer = combineReducers({
  audioList:      audioReducer,
  charList:       charReducer,
  chatLog:        chatLogReducer,
  chatSetting:    chatSettingReducer,
  displaySetting: displayReducer,
  geoList:        geoReducer,
  global:         globalReducer,
  mapList:        mapReducer,
  mapCharList:    mapCharReducer,
  modalSetting:   modalReducer,
  noteList:       noteReducer,
  userList:       userReducer,
});

const rootReducer = (state, action) => {
  if (action.type === RESET_STATE){
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
