import {combineReducers} from 'redux';
import PointR from './point';
import LookAtMatrixR from './LookAtMatrix'
import AnimateR from './Animate'

const appReducer = combineReducers({
  point: PointR,
  look: LookAtMatrixR,
  animatePentagram: AnimateR
})
export default appReducer;

