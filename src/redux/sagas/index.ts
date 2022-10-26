import { all, fork } from 'redux-saga/effects';

import {
  watchDeleteAlamat,
  watchGetAlamat,
  watchSubmitAlamat,
  watchUpdateAlamat,
} from './AlamatSaga';
import { watchGetBiodata, watchUpdateBiodata } from './BiodataSaga';
import { watchGetAllDokumen } from './DokumenSaga';
import { watchGetBerandaUser } from './HomeSaga';
import { watchGetAllKabar, watchGetKabarDetail } from './KabarSaga';
import { watchGetKtpDokumen, watchUploadGambarKtp } from './KtpDokumenSaga';
import {
  watchChangePassword,
  watchForgotPassword,
  watchGetKoperasiList,
  watchGetVersionNumber,
  watchLogin,
  watchLogout,
  watchSendKoperasiData,
  watchSendUserKoperasiEmail,
} from './LoginSaga';
import { watchGetAllNotifikasi, watchGetNotifikasiDetail } from './NotifikasiSaga';
import { watchGetPekerjaan, watchUpdatePekerjaan } from './PekerjaanSaga';
import {
  watchGetPinjamanDataStep1,
  watchGetPinjamanDataStep2,
  watchGetPinjamanDataStep3,
  watchGetPinjamanDataStep4,
  watchGetPinjamanDisetujui,
  watchGetPinjamanDisetujuiDetail,
  watchGetPinjamanDitolak,
  watchGetPinjamanInitialData,
  watchGetPinjamanSummaryData,
  watchPostCreatePinjaman,
  watchUpdateKtpPinjaman,
} from './PinjamanSaga';
import { watchGetIdCard, watchGetProfile, watchUpdateProfile } from './ProfileSaga';
import { watchGetAllPromo, watchGetPromoDetail } from './PromoSaga';
import {
  watchDeleteRefKeluarga,
  watchGetRefKeluarga,
  watchSubmitRefKeluarga,
  watchUpdateRefKeluarga,
} from './RefKeluargaSaga';
import {
  watchGetCreateSaldoList,
  watchGetCreateSimpananList,
  watchGetMutasiSimpanan,
  watchGetSaldoData,
  watchGetSimpananData,
  watchSubmitPenarikan,
  watchSubmitTopup,
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
    fork(watchUploadGambarKtp),
    fork(watchGetPinjamanInitialData),
    fork(watchGetPinjamanDataStep1),
    fork(watchGetPinjamanDataStep2),
    fork(watchGetPinjamanDataStep3),
    fork(watchGetPinjamanDataStep4),
    fork(watchGetPinjamanDisetujui),
    fork(watchGetPinjamanDitolak),
    fork(watchUpdateKtpPinjaman),
    fork(watchGetPinjamanSummaryData),
    fork(watchPostCreatePinjaman),
    fork(watchGetPinjamanDisetujuiDetail),
    fork(watchGetMutasiSimpanan),
    fork(watchGetKabarDetail),
    fork(watchGetAllKabar),
    fork(watchGetAllPromo),
    fork(watchGetPromoDetail),
    fork(watchGetAllDokumen),
    fork(watchGetAllNotifikasi),
    fork(watchGetNotifikasiDetail),
    fork(watchLogout),
    fork(watchGetVersionNumber),
    fork(watchChangePassword),
    fork(watchGetIdCard),
  ]);
}
