import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

import { ApiResponse, PromoApi } from '../../config/apis';
import { navigate } from '../../config/navigation';
import { formatter } from '../../utils';
import { KabarPromoData } from '../reducers/HomeReducer';
import { hideLoading, showLoading } from '../reducers/LoadingReducer';
import {
  fetchPromo,
  fetchPromoDataFailed,
  fetchPromoDataSuccess,
  fetchPromoDetail,
  fetchPromoDetailFailed,
  fetchPromoDetailSuccess,
  PromoDetail,
} from '../reducers/PromoReducer';

function* getAllPromo() {
  yield put(showLoading());
  try {
    const response: AxiosResponse<ApiResponse<KabarPromoData[]>> = yield call(PromoApi.getAllPromo);
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
    const response: AxiosResponse<ApiResponse<PromoDetail>> = yield call(
      PromoApi.getPromoDetail,
      action.payload,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(fetchPromoDetailSuccess(data?.data));
        navigate('PromoDetailScreen');
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
