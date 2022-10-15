import { AxiosResponse } from 'axios';
import { isEmpty } from 'lodash';
import { call, put, takeLatest } from 'redux-saga/effects';

import { PekerjaanApi } from '../../config/apis';
import { goBack } from '../../config/navigation';
import { formatter } from '../../utils';
import { hideLoading, showLoading } from '../reducers/LoadingReducer';
import {
  fetchPekerjaan,
  fetchUpdatePekerjaan,
  getPekerjaanFailed,
  getPekerjaanSuccess,
  PekerjaanResponse,
  updatePekerjaanFailed,
  updatePekerjaanSuccess,
} from '../reducers/PekerjaanReducer';

function* getPekerjaan() {
  yield put(showLoading());
  try {
    const response: AxiosResponse<{ data: PekerjaanResponse }> = yield call(
      PekerjaanApi.getPekerjaan,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(getPekerjaanSuccess(data?.data));
      } else {
        yield put(getPekerjaanFailed('Error'));
      }
    } else {
      yield put(getPekerjaanFailed('Error'));
    }
  } catch (error) {
    yield put(getPekerjaanFailed(error));
  }
  yield put(hideLoading());
}

function* updatePekerjaan(action: ReturnType<typeof fetchUpdatePekerjaan>) {
  yield put(showLoading());
  try {
    const response: AxiosResponse<{ data: PekerjaanResponse }> = yield call(
      PekerjaanApi.updatePekerjaan,
      action.payload,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(updatePekerjaanSuccess(data?.data));
        if (!isEmpty(data?.data)) {
          goBack();
        }
      } else {
        yield put(updatePekerjaanFailed('Error'));
      }
    } else {
      yield put(updatePekerjaanFailed('Error'));
    }
  } catch (error) {
    yield put(updatePekerjaanFailed(error));
  }
  yield put(hideLoading());
}

export function* watchGetPekerjaan() {
  yield takeLatest(fetchPekerjaan, getPekerjaan);
}

export function* watchUpdatePekerjaan() {
  yield takeLatest(fetchUpdatePekerjaan, updatePekerjaan);
}
