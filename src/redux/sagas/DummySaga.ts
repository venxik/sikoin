import { AxiosResponse } from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';
import { DummyApi } from '../../config/apis';
import { hideLoading, showLoading } from '../reducers/LoadingReducer';
import {
  fetchDummyData,
  fetchDummyDataFailed,
  fetchDummyDataSuccess,
} from '../reducers/MarketReducer';

function* getDummyList() {
  yield put(showLoading());

  try {
    const response: AxiosResponse = yield call(DummyApi.fetchDummy);
    if (response.status === 200) {
      yield put(fetchDummyDataSuccess(response.data));
    } else {
      yield put(fetchDummyDataFailed('Error'));
    }
  } catch (error) {
    yield put(fetchDummyDataFailed('Error'));
  }
  yield put(hideLoading());
}

export function* watchDummyList() {
  yield takeLatest(fetchDummyData, getDummyList);
}
