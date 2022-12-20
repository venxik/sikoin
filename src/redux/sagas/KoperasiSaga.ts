import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

import KoperasiApi from '../../config/apis/KoperasiApi';
import { navigate } from '../../config/navigation';
import { formatter } from '../../utils';
import {
  fetchKoperasiData,
  getKoperasiDataFailed,
  getKoperasiDataSuccess,
} from '../reducers/KoperasiReducer';
import { hideLoading, showLoading } from '../reducers/LoadingReducer';

function* getKoperasiData() {
  yield put(showLoading());
  try {
    const response: AxiosResponse = yield call(KoperasiApi.getKoperasiData);
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(getKoperasiDataSuccess(data?.data));
        navigate('DataKoperasiMainScreen');
      } else {
        yield put(getKoperasiDataFailed('Error'));
      }
    } else {
      yield put(getKoperasiDataFailed('Error'));
    }
  } catch (error) {
    yield put(getKoperasiDataFailed(error));
  }
  yield put(hideLoading());
}

export function* watchGetKoperasiData() {
  yield takeLatest(fetchKoperasiData, getKoperasiData);
}
