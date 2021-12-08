// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import genresReducer from './genres'
import favouriteMovieIdsReducer from './favouriteMovies';

const rootReducer = combineReducers({
  navbar,
  layout,
  genresReducer,
  favouriteMovieIdsReducer
})

export default rootReducer
