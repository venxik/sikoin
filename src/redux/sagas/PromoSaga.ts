import { AxiosResponse } from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';
import { PromoApi } from '../../config/apis';
import { hideLoading, showLoading } from '../reducers/LoadingReducer';
import { formatter } from '../../utils';
import {
  fetchPromo,
  fetchPromoDataFailed,
  fetchPromoDataSuccess,
  fetchPromoDetail,
  fetchPromoDetailFailed,
  fetchPromoDetailSuccess,
} from '../reducers/PromoReducer';

function* getAllPromo() {
  yield put(showLoading());
  try {
    const response: AxiosResponse = yield call(PromoApi.getAllPromo);
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(fetchPromoDataSuccess(data?.data));
      } else {
        yield put(fetchPromoDataFailed('Error'));
      }
    } else {
      yield put(fetchPromoDataFailed('Error'));
    }
  } catch (error) {
    yield put(fetchPromoDataFailed(error));
  }
  yield put(hideLoading());
}

function* getPromoDetail(action: ReturnType<typeof fetchPromoDetail>) {
  yield put(showLoading());
  try {
    const response: AxiosResponse = yield call(
      PromoApi.getPromoDetail,
      action.payload,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(fetchPromoDetailSuccess(data?.data));
      } else {
        yield put(fetchPromoDetailFailed('Error'));
      }
    } else {
      yield put(fetchPromoDetailFailed('Error'));
    }
  } catch (error) {
    yield put(fetchPromoDetailFailed(error));
  }
  yield put(hideLoading());
}
export function* watchGetAllPromo() {
  yield takeLatest(fetchPromo, getAllPromo);
}

export function* watchGetPromoDetail() {
  yield takeLatest(fetchPromoDetail, getPromoDetail);
}
