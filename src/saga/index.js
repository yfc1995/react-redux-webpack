import { fork } from 'redux-saga/effects';
import { addSyncSaga } from './point';
import { opmSaga } from './OPM';
import { watchChangeEye, watchChangeOpm } from './LookAndOrth';
import { watchEyeForPerspective, watchPerspective } from './Perspective';

export default function* appSaga() {
  yield fork(addSyncSaga);
  yield fork(opmSaga);
  yield fork(watchChangeEye);
  yield fork(watchChangeOpm);
  yield fork(watchEyeForPerspective);
  yield fork(watchPerspective);
}
