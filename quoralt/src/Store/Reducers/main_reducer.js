import { combineReducers } from 'redux'
import auth_reducer from './auth_reducer'
import post_reducer from './post_reducer'

const Reducer = combineReducers({
    auth_reducer,
    post_reducer
})
export default Reducer