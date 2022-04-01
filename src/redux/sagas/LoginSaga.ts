import { AxiosResponse } from 'axios';
import { isEmpty } from 'lodash';
import { takeLatest, put, call } from 'redux-saga/effects';
import { LoginApi } from '../../config/apis';
import { navigate, navigationRef } from '../../config/navigation';
import {
  fetchKoperasiList,
  fetchKoperasiListFailed,
  fetchKoperasiListSuccess,
  fetchUserKoperasi,
  fetchUserKoperasiEmailFailed,
  fetchUserKoperasiFailed,
  fetchUserKoperasiSuccess,
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

function* getKoperasiList() {
  yield put(showLoading());

  try {
    const response: AxiosResponse<{ data: KoperasiListResponse[] }> =
      yield call(LoginApi.getKoperasiList);
    console.log('getKoperasiList response: ', response);

    if (response.status === 200) {
      yield put(fetchKoperasiListSuccess(response.data?.data));
    } else {
      yield put(fetchKoperasiListFailed('Error'));
    }
  } catch (error) {
    yield put(fetchKoperasiListFailed(error));
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
    console.log('sendUserKoperasi response: ', response.data);
    if (response.status === 200) {
      yield put(fetchUserKoperasiSuccess(response.data?.data));
      if (!isEmpty(response.data.data)) {
        navigate('DaftarKoperasiStep2Screen');
      }
    } else {
      yield put(fetchUserKoperasiFailed('Error'));
    }
  } catch (error) {
    yield put(fetchUserKoperasiFailed('Error'));
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
    console.log('sendUserKoperasiEmail response: ', response);
    if (response.status === 200) {
      if (!isEmpty(response.data)) {
        navigate('DaftarKoperasiSuccessScreen', {
          email: action.payload.email,
        });
      }
    } else {
      yield put(fetchUserKoperasiEmailFailed('Error'));
    }
  } catch (error) {
    yield put(fetchUserKoperasiEmailFailed('Error'));
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
    console.log(response);
    if (response.status === 200) {
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
    console.log(response);
    if (response.status === 200) {
      yield put(fetchLoginSuccess(response.data));
      // if (navigationRef.isReady()) {
      //   navigationRef.dispatch(
      //     CommonActions.reset({
      //       index: 0,
      //       routes: [{ name: 'HomeTab' }],
      //     }),
      //   );
      // }
    } else {
      yield put(fetchLoginFailed('Error'));
    }
  } catch (error) {
    yield put(fetchLoginFailed('Error'));
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
