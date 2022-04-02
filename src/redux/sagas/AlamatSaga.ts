import { AxiosResponse } from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';
import { AlamatApi } from '../../config/apis';
import { goBack } from '../../config/navigation';
import { hideLoading, showLoading } from '../reducers/LoadingReducer';
import {
  AlamatDataResponse,
  fetchGetAlamat,
  fetchGetAlamatFailed,
  fetchGetAlamatSuccess,
  fetchSubmitAlamat,
  fetchSubmitAlamatFailed,
  fetchSubmitAlamatSuccess,
  fetchUpdateAlamat,
  fetchUpdateAlamatFailed,
  fetchUpdateAlamatSuccess,
} from '../reducers/AlamatReducer';
import { isEmpty } from 'lodash';
import { formatter } from '../../utils';

function* getAlamat() {
  yield put(showLoading());

  try {
    const response: AxiosResponse<{ data: AlamatDataResponse[] }> = yield call(
      AlamatApi.getAlamatList,
    );
    console.log('getAlamatList response: ', response);
    if (response.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      yield put(fetchGetAlamatSuccess(data));
      if (!isEmpty(data)) {
        goBack();
      }
    } else {
      yield put(fetchGetAlamatFailed('Error'));
    }
  } catch (error) {
    yield put(fetchGetAlamatFailed(error));
  }
  yield put(hideLoading());
}

function* updateAlamat(action: ReturnType<typeof fetchUpdateAlamat>) {
  yield put(showLoading());

  try {
    const response: AxiosResponse<{ data: AlamatDataResponse[] }> = yield call(
      AlamatApi.updateAlamat,
      action.payload,
    );
    console.log('updateAlamat response: ', response);

    if (response.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      yield put(fetchUpdateAlamatSuccess(data));
      if (!isEmpty(data)) {
        goBack();
      }
    } else {
      yield put(fetchUpdateAlamatFailed('Error'));
    }
  } catch (error) {
    yield put(fetchUpdateAlamatFailed(error));
  }
  yield put(hideLoading());
}

function* submitAlamat(action: ReturnType<typeof fetchSubmitAlamat>) {
  yield put(showLoading());

  try {
    const response: AxiosResponse<{ data: AlamatDataResponse[] }> = yield call(
      AlamatApi.submitAlamat,
      action.payload,
    );
    console.log('submitAlamat response: ', response);

    if (response.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      yield put(fetchSubmitAlamatSuccess(data));
      if (!isEmpty(data)) {
        goBack();
      }
    } else {
      yield put(fetchSubmitAlamatFailed('Error'));
    }
  } catch (error) {
    yield put(fetchSubmitAlamatFailed(error));
  }
  yield put(hideLoading());
}

export function* watchGetAlamat() {
  yield takeLatest(fetchGetAlamat, getAlamat);
}

export function* watchUpdateAlamat() {
  yield takeLatest(fetchUpdateAlamat, updateAlamat);
}

export function* watchSubmitAlamat() {
  yield takeLatest(fetchSubmitAlamat, submitAlamat);
}
