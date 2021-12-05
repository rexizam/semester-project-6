// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import genresReducer from '../reducers/genres/index'

const rootReducer = combineReducers({
  navbar,
  layout,
  genresReducer
})

export default rootReducer
