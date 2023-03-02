import { AxiosResponse } from 'axios';
import { isEmpty } from 'lodash';
import { call, put, takeLatest } from 'redux-saga/effects';

import { ApiResponse, BiodataApi } from '../../config/apis';
import { goBack } from '../../config/navigation';
import { formatter } from '../../utils';
import {
  BiodataResponse,
  fetchBiodata,
  fetchUpdateBiodata,
  getBiodataFailed,
  getBiodataSuccess,
  updateBiodataFailed,
  updateBiodataSuccess,
} from '../reducers/BiodataReducer';
import { hideLoading, showLoading } from '../reducers/LoadingReducer';

function* getBiodata() {
  yield put(showLoading());
  try {
    const response: AxiosResponse<ApiResponse<BiodataResponse>> = yield call(BiodataApi.getBiodata);
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(getBiodataSuccess(data?.data));
      } else {
        yield put(getBiodataFailed('Error'));
      }
    } else {
      yield put(getBiodataFailed('Error'));
    }
  } catch (error) {
    yield put(getBiodataFailed(error));
  }
  yield put(hideLoading());
}

function* updateBiodata(action: ReturnType<typeof fetchUpdateBiodata>) {
  yield put(showLoading());
  try {
    const response: AxiosResponse<ApiResponse<BiodataResponse>> = yield call(
      BiodataApi.updateBiodata,
      action.payload,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(updateBiodataSuccess(data?.data));
        if (!isEmpty(data?.data)) {
          goBack();
        }
      } else {
        yield put(updateBiodataFailed('Error'));
      }
    } else {
      yield put(updateBiodataFailed('Error'));
    }
  } catch (error) {
    yield put(updateBiodataFailed(error));
  }
  yield put(hideLoading());
}

export function* watchGetBiodata() {
  yield takeLatest(fetchBiodata, getBiodata);
}

export function* watchUpdateBiodata() {
  yield takeLatest(fetchUpdateBiodata, updateBiodata);
}
