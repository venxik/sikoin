import { AxiosResponse } from 'axios';
import { isEmpty } from 'lodash';
import { takeLatest, put, call } from 'redux-saga/effects';
import { LoginApi } from '../../config/apis';
import { navigate, navigationRef } from '../../config/navigation';
import {
  fetchKoperasiList,
  getKoperasiListFailed,
  getKoperasiListSuccess,
  fetchUserKoperasi,
  updateUserKoperasiEmailFailed,
  getUserKoperasiFailed,
  getUserKoperasiSuccess,
  fetchUserKoperasiEmail,
  fetchForgotPassword,
  setForgotPasswordStatus,
  fetchLogin,
  fetchLoginSuccess,
  fetchLoginFailed,
  KoperasiListResponse,
  UserKoperasiResponse,
} from '../reducers/LoginReducer';
import { hideLoading, showLoading } from '../reducers/LoadingReducer';
import { CommonActions } from '@react-navigation/native';
import { formatter } from '../../utils';

function* getKoperasiList() {
  yield put(showLoading());
  try {
    const response: AxiosResponse<{ data: KoperasiListResponse[] }> =
      yield call(LoginApi.getKoperasiList);

    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      yield put(getKoperasiListSuccess(data?.data));
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
    const response: AxiosResponse<{ data: UserKoperasiResponse }> = yield call(
      LoginApi.sendUserKoperasi,
      action.payload,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      yield put(getUserKoperasiSuccess(data?.data));
      if (!isEmpty(data?.data)) {
        navigate('DaftarKoperasiStep2Screen');
      }
    } else {
      yield put(getUserKoperasiFailed('Error'));
    }
  } catch (error) {
    yield put(getUserKoperasiFailed('Error'));
  }
  yield put(hideLoading());
}

function* sendUserKoperasiEmail(
  action: ReturnType<typeof fetchUserKoperasiEmail>,
) {
  yield put(showLoading());
  try {
    const response: AxiosResponse<{ message: string }> = yield call(
      LoginApi.sendUserEmailKoperasiParams,
      action.payload,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      yield put(getUserKoperasiSuccess(data?.data));
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
  } catch (error) {
    yield put(updateUserKoperasiEmailFailed('Error'));
  }
  yield put(hideLoading());
}

function* forgotPassword(action: ReturnType<typeof fetchForgotPassword>) {
  yield put(showLoading());
  try {
    const response: AxiosResponse<{ message: string }> = yield call(
      LoginApi.forgotPassword,
      action.payload,
    );
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
    const response: AxiosResponse = yield call(LoginApi.login, action.payload);
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      yield put(fetchLoginSuccess(data));
      if (navigationRef.isReady()) {
        navigationRef.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'HomeTab' }],
          }),
        );
      }
    } else {
      yield put(fetchLoginFailed('Error'));
    }
  } catch (error) {
    yield put(fetchLoginFailed(error));
  }
  yield put(hideLoading());
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
