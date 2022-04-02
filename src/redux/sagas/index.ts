// Imports: Dependencies
import { all, fork } from 'redux-saga/effects';
import {
  watchGetAlamat,
  watchSubmitAlamat,
  watchUpdateAlamat,
} from './AlamatSaga';
import { watchGetBerandaUser } from './HomeSaga';
import {
  watchForgotPassword,
  watchGetKoperasiList,
  watchLogin,
  watchSendKoperasiData,
  watchSendUserKoperasiEmail,
} from './LoginSaga';
import { watchGetProfile, watchUpdateProfile } from './ProfileSaga';
import {
  watchGetRefKeluarga,
  watchSubmitRefKeluarga,
  watchUpdateRefKeluarga,
} from './RefKeluargaSaga';

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
    fork(watchGetRefKeluarga),
    fork(watchSubmitRefKeluarga),
    fork(watchUpdateRefKeluarga),
    fork(watchGetBerandaUser),
    fork(watchGetProfile),
    fork(watchUpdateProfile),
  ]);
}
