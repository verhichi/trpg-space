import { SET_ROOM_ID, SET_USER_ID, SET_APP_LANG } from '../../../constants/actionTypes';
import { APP_LANG_EN, APP_LANG_JP } from '../../../constants/constants';

const getBrowserLang = () => {
  return /ja/.test(navigator.language)
           ? APP_LANG_JP
           : APP_LANG_EN;
};

console.log(getBrowserLang());

const initialState = {
  lang:     getBrowserLang(),
  isMobile: /Mobile/.test(navigator.userAgent),
  id:       '',
  roomId:   ''
};

const generalReducer = (state = initialState, action) => {
  switch(action.type){
    case SET_ROOM_ID:
      return {
        ...state,
        roomId: action.roomId
      };

    case SET_USER_ID:
      return {
        ...state,
        id: action.userId
      };

    case SET_APP_LANG:
      return {
        ...state,
        lang: action.lang
      };

    default:
      return state;
  }

};

export default generalReducer;
