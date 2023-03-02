import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

import { ApiResponse, NotifikasiApi } from '../../config/apis';
import { navigate } from '../../config/navigation';
import { formatter } from '../../utils';
import { hideLoading, showLoading } from '../reducers/LoadingReducer';
import {
  fetchNotifikasi,
  fetchNotifikasiDetail,
  fetchNotifikasiDetailFailed,
  fetchNotifikasiDetailSuccess,
  fetchNotifikasiFailed,
  fetchNotifikasiSuccess,
  NotifikasiDetail,
  NotifikasiResponse,
} from '../reducers/NotifikasiReducer';

function* getAllNotifikasi() {
  yield put(showLoading());
  try {
    const response: AxiosResponse<ApiResponse<NotifikasiResponse>> = yield call(
      NotifikasiApi.getAllNotifikasi,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(fetchNotifikasiSuccess(data?.data));
      } else {
        yield put(fetchNotifikasiFailed('Error'));
      }
    } else {
      yield put(fetchNotifikasiFailed('Error'));
    }
  } catch (error) {
    yield put(fetchNotifikasiFailed(error));
  }
  yield put(hideLoading());
}

function* getNotifikasiDetail(action: ReturnType<typeof fetchNotifikasiDetail>) {
  yield put(showLoading());
  try {
    const response: AxiosResponse<ApiResponse<NotifikasiDetail>> = yield call(
      NotifikasiApi.getNotifikasiDetail,
      action.payload,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(fetchNotifikasiDetailSuccess(data?.data));
        navigate('ChatDetailScreen');
      } else {
        yield put(fetchNotifikasiDetailFailed('Error'));
      }
    } else {
      yield put(fetchNotifikasiDetailFailed('Error'));
    }
  } catch (error) {
    yield put(fetchNotifikasiDetailFailed(error));
  }
  yield put(hideLoading());
}
export function* watchGetAllNotifikasi() {
  yield takeLatest(fetchNotifikasi, getAllNotifikasi);
}

export function* watchGetNotifikasiDetail() {
  yield takeLatest(fetchNotifikasiDetail, getNotifikasiDetail);
}
