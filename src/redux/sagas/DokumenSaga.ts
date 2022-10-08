import { AxiosResponse } from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';
import { DokumenApi } from '../../config/apis';
import { hideLoading, showLoading } from '../reducers/LoadingReducer';
import { formatter } from '../../utils';
import {
  fetchDokumen,
  fetchDokumenFailed,
  fetchDokumenSuccess,
} from '../reducers/DokumenReducer';

function* getAllDokumen() {
  yield put(showLoading());
  try {
    const response: AxiosResponse = yield call(DokumenApi.getAllDokumen);
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
