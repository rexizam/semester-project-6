import { favouriteIds } from '../../utility/testing/MockData';
import reducer, { getFavouriteMovieIds } from '../../utility/testing/actions/movieIdsSlice';

describe('FavouriteMoviesIdsReducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([
      {
        completed: false,
        favouriteMovieIds: [],
      },
    ]);
  });

  test('should handle getting the state once it is set', () => {
    const previousState = [];
    expect(reducer(previousState, getFavouriteMovieIds())).toEqual(
      [{ completed: false, favouriteMovieIds: favouriteIds }],
    );
  });
});