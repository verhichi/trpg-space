import {
  ADD_USER,
  EDIT_USER,
  REMOVE_USER,
  NEW_HOST
} from '../../constants/actionTypes';

export const addUser = (userData) => {
  return {
    type: ADD_USER,
    userData
  };
};

export const editUser = (userData) => {
  return {
    type: EDIT_USER,
    userData
  };
};

export const removeUser = (userId) => {
  return {
    type: REMOVE_USER,
    userId
  };
};

export const newHost = (id) => {
  return {
    type: NEW_HOST,
    id
  };
};
