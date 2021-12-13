import { getRealmService } from '../../../realm-cli';

export const getRatedMovies = () => {
  return dispatch => {
    const realmService = getRealmService();
    realmService?.currentUser?.functions.callFunction('getMovieRatings').then(res => {
        dispatch({
          type: 'GET_RATED_MOVIES',
          ratedMovies: res,
        });
      },
    );
  };
};