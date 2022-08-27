import { AxiosResponse } from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';
import { PinjamanApi } from '../../config/apis';
import { hideLoading, showLoading } from '../reducers/LoadingReducer';
import { formatter } from '../../utils';
import {
  fetchGetPinjamanInitialData,
  fetchPinjamanStep1,
  fetchPinjamanStep1Failed,
  fetchPinjamanStep1Success,
  fetchPinjamanStep2,
  fetchPinjamanStep2Failed,
  fetchPinjamanStep2Success,
  fetchPinjamanStep3,
  fetchPinjamanStep3Failed,
  fetchPinjamanStep3Success,
  fetchPinjamanStep4,
  fetchPinjamanStep4Failed,
  fetchPinjamanStep4Success,
  getPinjamanInitialDataFailed,
  getPinjamanInitialDataSuccess,
  GetPinjamanInitialDataResponse,
  PinjamanDetailResponse,
  getPinjamanDisetujuiSuccess,
  getPinjamanDisetujuiFailed,
  getPinjamanDitolakSuccess,
  getPinjamanDitolakFailed,
  fetchPinjamanDisetujuiData,
  fetchPinjamanDitolakData,
} from '../reducers/PinjamanReducer';
import { navigate } from '../../config/navigation';

function* getPinjamanInitialData() {
  yield put(showLoading());
  try {
    const response: AxiosResponse<{ data: GetPinjamanInitialDataResponse }> =
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

function* getPinjamanDisetujui(
  action: ReturnType<typeof fetchPinjamanDisetujuiData>,
) {
  yield put(showLoading());
  try {
    const response: AxiosResponse<{ data: PinjamanDetailResponse }> =
      yield call(PinjamanApi.getDisetujuiData, action.payload);
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(getPinjamanDisetujuiSuccess(data?.data));
      } else {
        yield put(getPinjamanDisetujuiFailed('Error'));
      }
    } else {
      yield put(getPinjamanDisetujuiFailed('Error'));
    }
  } catch (error) {
    yield put(getPinjamanDisetujuiFailed(error));
  }
  yield put(hideLoading());
}

function* getPinjamanDitolak(
  action: ReturnType<typeof fetchPinjamanDitolakData>,
) {
  yield put(showLoading());
  try {
    const response: AxiosResponse<{ data: GetPinjamanInitialDataResponse }> =
      yield call(PinjamanApi.getDitolakData, action.payload);
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(getPinjamanDitolakSuccess(data?.data));
      } else {
        yield put(getPinjamanDitolakFailed('Error'));
      }
    } else {
      yield put(getPinjamanDitolakFailed('Error'));
    }
  } catch (error) {
    yield put(getPinjamanDitolakFailed(error));
  }
  yield put(hideLoading());
}

function* getPinjamanDataStep1(action: ReturnType<typeof fetchPinjamanStep1>) {
  yield put(showLoading());
  try {
    const response: AxiosResponse<{ data: GetPinjamanInitialDataResponse }> =
      yield call(PinjamanApi.fetchDataStep1, action.payload);
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(fetchPinjamanStep1Success(data?.data));
      } else {
        yield put(fetchPinjamanStep1Failed('Error'));
      }
    } else {
      yield put(fetchPinjamanStep1Failed('Error'));
    }
  } catch (error) {
    yield put(fetchPinjamanStep1Failed(error));
  }
  yield put(hideLoading());
}

function* getPinjamanDataStep2(action: ReturnType<typeof fetchPinjamanStep2>) {
  yield put(showLoading());
  try {
    const response: AxiosResponse<{ data: GetPinjamanInitialDataResponse }> =
      yield call(PinjamanApi.fetchDataStep2, action.payload);
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(fetchPinjamanStep2Success(data?.data));
        navigate('PinjamanStep2Screen');
      } else {
        yield put(fetchPinjamanStep2Failed('Error'));
      }
    } else {
      yield put(fetchPinjamanStep2Failed('Error'));
    }
  } catch (error) {
    yield put(fetchPinjamanStep2Failed(error));
  }
  yield put(hideLoading());
}

function* getPinjamanDataStep3(action: ReturnType<typeof fetchPinjamanStep3>) {
  yield put(showLoading());
  try {
    const response: AxiosResponse<{ data: GetPinjamanInitialDataResponse }> =
      yield call(PinjamanApi.fetchDataStep3, action.payload);
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(fetchPinjamanStep3Success(data?.data));
        navigate('PinjamanStep3Screen');
      } else {
        yield put(fetchPinjamanStep3Failed('Error'));
      }
    } else {
      yield put(fetchPinjamanStep3Failed('Error'));
    }
  } catch (error) {
    yield put(fetchPinjamanStep3Failed(error));
  }
  yield put(hideLoading());
}

function* getPinjamanDataStep4(action: ReturnType<typeof fetchPinjamanStep4>) {
  yield put(showLoading());
  try {
    const response: AxiosResponse<{ data: GetPinjamanInitialDataResponse }> =
      yield call(PinjamanApi.fetchDataStep4, action.payload);
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(fetchPinjamanStep4Success(data?.data));
        navigate('PinjamanStep4Screen');
      } else {
        yield put(fetchPinjamanStep4Failed('Error'));
      }
    } else {
      yield put(fetchPinjamanStep4Failed('Error'));
    }
  } catch (error) {
    yield put(fetchPinjamanStep4Failed(error));
  }
  yield put(hideLoading());
}

export function* watchGetPinjamanInitialData() {
  yield takeLatest(fetchGetPinjamanInitialData, getPinjamanInitialData);
}

export function* watchGetPinjamanDisetujui() {
  yield takeLatest(fetchPinjamanDisetujuiData, getPinjamanDisetujui);
}

export function* watchGetPinjamanDitolak() {
  yield takeLatest(fetchPinjamanDitolakData, getPinjamanDitolak);
}

export function* watchGetPinjamanDataStep1() {
  yield takeLatest(fetchPinjamanStep1, getPinjamanDataStep1);
}

export function* watchGetPinjamanDataStep2() {
  yield takeLatest(fetchPinjamanStep2, getPinjamanDataStep2);
}

export function* watchGetPinjamanDataStep3() {
  yield takeLatest(fetchPinjamanStep3, getPinjamanDataStep3);
}

export function* watchGetPinjamanDataStep4() {
  yield takeLatest(fetchPinjamanStep4, getPinjamanDataStep4);
}
