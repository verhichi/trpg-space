import {
  ADD_USER,
  EDIT_USER,
  REMOVE_USER,
  NEW_HOST
} from '../../../constants/actionTypes';

const initialState = {
  userList: [
  //   {
  //   id: '123457',
  //   name: 'Daichi Nishida',
  //   host: false,
  // }
  ]
};

const userReducer = (state = initialState, action) => {
  switch(action.type){
    case ADD_USER:
      if (state.userList.some(user => user.id === action.userData.id)){
        return state;
      } else {
        return { ...state, userList: [...state.userList, action.userData] };
      }

    case EDIT_USER:
      return {
        userList: state.userList.map((user) => {
          if (user.id === action.userData.id){
            return { ...user, name: action.userData.name };
          } else {
            return user;
          }
        })
      };

    case REMOVE_USER:
      return { userList: state.userList.filter(user => user.id !== action.userId) };

    case NEW_HOST:
      return {
        userList: state.userList.map((user) => {
          if (user.id === action.id){
            return {
              ...user,
              host: true
            };
          } else {
            return user;
          }
        })
      };

    default:
      return state;
    }

};

export default userReducer;
