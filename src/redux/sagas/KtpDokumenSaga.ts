import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

import { navigation } from '../../config';
import { ApiResponse, KtpDokumenApi } from '../../config/apis';
import { formatter } from '../../utils';
import {
  fetchKtpDokumen,
  fetchKtpDokumenFailed,
  fetchKtpDokumenSuccess,
  fetchUploadGambarKtp,
  fetchUploadGambarKtpFailed,
  fetchUploadGambarKtpSuccess,
  KtpDokumenResponse,
  removeKtpImage,
  removeKtpSelfie,
} from '../reducers/KtpReducer';
import { hideLoading, showLoading } from '../reducers/LoadingReducer';

function* getKtpDokumen() {
  yield put(showLoading());

  try {
    const response: AxiosResponse<ApiResponse<KtpDokumenResponse>> = yield call(
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
    const response: AxiosResponse<ApiResponse<KtpDokumenResponse>> = yield call(
      KtpDokumenApi.uploadGambarKtp,
      action.payload,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      yield put(fetchUploadGambarKtpSuccess(data?.data));
      yield removeKtpImage();
      yield removeKtpSelfie();
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
