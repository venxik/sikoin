import { AxiosResponse } from 'axios';
import { isEmpty } from 'lodash';
import { call, put, takeLatest } from 'redux-saga/effects';

import { ApiResponse, RefKeluargaApi } from '../../config/apis';
import { goBack } from '../../config/navigation';
import { formatter } from '../../utils';
import { hideLoading, showLoading } from '../reducers/LoadingReducer';
import {
  fetchDeleteRefKeluarga,
  fetchGetRefKeluarga,
  fetchSubmitRefKeluarga,
  fetchUpdateRefKeluarga,
  getRefKeluargaFailed,
  getRefKeluargaSuccess,
  RefKeluargaResponse,
  setDeleteRefKeluargaStatus,
  submitRefKeluargaFailed,
  submitRefKeluargaSuccess,
  updateRefKeluargaFailed,
  updateRefKeluargaSuccess,
} from '../reducers/RefKeluargaReducer';

function* getRefKeluarga() {
  yield put(showLoading());
  try {
    const response: AxiosResponse<ApiResponse<RefKeluargaResponse[]>> = yield call(
      RefKeluargaApi.getRefKeluargaList,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(getRefKeluargaSuccess(data?.data));
      } else {
        yield put(getRefKeluargaFailed('Error'));
      }
    } else {
      yield put(getRefKeluargaFailed('Error'));
    }
  } catch (error) {
    yield put(getRefKeluargaFailed(error));
  }
  yield put(hideLoading());
}

function* updateRefKeluarga(action: ReturnType<typeof fetchUpdateRefKeluarga>) {
  yield put(showLoading());
  try {
    const response: AxiosResponse<ApiResponse<RefKeluargaResponse[]>> = yield call(
      RefKeluargaApi.updateRefKeluarga,
      action.payload,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(updateRefKeluargaSuccess(data?.data));
        if (!isEmpty(data?.data)) {
          goBack();
        }
      } else {
        yield put(updateRefKeluargaFailed('Error'));
      }
    } else {
      yield put(updateRefKeluargaFailed('Error'));
    }
  } catch (error) {
    yield put(updateRefKeluargaFailed(error));
  }
  yield put(hideLoading());
}

function* submitRefKeluarga(action: ReturnType<typeof fetchSubmitRefKeluarga>) {
  yield put(showLoading());
  try {
    const response: AxiosResponse<ApiResponse<RefKeluargaResponse[]>> = yield call(
      RefKeluargaApi.submitRefKeluarga,
      action.payload,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(submitRefKeluargaSuccess(data?.data));
        if (!isEmpty(data?.data)) {
          goBack();
        }
      } else {
        yield put(submitRefKeluargaFailed('Error'));
      }
    } else {
      yield put(submitRefKeluargaFailed('Error'));
    }
  } catch (error) {
    yield put(submitRefKeluargaFailed(error));
  }
  yield put(hideLoading());
}

function* deleteRefKeluarga(action: ReturnType<typeof fetchDeleteRefKeluarga>) {
  yield put(showLoading());

  try {
    const response: AxiosResponse<{ data: RefKeluargaResponse[] }> = yield call(
      RefKeluargaApi.deleteRefKeluarga,
      action.payload,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      yield put(submitRefKeluargaSuccess(data?.data));
      yield put(setDeleteRefKeluargaStatus('success'));
    } else {
      yield put(submitRefKeluargaFailed('Error'));
      yield put(setDeleteRefKeluargaStatus('failed'));
    }
  } catch (error) {
    yield put(submitRefKeluargaFailed(error));
    yield put(setDeleteRefKeluargaStatus('failed'));
  }
  yield put(hideLoading());
}

export function* watchGetRefKeluarga() {
  yield takeLatest(fetchGetRefKeluarga, getRefKeluarga);
}

export function* watchUpdateRefKeluarga() {
  yield takeLatest(fetchUpdateRefKeluarga, updateRefKeluarga);
}

export function* watchSubmitRefKeluarga() {
  yield takeLatest(fetchSubmitRefKeluarga, submitRefKeluarga);
}

export function* watchDeleteRefKeluarga() {
  yield takeLatest(fetchDeleteRefKeluarga, deleteRefKeluarga);
}
