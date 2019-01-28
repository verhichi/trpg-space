import { SHOW_MODAL, HIDE_MODAL } from '../../../constants/actionTypes';

const initialState = {
  display: false,
  modalType: '',
  modalProp: {
    //   {
    //     *required
    //     title*: header title of modal
    //     displayClose*: display the X button on the top-right to close modal
    //   }
  }
};

const modalReducer = (state = initialState, action) => {
  switch(action.type){
    case SHOW_MODAL:
      return {
        display:   true,
        modalType: action.modalType,
        modalProp: action.modalProp
      };

    case HIDE_MODAL:
      return {
        display:   false,
        modalType: '',
        modalProp: {}
      };

    default:
      return state;
  }

};

export default modalReducer;
