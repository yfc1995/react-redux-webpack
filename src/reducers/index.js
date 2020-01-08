import { combineReducers } from 'redux';
import PointR from './point';
import LookAtMatrixR from './LookAtMatrix';
import AnimateR from './Animate';
import OPMRender from './OPM';
import LookAndOrthR from './LookAndOrth';
import perspectiveR from './PerspectiveMatrix';
import CubeR from './Cube';

const appReducer = combineReducers({
  point: PointR,
  look: LookAtMatrixR,
  animatePentagram: AnimateR,
  opm: OPMRender,
  orth: LookAndOrthR,
  perspective: perspectiveR,
  cube: CubeR
});
export default appReducer;
