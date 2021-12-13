// ** Initial State
const initialState = {
  favouriteMovieIds: [],
}

const favouriteMovieIdsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_FAVOURITE_MOVIE_IDS':
      return { ...state, favouriteMovieIds: action}
    default:
      return state
  }
}
export default favouriteMovieIdsReducer;