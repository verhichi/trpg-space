import { combineReducers } from 'redux';

import charReducer        from './sliceReducers/char';
import chatLogReducer     from './sliceReducers/chatLog';
import chatSettingReducer from './sliceReducers/chatSetting';
import displayReducer     from './sliceReducers/display';
import expireReducer      from './sliceReducers/expire';
import geoReducer         from './sliceReducers/geo';
import globalReducer      from './sliceReducers/global';
import mapReducer         from './sliceReducers/map';
import mapCharReducer     from './sliceReducers/mapChar';
import modalReducer       from './sliceReducers/modal';
import noteReducer        from './sliceReducers/note';
import noticeReducer      from './sliceReducers/notice';
import userReducer        from './sliceReducers/user';

import { RESET_STATE } from '../../constants/actionTypes';

const appReducer = combineReducers({
  charList:       charReducer,
  chatLog:        chatLogReducer,
  chatSetting:    chatSettingReducer,
  displaySetting: displayReducer,
  expireSetting:  expireReducer,
  geoList:        geoReducer,
  global:         globalReducer,
  mapList:        mapReducer,
  mapCharList:    mapCharReducer,
  modalSetting:   modalReducer,
  noteSetting:    noteReducer,
  noticeSetting:  noticeReducer,
  userList:       userReducer,
});

const rootReducer = (state, action) => {
  if (action.type === RESET_STATE){
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
