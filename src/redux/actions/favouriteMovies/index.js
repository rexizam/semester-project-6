import { getRealmService } from '../../../realm-cli';

// Get genres
export const getFavouriteMovies = () => {
  return dispatch => {
    const realmService = getRealmService();
    realmService.currentUser.functions.callFunction('getFavouriteMovies').then(res => {
        console.log(res);
        dispatch({
          type: 'GET_FAVOURITE_MOVIES',
          favouriteMovies: res,
        });
      },
    );
  };
};