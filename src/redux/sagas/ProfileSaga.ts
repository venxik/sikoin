import { AxiosResponse } from 'axios';
import { isEmpty } from 'lodash';
import { call, put, takeLatest } from 'redux-saga/effects';

import { ApiResponse, ProfileApi } from '../../config/apis';
import { goBack, navigate } from '../../config/navigation';
import { formatter } from '../../utils';
import { updateUserData } from '../reducers/HomeReducer';
import { hideLoading, showLoading } from '../reducers/LoadingReducer';
import {
  fetchIdCard,
  fetchIdCardFailed,
  fetchIdCardSuccess,
  fetchProfile,
  fetchUpdateProfile,
  getProfileFailed,
  getProfileSuccess,
  IDCard,
  ProfileResponse,
  updateProfileFailed,
  updateProfileSuccess,
} from '../reducers/ProfileReducer';

function* getProfile() {
  yield put(showLoading());
  try {
    const response: AxiosResponse<ApiResponse<ProfileResponse>> = yield call(ProfileApi.getProfile);
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(getProfileSuccess(data?.data));
      } else {
        yield put(getProfileFailed('Error'));
      }
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
    const response: AxiosResponse<ApiResponse<ProfileResponse>> = yield call(
      ProfileApi.updateProfile,
      action.payload,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(updateProfileSuccess(data?.data));
        yield put(updateUserData(data?.data));
        if (!isEmpty(data?.data)) {
          goBack();
        }
      } else {
        yield put(updateProfileFailed('Error'));
      }
    } else {
      yield put(updateProfileFailed('Error'));
    }
  } catch (error) {
    yield put(updateProfileFailed(error));
  }
  yield put(hideLoading());
}

function* getIdCard() {
  yield put(showLoading());
  try {
    const response: AxiosResponse<ApiResponse<IDCard>> = yield call(ProfileApi.getIdCard);
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(fetchIdCardSuccess(data?.data));
        navigate('IDCardMainScreen');
      } else {
        yield put(fetchIdCardFailed('Error'));
      }
    } else {
      yield put(fetchIdCardFailed('Error'));
    }
  } catch (error) {
    yield put(fetchIdCardFailed(error));
  }
  yield put(hideLoading());
}

export function* watchGetProfile() {
  yield takeLatest(fetchProfile, getProfile);
}

export function* watchUpdateProfile() {
  yield takeLatest(fetchUpdateProfile, updateProfile);
}

export function* watchGetIdCard() {
  yield takeLatest(fetchIdCard, getIdCard);
}
