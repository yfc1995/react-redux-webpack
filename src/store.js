import { applyMiddleware, createStore } from 'redux';
import appReducer from './reducers';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
const log = createLogger();
const store = createStore(appReducer, applyMiddleware(thunk, log));

export default store;
