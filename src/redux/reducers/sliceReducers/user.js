import {
  ADD_USER,
  EDIT_USER,
  REMOVE_USER,
  NEW_HOST
} from '../../../constants/actionTypes';

const initialState = [
  //   {
  //   id: '123457',
  //   name: 'Daichi Nishida',
  //   host: false,
  // }
];

const userReducer = (state = initialState, action) => {
  switch(action.type){
    case ADD_USER:
      if (state.some(user => user.id === action.userData.id)){
        return state;
      } else {
        return [...state, action.userData];
      }

    case EDIT_USER:
      return state.map(user => {
        if (user.id === action.userData.id){
          return { ...user, name: action.userData.name };
        } else {
          return user;
        }
      });

    case REMOVE_USER:
      return state.filter(user => user.id !== action.userId);

    case NEW_HOST:
      return state.map(user => {
        if (user.id === action.id){
          return {
            ...user,
            host: true
          };
        } else {
          return user;
        }
      });

    default:
      return state;
  }

};

export default userReducer;
