import { AxiosResponse } from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';
import { AlamatApi } from '../../config/apis';
import { goBack } from '../../config/navigation';
import { hideLoading, showLoading } from '../reducers/LoadingReducer';
import {
  AlamatDataResponse,
  fetchAlamatList,
  getAlamatListFailed,
  getAlamatListSuccess,
  fetchSubmitAlamat,
  submitAlamatFailed,
  submitAlamatSuccess,
  fetchUpdateAlamat,
  updateAlamatFailed,
  updateAlamatSuccess,
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
      yield put(getAlamatListSuccess(data));
      if (!isEmpty(data)) {
        goBack();
      }
    } else {
      yield put(getAlamatListFailed('Error'));
    }
  } catch (error) {
    yield put(getAlamatListFailed(error));
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
      yield put(updateAlamatSuccess(data));
      if (!isEmpty(data)) {
        goBack();
      }
    } else {
      yield put(updateAlamatFailed('Error'));
    }
  } catch (error) {
    yield put(updateAlamatFailed(error));
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
      yield put(submitAlamatSuccess(data));
      if (!isEmpty(data)) {
        goBack();
      }
    } else {
      yield put(submitAlamatFailed('Error'));
    }
  } catch (error) {
    yield put(submitAlamatFailed(error));
  }
  yield put(hideLoading());
}

export function* watchGetAlamat() {
  yield takeLatest(fetchAlamatList, getAlamat);
}

export function* watchUpdateAlamat() {
  yield takeLatest(fetchUpdateAlamat, updateAlamat);
}

export function* watchSubmitAlamat() {
  yield takeLatest(fetchSubmitAlamat, submitAlamat);
}
