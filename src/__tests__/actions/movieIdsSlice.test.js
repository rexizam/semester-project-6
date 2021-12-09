import reducer, { getFavouriteMovieIds } from './movieIdsSlice';
import { favouriteIds } from '../testUtilities';

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

test('should handle a favouriteMovieId being added to an existing list', () => {
  const previousState = [{ completed: false, favouriteMovieIds: favouriteIds }];
  expect(reducer(previousState, getFavouriteMovieIds(6666))).toEqual([{ completed: false, favouriteMovieIds: favouriteIds}]);
});