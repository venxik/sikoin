import { AxiosResponse } from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';
import { KabarApi } from '../../config/apis';
import { navigate } from '../../config/navigation';
import { hideLoading, showLoading } from '../reducers/LoadingReducer';
import { formatter } from '../../utils';
import {
  fetchKabar,
  fetchKabarDetail,
  fetchKabarDetailFailed,
  fetchKabarDetailSuccess,
  fetchKabarFailed,
  fetchKabarSuccess,
} from '../reducers/KabarReducer';

function* getAllKabar() {
  yield put(showLoading());
  try {
    const response: AxiosResponse = yield call(KabarApi.getAllKabar);
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(fetchKabarSuccess(data?.data));
      } else {
        yield put(fetchKabarFailed('Error'));
      }
    } else {
      yield put(fetchKabarFailed('Error'));
    }
  } catch (error) {
    yield put(fetchKabarFailed(error));
  }
  yield put(hideLoading());
}

function* getKabarDetail(action: ReturnType<typeof fetchKabarDetail>) {
  yield put(showLoading());
  try {
    const response: AxiosResponse = yield call(
      KabarApi.getKabarDetail,
      action.payload,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(fetchKabarDetailSuccess(data?.data));
        navigate('KabarDetailScreen');
      } else {
        yield put(fetchKabarDetailFailed('Error'));
      }
    } else {
      yield put(fetchKabarDetailFailed('Error'));
    }
  } catch (error) {
    yield put(fetchKabarDetailFailed(error));
  }
  yield put(hideLoading());
}
export function* watchGetAllKabar() {
  yield takeLatest(fetchKabar, getAllKabar);
}

export function* watchGetKabarDetail() {
  yield takeLatest(fetchKabarDetail, getKabarDetail);
}
