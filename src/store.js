import { applyMiddleware, createStore } from 'redux';
import appReducer from './reducers';
// import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import appSaga from './saga/index'
// import thunk from 'redux-thunk';
// const log = createLogger();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(appReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(appSaga);
export default store;
