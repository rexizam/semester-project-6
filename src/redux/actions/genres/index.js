import axios from 'axios';

// Get genres
export const getGenres = () => {
    return dispatch => {
        return axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=932ce23b1d215099f52391b9c1fd7226').then(res => {
            console.log(res.data)
            dispatch({
                type: 'GET_GENRES',
                genres: res.data
            })
        })
    }
}