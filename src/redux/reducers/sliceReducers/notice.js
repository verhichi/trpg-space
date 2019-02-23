import {
  SHOW_NOTICE,
  HIDE_NOTICE
} from '../../../constants/actionTypes';

const initialState = {
  display:    false,
  noticeType: ''
};

const noticeReducer = (state = initialState, action) => {
  switch(action.type){
    case SHOW_NOTICE:
      return {
        display:    true,
        noticeType: action.noticeType
      };

    case HIDE_NOTICE:
      return {
        ...state,
        display:    false,
      };

    default:
      return state;
  }

};

export default noticeReducer;
