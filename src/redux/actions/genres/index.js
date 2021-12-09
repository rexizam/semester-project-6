import axios from 'axios';
import { api, base } from '../../../network/Constants';

export const getGenres = () => {
  return dispatch => {
    return axios.get(`${base}/genre/movie/list?api_key=${api}`).then(res => {
      dispatch({
        type: 'GET_GENRES',
        genres: res.data,
      });
    });
  };
};