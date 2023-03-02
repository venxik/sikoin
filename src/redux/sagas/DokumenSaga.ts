import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

import { ApiResponse, DokumenApi } from '../../config/apis';
import { formatter } from '../../utils';
import {
  DokumenData,
  fetchDokumen,
  fetchDokumenFailed,
  fetchDokumenSuccess,
} from '../reducers/DokumenReducer';
import { hideLoading, showLoading } from '../reducers/LoadingReducer';

function* getAllDokumen() {
  yield put(showLoading());
  try {
    const response: AxiosResponse<ApiResponse<DokumenData[]>> = yield call(
      DokumenApi.getAllDokumen,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(fetchDokumenSuccess(data?.data));
      } else {
        yield put(fetchDokumenFailed('Error'));
      }
    } else {
      yield put(fetchDokumenFailed('Error'));
    }
  } catch (error) {
    yield put(fetchDokumenFailed(error));
  }
  yield put(hideLoading());
}

export function* watchGetAllDokumen() {
  yield takeLatest(fetchDokumen, getAllDokumen);
}
