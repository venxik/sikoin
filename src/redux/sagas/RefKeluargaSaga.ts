import { AxiosResponse } from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';
import { RefKeluargaApi } from '../../config/apis';
import { goBack } from '../../config/navigation';
import { hideLoading, showLoading } from '../reducers/LoadingReducer';
import { isEmpty } from 'lodash';
import {
  fetchGetRefKeluarga,
  getRefKeluargaFailed,
  getRefKeluargaSuccess,
  fetchSubmitRefKeluarga,
  submitRefKeluargaFailed,
  submitRefKeluargaSuccess,
  fetchUpdateRefKeluarga,
  updateRefKeluargaFailed,
  updateRefKeluargaSuccess,
  RefKeluargaResponse,
} from '../reducers/RefKeluargaReducer';
import { formatter } from '../../utils';

function* getRefKeluarga() {
  yield put(showLoading());

  try {
    const response: AxiosResponse<{ data: RefKeluargaResponse[] }> = yield call(
      RefKeluargaApi.getRefKeluargaList,
    );
    console.log('getRefKeluarga response: ', response);

    if (response.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      yield put(getRefKeluargaSuccess(data?.data));
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
    const response: AxiosResponse<{ data: RefKeluargaResponse[] }> = yield call(
      RefKeluargaApi.updateRefKeluarga,
      action.payload,
    );
    console.log('updateRefKeluarga response: ', response);

    if (response.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      yield put(updateRefKeluargaSuccess(data?.data));
      if (!isEmpty(data?.data)) {
        goBack();
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
    const response: AxiosResponse<{ data: RefKeluargaResponse[] }> = yield call(
      RefKeluargaApi.submitRefKeluarga,
      action.payload,
    );
    console.log('submitRefKeluarga response: ', response);

    if (response.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      yield put(submitRefKeluargaSuccess(data?.data));
      if (!isEmpty(data?.data)) {
        goBack();
      }
    } else {
      yield put(submitRefKeluargaFailed('Error'));
    }
  } catch (error) {
    yield put(submitRefKeluargaFailed(error));
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