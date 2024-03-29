import { AxiosResponse } from 'axios';
import { isEmpty } from 'lodash';
import { call, put, takeLatest } from 'redux-saga/effects';

import { ApiResponse, LoginApi } from '../../config/apis';
import { navigate, navigateAndReset } from '../../config/navigation';
import { formatter } from '../../utils';
import { resetUserData } from '../reducers/HomeReducer';
import { hideLoading, showLoading } from '../reducers/LoadingReducer';
import {
  fetchChangePassword,
  fetchChangePasswordFailed,
  fetchChangePasswordSuccess,
  fetchForgotPassword,
  fetchKoperasiList,
  fetchLogin,
  fetchLoginFailed,
  fetchLoginSuccess,
  fetchLogout,
  fetchLogoutFailed,
  fetchLogoutSuccess,
  fetchUserKoperasi,
  fetchUserKoperasiEmail,
  fetchVersionNumber,
  fetchVersionNumberFailed,
  fetchVersionNumberSuccess,
  getKoperasiListFailed,
  getKoperasiListSuccess,
  getUserKoperasiFailed,
  getUserKoperasiSuccess,
  KoperasiListResponse,
  LoginResponse,
  setChangePasswordStatus,
  setForgotPasswordStatus,
  setGetVersionStatus,
  updateUserKoperasiEmailFailed,
  updateUserKoperasiEmailSuccess,
  UserKoperasiResponse,
} from '../reducers/LoginReducer';

function* getKoperasiList() {
  yield put(showLoading());
  try {
    const response: AxiosResponse<ApiResponse<KoperasiListResponse[]>> = yield call(
      LoginApi.getKoperasiList,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(getKoperasiListSuccess(data?.data));
      } else {
        yield put(getKoperasiListFailed('Error'));
      }
    } else {
      yield put(getKoperasiListFailed('Error'));
    }
  } catch (error) {
    yield put(getKoperasiListFailed(error));
  }
  yield put(hideLoading());
}

function* sendUserKoperasi(action: ReturnType<typeof fetchUserKoperasi>) {
  yield put(showLoading());
  try {
    const response: AxiosResponse<ApiResponse<UserKoperasiResponse>> = yield call(
      LoginApi.sendUserKoperasi,
      action.payload,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(getUserKoperasiSuccess(data?.data));
        if (!isEmpty(data?.data)) {
          navigate('DaftarKoperasiStep2Screen');
        }
      } else {
        yield put(getUserKoperasiFailed('Error'));
      }
    } else {
      yield put(getUserKoperasiFailed('Error'));
    }
  } catch (error) {
    yield put(getUserKoperasiFailed('Error'));
  }
  yield put(hideLoading());
}

function* sendUserKoperasiEmail(action: ReturnType<typeof fetchUserKoperasiEmail>) {
  yield put(showLoading());
  try {
    const response: AxiosResponse<ApiResponse<UserKoperasiResponse>> = yield call(
      LoginApi.sendUserEmailKoperasi,
      action.payload,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(updateUserKoperasiEmailSuccess(data?.data));
        if (!isEmpty(data)) {
          navigate('DaftarKoperasiSuccessScreen', {
            email: action.payload.email,
          });
        } else {
          navigate('DaftarKoperasiFailedScreen');
        }
      } else {
        yield put(updateUserKoperasiEmailFailed('Error'));
      }
    } else {
      yield put(updateUserKoperasiEmailFailed('Error'));
    }
  } catch (error) {
    yield put(updateUserKoperasiEmailFailed('Error'));
  }
  yield put(hideLoading());
}

function* forgotPassword(action: ReturnType<typeof fetchForgotPassword>) {
  yield put(showLoading());
  try {
    const response: AxiosResponse = yield call(LoginApi.forgotPassword, action.payload);
    if (response?.status === 200) {
      yield put(setForgotPasswordStatus('success'));
    } else {
      yield put(setForgotPasswordStatus('failed'));
    }
  } catch (error) {
    yield put(setForgotPasswordStatus('failed'));
  }
  yield put(hideLoading());
}

function* login(action: ReturnType<typeof fetchLogin>) {
  yield put(showLoading());
  try {
    const response: AxiosResponse<LoginResponse> = yield call(LoginApi.login, action.payload);
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(fetchLoginSuccess(data));
        navigateAndReset('HomeTab');
      } else {
        yield put(fetchLoginFailed('Error'));
      }
    } else {
      yield put(fetchLoginFailed('Error'));
    }
  } catch (error) {
    yield put(fetchLoginFailed(error));
  }
  yield put(hideLoading());
}

function* logout() {
  yield put(showLoading());
  try {
    const response: AxiosResponse<ApiResponse<null>> = yield call(LoginApi.logout);
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(fetchLogoutSuccess());
        yield put(resetUserData());
        navigateAndReset('LoginScreen');
      } else {
        yield put(fetchLogoutFailed('Error'));
      }
    } else {
      yield put(fetchLogoutFailed('Error'));
    }
  } catch (error) {
    yield put(fetchLogoutFailed(error));
  }
  yield put(hideLoading());
}

function* getVersionNumber() {
  try {
    const response: AxiosResponse<ApiResponse<{ versionNumber: string }>> = yield call(
      LoginApi.getVersionNumber,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(fetchVersionNumberSuccess(data?.data));
        yield put(setGetVersionStatus('success'));
      } else {
        yield put(fetchVersionNumberFailed('Error'));
        yield put(setGetVersionStatus('failed'));
      }
    } else {
      yield put(fetchVersionNumberFailed('Error'));
      yield put(setGetVersionStatus('failed'));
    }
  } catch (error) {
    yield put(fetchVersionNumberFailed(error));
    yield put(setGetVersionStatus('failed'));
  }
}

function* changePassword(action: ReturnType<typeof fetchChangePassword>) {
  try {
    const response: AxiosResponse<ApiResponse<null>> = yield call(
      LoginApi.changePassword,
      action.payload,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(fetchChangePasswordSuccess());
        yield put(setChangePasswordStatus('success'));
      } else {
        yield put(fetchChangePasswordFailed('Error'));
        yield put(setChangePasswordStatus('failed'));
      }
    } else {
      yield put(fetchChangePasswordFailed('Error'));
      yield put(setChangePasswordStatus('failed'));
    }
  } catch (error) {
    yield put(fetchChangePasswordFailed(error));
    yield put(setChangePasswordStatus('failed'));
  }
}

export function* watchGetKoperasiList() {
  yield takeLatest(fetchKoperasiList, getKoperasiList);
}

export function* watchSendKoperasiData() {
  yield takeLatest(fetchUserKoperasi, sendUserKoperasi);
}

export function* watchSendUserKoperasiEmail() {
  yield takeLatest(fetchUserKoperasiEmail, sendUserKoperasiEmail);
}

export function* watchForgotPassword() {
  yield takeLatest(fetchForgotPassword, forgotPassword);
}

export function* watchLogin() {
  yield takeLatest(fetchLogin, login);
}

export function* watchLogout() {
  yield takeLatest(fetchLogout, logout);
}

export function* watchGetVersionNumber() {
  yield takeLatest(fetchVersionNumber, getVersionNumber);
}

export function* watchChangePassword() {
  yield takeLatest(fetchChangePassword, changePassword);
}
