import { AxiosResponse } from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';
import { ProfileApi } from '../../config/apis';
import { goBack } from '../../config/navigation';
import { hideLoading, showLoading } from '../reducers/LoadingReducer';
import { isEmpty } from 'lodash';
import { formatter } from '../../utils';
import {
  fetchProfile,
  getProfileFailed,
  getProfileSuccess,
  fetchUpdateProfile,
  ProfileResponse,
  updateProfileFailed,
  updateProfileSuccess,
} from '../reducers/ProfileReducer';

function* getProfile() {
  yield put(showLoading());

  try {
    const response: AxiosResponse<{ data: ProfileResponse }> = yield call(
      ProfileApi.getProfile,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      yield put(getProfileSuccess(data?.data));
    } else {
      yield put(getProfileFailed('Error'));
    }
  } catch (error) {
    yield put(getProfileFailed(error));
  }
  yield put(hideLoading());
}

function* updateProfile(action: ReturnType<typeof fetchUpdateProfile>) {
  yield put(showLoading());

  try {
    const response: AxiosResponse<{ data: ProfileResponse }> = yield call(
      ProfileApi.updateProfile,
      action.payload,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      yield put(updateProfileSuccess(data?.data));
      if (!isEmpty(data?.data)) {
        goBack();
      }
    } else {
      yield put(updateProfileFailed('Error'));
    }
  } catch (error) {
    yield put(updateProfileFailed(error));
  }
  yield put(hideLoading());
}

export function* watchGetProfile() {
  yield takeLatest(fetchProfile, getProfile);
}

export function* watchUpdateProfile() {
  yield takeLatest(fetchUpdateProfile, updateProfile);
}
