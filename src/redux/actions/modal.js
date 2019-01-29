import { SHOW_MODAL, HIDE_MODAL } from '../../constants/actionTypes';

export const showModal = (modalType, modalProp) => {
  return {
    type: SHOW_MODAL,
    modalType,
    modalProp
  }
};

export const hideModal = () => {
  return { type: HIDE_MODAL };
};
