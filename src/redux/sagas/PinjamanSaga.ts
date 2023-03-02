import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

import { ApiResponse, PinjamanApi } from '../../config/apis';
import { navigate } from '../../config/navigation';
import { formatter } from '../../utils';
import { removeKtpImage, removeKtpSelfie } from '../reducers/KtpReducer';
import { hideLoading, showLoading } from '../reducers/LoadingReducer';
import {
  fetchGetPinjamanInitialData,
  fetchPinjamanDisetujuiData,
  fetchPinjamanDisetujuiDetailData,
  fetchPinjamanDitolakData,
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
  fetchPinjamanSummary,
  fetchPinjamanSummaryFailed,
  fetchPinjamanSummarySuccess,
  fetchPostCreatePinjaman,
  fetchPostCreatePinjamanFailed,
  fetchUpdateKtpPinjaman,
  fetchUpdateKtpPinjamanFailed,
  getPinjamanDisetujuiDetailFailed,
  getPinjamanDisetujuiDetailSuccess,
  getPinjamanDisetujuiFailed,
  getPinjamanDisetujuiSuccess,
  getPinjamanDitolakFailed,
  getPinjamanDitolakSuccess,
  getPinjamanInitialDataFailed,
  GetPinjamanInitialDataResponse,
  getPinjamanInitialDataSuccess,
  PinjamanDetailResponse,
  PinjamanDisetujuiDetailResponse,
  PinjamanStep1Data,
  PinjamanStep2Data,
  PinjamanStep3Data,
  PinjamanStep4Data,
} from '../reducers/PinjamanReducer';
import { PinjamanSummaryResponse } from '../reducers/PinjamanReducer';

function* getPinjamanInitialData() {
  yield put(showLoading());
  try {
    const response: AxiosResponse<ApiResponse<GetPinjamanInitialDataResponse>> = yield call(
      PinjamanApi.getInitialData,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(getPinjamanInitialDataSuccess(data?.data));
        navigate('PinjamanMainScreen');
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

function* getPinjamanDisetujui(action: ReturnType<typeof fetchPinjamanDisetujuiData>) {
  yield put(showLoading());
  try {
    const response: AxiosResponse<ApiResponse<PinjamanDetailResponse>> = yield call(
      PinjamanApi.getDisetujuiData,
      action.payload,
    );
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

function* getPinjamanDitolak(action: ReturnType<typeof fetchPinjamanDitolakData>) {
  yield put(showLoading());
  try {
    const response: AxiosResponse<ApiResponse<PinjamanDetailResponse>> = yield call(
      PinjamanApi.getDitolakData,
      action.payload,
    );
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

function* getPinjamanDisetujuiDetail(action: ReturnType<typeof fetchPinjamanDisetujuiDetailData>) {
  yield put(showLoading());
  try {
    const response: AxiosResponse<ApiResponse<PinjamanDisetujuiDetailResponse>> = yield call(
      PinjamanApi.getDisetujuiDetail,
      action.payload,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(getPinjamanDisetujuiDetailSuccess(data?.data));
      } else {
        yield put(getPinjamanDisetujuiDetailFailed('Error'));
      }
    } else {
      yield put(getPinjamanDisetujuiDetailFailed('Error'));
    }
  } catch (error) {
    yield put(getPinjamanDisetujuiDetailFailed(error));
  }
  yield put(hideLoading());
}

function* getPinjamanDataStep1() {
  yield put(showLoading());
  try {
    const response: AxiosResponse<ApiResponse<PinjamanStep1Data>> = yield call(
      PinjamanApi.fetchDataStep1,
    );
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

function* getPinjamanDataStep2() {
  yield put(showLoading());
  try {
    const response: AxiosResponse<ApiResponse<PinjamanStep2Data>> = yield call(
      PinjamanApi.fetchDataStep2,
    );
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
    const response: AxiosResponse<ApiResponse<PinjamanStep3Data>> = yield call(
      PinjamanApi.fetchDataStep3,
      action.payload,
    );
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
    const response: AxiosResponse<ApiResponse<PinjamanStep4Data>> = yield call(
      PinjamanApi.fetchDataStep4,
      action.payload,
    );
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

function* updateKtpPinjaman(action: ReturnType<typeof fetchUpdateKtpPinjaman>) {
  yield put(showLoading());
  try {
    const response: AxiosResponse = yield call(PinjamanApi.fetchUpdateKtpDokumen, action.payload);
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield removeKtpImage();
        yield removeKtpSelfie();
        navigate('PinjamanStep5Screen');
      } else {
        yield put(fetchUpdateKtpPinjamanFailed('Error'));
      }
    } else {
      yield put(fetchUpdateKtpPinjamanFailed('Error'));
    }
  } catch (error) {
    yield put(fetchUpdateKtpPinjamanFailed(error));
  }
  yield put(hideLoading());
}

function* getPinjamanSummaryData(action: ReturnType<typeof fetchPinjamanSummary>) {
  yield put(showLoading());
  try {
    const response: AxiosResponse<ApiResponse<PinjamanSummaryResponse>> = yield call(
      PinjamanApi.fetchSummaryData,
      action.payload,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(fetchPinjamanSummarySuccess(data?.data));
        navigate('PinjamanSummaryScreen');
      } else {
        yield put(fetchPinjamanSummaryFailed('Error'));
      }
    } else {
      yield put(fetchPinjamanSummaryFailed('Error'));
    }
  } catch (error) {
    yield put(fetchPinjamanSummaryFailed(error));
  }
  yield put(hideLoading());
}

function* postCreatePinjaman(action: ReturnType<typeof fetchPostCreatePinjaman>) {
  yield put(showLoading());
  try {
    const response: AxiosResponse = yield call(PinjamanApi.fetchPostCreate, action.payload);
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        navigate('PinjamanSucessScreen');
      } else {
        yield put(fetchPostCreatePinjamanFailed('Error'));
      }
    } else {
      yield put(fetchPostCreatePinjamanFailed('Error'));
    }
  } catch (error) {
    yield put(fetchPostCreatePinjamanFailed(error));
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

export function* watchGetPinjamanDisetujuiDetail() {
  yield takeLatest(fetchPinjamanDisetujuiDetailData, getPinjamanDisetujuiDetail);
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

export function* watchUpdateKtpPinjaman() {
  yield takeLatest(fetchUpdateKtpPinjaman, updateKtpPinjaman);
}

export function* watchGetPinjamanSummaryData() {
  yield takeLatest(fetchPinjamanSummary, getPinjamanSummaryData);
}

export function* watchPostCreatePinjaman() {
  yield takeLatest(fetchPostCreatePinjaman, postCreatePinjaman);
}
