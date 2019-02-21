import {
  SHOW_NOTICE,
  HIDE_NOTICE
} from '../../constants/actionTypes';

export const showNotice = (noticeType) => {
  return {
    type: SHOW_NOTICE,
    noticeType
  };
};

export const hideNotice = () => {
  return { type: HIDE_NOTICE };
};
