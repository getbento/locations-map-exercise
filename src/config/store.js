import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from '../reducers';

const rootReducer = combineReducers(reducers);

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(
  thunk,
  logger // comment this out in production
)));

export default store;
