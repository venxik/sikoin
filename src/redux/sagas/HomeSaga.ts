import { AxiosResponse } from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';
import { HomeApi } from '../../config/apis';
import { hideLoading, showLoading } from '../reducers/LoadingReducer';
import {
  BerandaUserResponse,
  fetchBerandaUser,
  getBerandaUserFailed,
  getBerandaUserSuccess,
} from '../reducers/HomeReducer';
import { formatter } from '../../utils';

function* getBerandaUser() {
  yield put(showLoading());
  try {
    const response: AxiosResponse<{ data: BerandaUserResponse }> = yield call(
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
