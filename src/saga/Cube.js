import { takeEvery, put } from 'redux-saga/effects';
import CubeActive from '../actions/CubeAction';

function* ChangeEyeForCube(actions) {
  yield put({ type: CubeActive.changeEyeForCube, payload: actions.payload });
}

function* watchChangeEyeForCube() {
  yield takeEvery('WATCHCHANGEEYEFORCUBE', ChangeEyeForCube);
}

export {
  watchChangeEyeForCube
}

