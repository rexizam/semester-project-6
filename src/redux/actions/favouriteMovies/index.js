import { getRealmService } from '../../../realm-cli';

export const getFavouriteMovieIds = () => {
  return dispatch => {
    const realmService = getRealmService();
    realmService.currentUser.functions.callFunction('getFavouriteMovies').then(res => {
        dispatch({
          type: 'GET_FAVOURITE_MOVIE_IDS',
          favouriteMovies: res,
        });
      },
    );
  };
};