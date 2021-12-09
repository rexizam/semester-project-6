import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { favouriteIds } from '../MockData';

const initialState = [
  {
    completed: false,
    favouriteMovieIds: [],
  },
];

const favouriteMovieIdsSlice = createSlice({
  name: 'favouriteMovieIds',
  initialState,
  reducers: {
    getFavouriteMovieIds(state, action: PayloadAction<number>) {
      if (action) {
        console.log(action, '1')
        state.push({
          favouriteMovieIds: favouriteIds,
          completed: false,
        });
      } else {
        console.log(action, '2')
        favouriteIds.push(action.payload);
        state = [];
        state.push({
          favouriteMovieIds: favouriteIds,
          completed: false,
        });
      }
    },
  },
});

export const { getFavouriteMovieIds } = favouriteMovieIdsSlice.actions;

export default favouriteMovieIdsSlice.reducer;