// Imports: Dependencies
import { all, fork } from 'redux-saga/effects';
import {
  watchGetAlamat,
  watchSubmitAlamat,
  watchUpdateAlamat,
} from './AlamatSaga';
import {
  watchForgotPassword,
  watchGetKoperasiList,
  watchLogin,
  watchSendKoperasiData,
  watchSendUserKoperasiEmail,
} from './LoginSaga';

// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([
    fork(watchGetKoperasiList),
    fork(watchSendKoperasiData),
    fork(watchSendUserKoperasiEmail),
    fork(watchForgotPassword),
    fork(watchLogin),
    fork(watchGetAlamat),
    fork(watchSubmitAlamat),
    fork(watchUpdateAlamat),
  ]);
}
