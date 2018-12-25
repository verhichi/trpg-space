import axios from 'axios';

export const axiosGet = (uri, params) => {
  return axios.get(uri, params)
};

export const axiosPost = (uri, params) => {
  return axios.post(uri, params)
};
