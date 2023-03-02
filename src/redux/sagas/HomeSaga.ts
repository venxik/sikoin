import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

import { ApiResponse, HomeApi } from '../../config/apis';
import { formatter } from '../../utils';
import {
  BerandaUserResponse,
  fetchBerandaUser,
  getBerandaUserFailed,
  getBerandaUserSuccess,
} from '../reducers/HomeReducer';
import { hideLoading, showLoading } from '../reducers/LoadingReducer';

function* getBerandaUser() {
  yield put(showLoading());
  try {
    const response: AxiosResponse<ApiResponse<BerandaUserResponse>> = yield call(
      HomeApi.getBerandaData,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(getBerandaUserSuccess(data?.data));
      } else {
        yield put(getBerandaUserFailed('Error'));
      }
    } else {
      yield put(getBerandaUserFailed('Error'));
    }
  } catch (error) {
    yield put(getBerandaUserFailed(error));
  }
  yield put(hideLoading());
}

export function* watchGetBerandaUser() {
  yield takeLatest(fetchBerandaUser, getBerandaUser);
}
