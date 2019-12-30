import { takeEvery, put } from 'redux-saga/effects';
import { perspectiveAction } from '../actions/Perspective';

function* changeEye(actions) {
  yield put({ type: perspectiveAction.changeEyeForPerspective, payload: actions.payload });
}

function* changePerspective() {
  yield put({ type: perspectiveAction.changePerspective });
}

export function* watchEyeForPerspective() {
  yield takeEvery('WATCHEYEFORPERSPECTIVE', changeEye);
}

export function* watchPerspective() {
  yield takeEvery('WATCHPERSPECTIVE', changePerspective);
}
