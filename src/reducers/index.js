import {combineReducers} from 'redux';
import PointR from './point';

const appReducer = combineReducers({
  point: PointR
})
export default appReducer;

