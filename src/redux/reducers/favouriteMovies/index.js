// ** Initial State
const initialState = {
  favouriteMovies: [],
}

const favouriteMoviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_FAVOURITE_MOVIES':
      console.log(action)
      return { ...state, favouriteMovies: action.favouriteMovies}
    default:
      return state
  }
}
export default favouriteMoviesReducer
