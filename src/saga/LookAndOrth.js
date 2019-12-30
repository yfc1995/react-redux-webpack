import { takeEvery, put } from 'redux-saga/effects';
import { LOOKANDORTHACTION } from '../actions/LookAndOrth';

function* changeEye(actions) {
  yield put({ type: LOOKANDORTHACTION.changeEyeForLookAndOrth, payload:actions.payload});
}
function* changeOpm(actions) {
  yield put({ type: LOOKANDORTHACTION.changeEyeForLookAndOrth, payload:actions.payload });
}

export function* watchChangeEye() {
  yield takeEvery('lookAndOrthChangeEyeForSage', changeEye);
}

export function* watchChangeOpm() {
  yield takeEvery('lookAndOrthChangeOpmForSage', changeOpm);
}
