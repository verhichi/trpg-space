import {
  SHOW_DICE_BUBBLE,
  HIDE_DICE_BUBBLE,
  SHOW_SIDEBAR,
  HIDE_SIDEBAR,
  SHOW_CHAT,
  SHOW_MAP,
  SHOW_PLACE_CHAR,
  HIDE_PLACE_CHAR,
  SHOW_REMOVE_CHAR,
  HIDE_REMOVE_CHAR,
  SHOW_MAP_SCALE,
  HIDE_MAP_SCALE,
  SET_SIDEBAR_CHAR,
  SET_SIDEBAR_NOTE
} from '../../../constants/actionTypes';

import {
  SIDEBAR_MODE_CHAR,
  SIDEBAR_MODE_NOTE,
  CENTER_MODE_CHAT,
  CENTER_MODE_MAP
} from '../../../constants/constants';

const initialState = {
  displaySidebar:     false,
  displayDiceSetting: false,
  displayPlaceChar:   false,
  displayRemoveChar:  false,
  displayMapScale:    false,
  sidebarTabMode:     SIDEBAR_MODE_CHAR,
  centerMode:         CENTER_MODE_CHAT,
};

const displayReducer = (state = initialState, action) => {
  switch(action.type){
    case SHOW_DICE_BUBBLE:
      return {
        ...state,
        displayDiceSetting: true
      };

    case HIDE_DICE_BUBBLE:
      return {
        ...state,
        displayDiceSetting: false
      };

    case SHOW_SIDEBAR:
      return {
        ...state,
        displaySidebar: true
      };

    case HIDE_SIDEBAR:
      return {
        ...state,
        displaySidebar: false
      };

    case SHOW_CHAT:
      return {
        ...state,
        centerMode: CENTER_MODE_CHAT
      };

    case SHOW_MAP:
      return {
        ...state,
        centerMode: CENTER_MODE_MAP
      };

    case SHOW_PLACE_CHAR:
      return {
        ...state,
        displayPlaceChar: true
      };

    case HIDE_PLACE_CHAR:
      return {
        ...state,
        displayPlaceChar: false
      };

    case SHOW_REMOVE_CHAR:
      return {
        ...state,
        displayRemoveChar: true
      };

    case HIDE_REMOVE_CHAR:
      return {
        ...state,
        displayRemoveChar: false
      };

    case SHOW_MAP_SCALE:
      return {
        ...state,
        displayMapScale: true
      };

    case HIDE_MAP_SCALE:
      return {
        ...state,
        displayMapScale: false
      };

    case SET_SIDEBAR_CHAR:
      return {
        ...state,
        sidebarTabMode: SIDEBAR_MODE_CHAR
      };

    case SET_SIDEBAR_NOTE:
      return {
        ...state,
        sidebarTabMode: SIDEBAR_MODE_NOTE
      };

    default:
      return state;
  }

};

export default displayReducer;
