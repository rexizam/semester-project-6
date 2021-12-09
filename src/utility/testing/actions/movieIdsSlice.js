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
        state.push({
          favouriteMovieIds: favouriteIds,
          completed: false,
        });
      } else {
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