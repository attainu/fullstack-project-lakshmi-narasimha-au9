import { createStore, applyMiddleware } from 'redux'
import Reducer from './Reducers/main_reducer'
import promiseMiddleware from 'redux-promise'

const Store = createStore(Reducer, applyMiddleware(promiseMiddleware))

export default Store