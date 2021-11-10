// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'

const rootReducer = combineReducers({
  navbar,
  layout
})

export default rootReducer
