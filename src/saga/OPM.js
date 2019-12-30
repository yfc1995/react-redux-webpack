import { changeOPMType } from '../actions/OPM';
import { takeEvery, put } from 'redux-saga/effects';

function* changeOpm(action) {
  yield put({type: changeOPMType, payload:action.payload})
}

export function* opmSaga() {
  yield takeEvery("CHANGEOPMSAGA", changeOpm)
}
