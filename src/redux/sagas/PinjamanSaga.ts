import { AxiosResponse } from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';
import { PinjamanApi } from '../../config/apis';
import { hideLoading, showLoading } from '../reducers/LoadingReducer';
import { formatter } from '../../utils';
import {
  fetchGetPinjamanInitialData,
  getPinjamanInitialDataFailed,
  getPinjamanInitialDataSuccess,
  InitialPinjamanDataResponse,
} from '../reducers/PinjamanReducer';

function* getPinjamanInitialData() {
  yield put(showLoading());
  try {
    const response: AxiosResponse<{ data: InitialPinjamanDataResponse }> =
      yield call(PinjamanApi.getInitialData);
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(getPinjamanInitialDataSuccess(data?.data));
      } else {
        yield put(getPinjamanInitialDataFailed('Error'));
      }
    } else {
      yield put(getPinjamanInitialDataFailed('Error'));
    }
  } catch (error) {
    yield put(getPinjamanInitialDataFailed(error));
  }
  yield put(hideLoading());
}

export function* watchGetPinjamanInitialData() {
  yield takeLatest(fetchGetPinjamanInitialData, getPinjamanInitialData);
}
