import { createStore, combineReducers, applyMiddleware } from 'redux'
// redux thunk library, which enables to create asynchronous actions
import thunk from 'redux-thunk'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
  notification: notificationReducer,
})
export default createStore(
  reducer,
  //Google Chrome extension
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)
