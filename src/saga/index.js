import { fork } from 'redux-saga/effects';
import { addSyncSaga } from './point';

export default function* appSaga() {
  yield fork(addSyncSaga)
}
