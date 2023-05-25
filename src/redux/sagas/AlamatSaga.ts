import { AxiosResponse } from 'axios';
import { isEmpty } from 'lodash';
import { call, put, takeLatest } from 'redux-saga/effects';

import { AlamatApi, ApiResponse } from '../../config/apis';
import { goBack } from '../../config/navigation';
import { formatter } from '../../utils';
import {
  AlamatDataResponse,
  CityProvinceList,
  deleteAlamatFailed,
  deleteAlamatSuccess,
  fetchAlamatList,
  fetchCityProvince,
  fetchDeleteAlamat,
  fetchSubmitAlamat,
  fetchUpdateAlamat,
  getAlamatListFailed,
  getAlamatListSuccess,
  getCityProvinceFailed,
  getCityProvinceSuccess,
  setDeleteAlamatStatus,
  submitAlamatFailed,
  submitAlamatSuccess,
  updateAlamatFailed,
  updateAlamatSuccess,
} from '../reducers/AlamatReducer';
import { hideLoading, showLoading } from '../reducers/LoadingReducer';

function* getAlamat() {
  yield put(showLoading());

  try {
    const response: AxiosResponse<ApiResponse<AlamatDataResponse[]>> = yield call(
      AlamatApi.getAlamatList,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(getAlamatListSuccess(data?.data));
      } else {
        yield put(getAlamatListFailed('Error'));
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
    const response: AxiosResponse<ApiResponse<AlamatDataResponse[]>> = yield call(
      AlamatApi.updateAlamat,
      action.payload,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(updateAlamatSuccess(data?.data));
        if (!isEmpty(data?.data)) {
          goBack();
        }
      } else {
        yield put(updateAlamatFailed('Error'));
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
    const response: AxiosResponse<ApiResponse<AlamatDataResponse[]>> = yield call(
      AlamatApi.submitAlamat,
      action.payload,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(submitAlamatSuccess(data?.data));
        if (!isEmpty(data?.data)) {
          goBack();
        }
      } else {
        yield put(submitAlamatFailed('Error'));
      }
    } else {
      yield put(submitAlamatFailed('Error'));
    }
  } catch (error) {
    yield put(submitAlamatFailed(error));
  }
  yield put(hideLoading());
}

function* deleteAlamat(action: ReturnType<typeof fetchDeleteAlamat>) {
  yield put(showLoading());
  try {
    const response: AxiosResponse<ApiResponse<AlamatDataResponse[]>> = yield call(
      AlamatApi.deleteAlamat,
      action.payload,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(deleteAlamatSuccess(data?.data));
        yield put(setDeleteAlamatStatus('success'));
      } else {
        yield put(deleteAlamatFailed('Error'));
        yield put(setDeleteAlamatStatus('failed'));
      }
    } else {
      yield put(deleteAlamatFailed('Error'));
      yield put(setDeleteAlamatStatus('failed'));
    }
  } catch (error) {
    yield put(deleteAlamatFailed(error));
    yield put(setDeleteAlamatStatus('failed'));
  }
  yield put(hideLoading());
}

function* getCityProvince() {
  yield put(showLoading());
  try {
    const response: AxiosResponse<ApiResponse<CityProvinceList>> = yield call(
      AlamatApi.getCityProvince,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(getCityProvinceSuccess(data?.data));
      } else {
        yield put(getCityProvinceFailed('Error'));
      }
    } else {
      yield put(getCityProvinceFailed('Error'));
    }
  } catch (error) {
    yield put(getCityProvinceFailed(error));
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

export function* watchDeleteAlamat() {
  yield takeLatest(fetchDeleteAlamat, deleteAlamat);
}

export function* watchGetCityProvince() {
  yield takeLatest(fetchCityProvince, getCityProvince);
}
