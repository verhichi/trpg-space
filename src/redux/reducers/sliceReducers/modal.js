import { SHOW_MODAL, HIDE_MODAL } from '../../../constants/actionTypes';

const initialState = {
  modalSetting: {
    display: false,
    modalType: '',
    modalProp: {
      //   {
      //     *required
      //     title*: header title of modal
      //     displayClose*: display the X button on the top-right to close modal
      //   }
    }
  }
};

const modalReducer = (state = initialState, action) => {
  switch(action.type){
    case SHOW_MODAL:
      return {
        modalSetting: {
          display:   true,
          modalType: action.modalType,
          modalProp: action.modalProp
        }
      };

    case HIDE_MODAL:
      return {
        modalSetting: {
          display:   false,
          modalType: '',
          modalProp: {}
        }
      };

    default:
      return state;
  }

};

export default modalReducer;
