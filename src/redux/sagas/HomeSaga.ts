import { AxiosResponse } from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';
import { HomeApi } from '../../config/apis';
import { hideLoading, showLoading } from '../reducers/LoadingReducer';
import {
  BerandaUserResponse,
  fetchBerandaUser,
  fetchBerandaUserFailed,
  fetchBerandaUserSuccess,
} from '../reducers/HomeReducer';
import { formatter } from '../../utils';

function* getBerandaUser() {
  yield put(showLoading());

  try {
    const response: AxiosResponse<{ data: BerandaUserResponse }> = yield call(
      HomeApi.getBerandaData,
    );
    console.log('getBerandaUser response: ', response);

    if (response.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      yield put(fetchBerandaUserSuccess(data.data));
    } else {
      yield put(fetchBerandaUserFailed('Error'));
    }
  } catch (error) {
    yield put(fetchBerandaUserFailed(error));
  }
  yield put(hideLoading());
}

export function* watchGetBerandaUser() {
  yield takeLatest(fetchBerandaUser, getBerandaUser);
}
