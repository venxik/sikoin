import { AxiosResponse } from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';
import { KtpDokumenApi } from '../../config/apis';
import { hideLoading, showLoading } from '../reducers/LoadingReducer';
import { formatter } from '../../utils';
import {
  fetchKtpDokumen,
  fetchKtpDokumenFailed,
  fetchKtpDokumenSuccess,
  fetchUploadGambarKtp,
  fetchUploadGambarKtpFailed,
  fetchUploadGambarKtpSuccess,
  KtpDokumenResponse,
} from '../reducers/KtpReducer';
import { navigation } from '../../config';

function* getKtpDokumen() {
  yield put(showLoading());

  try {
    const response: AxiosResponse<{ data: KtpDokumenResponse }> = yield call(
      KtpDokumenApi.getKtpData,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      yield put(fetchKtpDokumenSuccess(data?.data));
    } else {
      yield put(fetchKtpDokumenFailed('Error'));
    }
  } catch (error) {
    yield put(fetchKtpDokumenFailed(error));
  }
  yield put(hideLoading());
}

function* uploadGambarKtp(action: ReturnType<typeof fetchUploadGambarKtp>) {
  yield put(showLoading());

  try {
    const response: AxiosResponse<{ data: KtpDokumenResponse }> = yield call(
      KtpDokumenApi.uploadGambarKtp,
      action.payload,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      yield put(fetchUploadGambarKtpSuccess(data?.data));
      navigation.goBack();
    } else {
      yield put(fetchUploadGambarKtpFailed('Error'));
    }
  } catch (error) {
    yield put(fetchUploadGambarKtpFailed(error));
  }
  yield put(hideLoading());
}

export function* watchGetKtpDokumen() {
  yield takeLatest(fetchKtpDokumen, getKtpDokumen);
}

export function* watchUploadGambarKtp() {
  yield takeLatest(fetchUploadGambarKtp, uploadGambarKtp);
}