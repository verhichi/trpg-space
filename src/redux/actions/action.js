import  { ADD_ARTICLE } from '../constants/actionTypes';

export const addArticle = (article) => {
  return {
    type: ADD_ARTICLE,
    payload: article
  };
};
