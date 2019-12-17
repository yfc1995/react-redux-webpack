import { call, put, takeEvery } from 'redux-saga/effects';

const axios = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(10)
  }, 1000)
})

function* addSync() {
  try {
    const res = yield call(axios);
    console.log(res);
    yield put({type: 'ADDASYNC', res});
  } catch (error) {
    console.log(error)
    yield put({type:'INITERROR', error});
  }
}

export function* addSyncSaga() {
  yield takeEvery('ADDASYNC_SAGA', addSync);
}
