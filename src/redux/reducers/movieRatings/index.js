// ** Initial State
const initialState = {
  ratedMovies: [],
}

const ratedMoviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_RATED_MOVIES':
      return { ...state, ratedMovies: action}
    default:
      return state
  }
}
export default ratedMoviesReducer;