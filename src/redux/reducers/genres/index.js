// ** Initial State
const initialState = {
    genres: [],
}

const genresReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_GENRES':
            console.log(action)
            return { ...state, genres: action.genres}
        default:
            return state
    }
}
export default genresReducer
