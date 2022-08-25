// Imports: Dependencies
import { all, fork } from 'redux-saga/effects';
import {
  watchGetAlamat,
  watchSubmitAlamat,
  watchUpdateAlamat,
  watchDeleteAlamat,
} from './AlamatSaga';
import { watchGetBiodata, watchUpdateBiodata } from './BiodataSaga';
import { watchGetBerandaUser } from './HomeSaga';
import { watchGetKtpDokumen } from './KtpDokumenSaga';
import {
  watchForgotPassword,
  watchGetKoperasiList,
  watchLogin,
  watchSendKoperasiData,
  watchSendUserKoperasiEmail,
} from './LoginSaga';
import { watchGetPekerjaan, watchUpdatePekerjaan } from './PekerjaanSaga';
import { watchGetProfile, watchUpdateProfile } from './ProfileSaga';
import {
  watchGetRefKeluarga,
  watchSubmitRefKeluarga,
  watchUpdateRefKeluarga,
  watchDeleteRefKeluarga,
} from './RefKeluargaSaga';
import {
  watchGetCreateSaldoList,
  watchGetCreateSimpananList,
  watchGetSaldoData,
  watchGetSimpananData,
  watchSubmitTopup,
  watchSubmitPenarikan,
} from './SaldoSimpananSaga';

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
    fork(watchGetBiodata),
    fork(watchUpdateBiodata),
    fork(watchGetPekerjaan),
    fork(watchUpdatePekerjaan),
    fork(watchDeleteAlamat),
    fork(watchDeleteRefKeluarga),
    fork(watchGetSaldoData),
    fork(watchGetCreateSaldoList),
    fork(watchSubmitTopup),
    fork(watchGetSimpananData),
    fork(watchGetCreateSimpananList),
    fork(watchSubmitPenarikan),
    fork(watchGetKtpDokumen),
  ]);
}
