import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

import { ApiResponse, SaldoSimpananApi } from '../../config/apis';
import { navigate } from '../../config/navigation';
import { formatter } from '../../utils';
import { hideLoading, showLoading } from '../reducers/LoadingReducer';
import {
  CreateSaldoListResponse,
  CreateSimpananListResponse,
  fetchCreateSaldoList,
  fetchCreateSaldoListFailed,
  fetchCreateSaldoListSuccess,
  fetchCreateSimpananList,
  fetchCreateSimpananListFailed,
  fetchCreateSimpananListSuccess,
  fetchMutasiSimpanan,
  fetchMutasiSimpananFailed,
  fetchMutasiSimpananSuccess,
  fetchSaldoData,
  fetchSaldoDataFailed,
  fetchSaldoDataSuccess,
  fetchSimpananData,
  fetchSimpananDataFailed,
  fetchSimpananDataSuccess,
  fetchSubmitPenarikan,
  fetchSubmitPenarikanFailed,
  fetchSubmitPenarikanSuccess,
  fetchSubmitTopup,
  fetchSubmitTopupFailed,
  fetchSubmitTopupSuccess,
  MutasiSimpananResponse,
  SaldoDataResponse,
  SimpananDataResponse,
  SubmitTopupResponse,
} from '../reducers/SaldoSimpananReducer';

function* getSaldoData() {
  yield put(showLoading());
  try {
    const response: AxiosResponse<ApiResponse<SaldoDataResponse>> = yield call(
      SaldoSimpananApi.getSaldoData,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(fetchSaldoDataSuccess(data?.data));
      } else {
        yield put(fetchSaldoDataFailed('Error'));
      }
    } else {
      yield put(fetchSaldoDataFailed('Error'));
    }
  } catch (error) {
    yield put(fetchSaldoDataFailed(error));
  }
  yield put(hideLoading());
}

function* getCreateSaldoList() {
  yield put(showLoading());
  try {
    const response: AxiosResponse<ApiResponse<CreateSaldoListResponse>> = yield call(
      SaldoSimpananApi.getCreateSaldoList,
    );

    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(fetchCreateSaldoListSuccess(data?.data));
        navigate('TopupPenarikanMainScreen', { isTopup: true });
      } else {
        yield put(fetchCreateSaldoListFailed('Error'));
      }
    } else {
      yield put(fetchCreateSaldoListFailed('Error'));
    }
  } catch (error) {
    yield put(fetchCreateSaldoListFailed(error));
  }
  yield put(hideLoading());
}

function* submitTopup(action: ReturnType<typeof fetchSubmitTopup>) {
  yield put(showLoading());
  try {
    const response: AxiosResponse<ApiResponse<SubmitTopupResponse>> = yield call(
      SaldoSimpananApi.submitTopup,
      action.payload,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        if (data.data != null) {
          yield put(fetchSubmitTopupSuccess(data?.data));
          navigate('PaymentSuccessScreen');
        }
      } else {
        yield put(fetchSubmitTopupFailed('Error'));
      }
    } else {
      yield put(fetchSubmitTopupFailed('Error'));
    }
  } catch (error) {
    yield put(fetchSubmitTopupFailed(error));
  }
  yield put(hideLoading());
}

function* getSimpananData() {
  yield put(showLoading());
  try {
    const response: AxiosResponse<ApiResponse<SimpananDataResponse>> = yield call(
      SaldoSimpananApi.getSimpananData,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(fetchSimpananDataSuccess(data?.data));
      } else {
        yield put(fetchSimpananDataFailed('Error'));
      }
    } else {
      yield put(fetchSimpananDataFailed('Error'));
    }
  } catch (error) {
    yield put(fetchSimpananDataFailed(error));
  }
  yield put(hideLoading());
}

function* getCreateSimpananList() {
  yield put(showLoading());
  try {
    const response: AxiosResponse<ApiResponse<CreateSimpananListResponse>> = yield call(
      SaldoSimpananApi.getCreateSimpananList,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(fetchCreateSimpananListSuccess(data?.data));
        navigate('TopupPenarikanMainScreen');
      } else {
        yield put(fetchCreateSimpananListFailed('Error'));
      }
    } else {
      yield put(fetchCreateSimpananListFailed('Error'));
    }
  } catch (error) {
    yield put(fetchCreateSimpananListFailed(error));
  }
  yield put(hideLoading());
}

function* submitPenarikan(action: ReturnType<typeof fetchSubmitPenarikan>) {
  yield put(showLoading());
  try {
    const response: AxiosResponse<ApiResponse<SubmitTopupResponse>> = yield call(
      SaldoSimpananApi.submitPenarikan,
      action.payload,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(fetchSubmitPenarikanSuccess(data?.data));
        navigate('PenarikanSuccessScreen');
      } else {
        yield put(fetchSubmitPenarikanFailed('Error'));
      }
    } else {
      yield put(fetchSubmitPenarikanFailed('Error'));
    }
  } catch (error) {
    yield put(fetchSubmitPenarikanFailed(error));
  }
  yield put(hideLoading());
}

function* getMutasiSimpanan(action: ReturnType<typeof fetchMutasiSimpanan>) {
  yield put(showLoading());
  try {
    const response: AxiosResponse<ApiResponse<MutasiSimpananResponse>> = yield call(
      SaldoSimpananApi.mutasiSimpanan,
      action.payload,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(fetchMutasiSimpananSuccess(data?.data));
        navigate('SaldoSimpananDetailScreen');
      } else {
        yield put(fetchMutasiSimpananFailed('Error'));
      }
    } else {
      yield put(fetchMutasiSimpananFailed('Error'));
    }
  } catch (error) {
    yield put(fetchMutasiSimpananFailed(error));
  }
  yield put(hideLoading());
}

export function* watchGetSaldoData() {
  yield takeLatest(fetchSaldoData, getSaldoData);
}

export function* watchGetCreateSaldoList() {
  yield takeLatest(fetchCreateSaldoList, getCreateSaldoList);
}

export function* watchSubmitTopup() {
  yield takeLatest(fetchSubmitTopup, submitTopup);
}

export function* watchGetSimpananData() {
  yield takeLatest(fetchSimpananData, getSimpananData);
}

export function* watchGetCreateSimpananList() {
  yield takeLatest(fetchCreateSimpananList, getCreateSimpananList);
}

export function* watchSubmitPenarikan() {
  yield takeLatest(fetchSubmitPenarikan, submitPenarikan);
}

export function* watchGetMutasiSimpanan() {
  yield takeLatest(fetchMutasiSimpanan, getMutasiSimpanan);
}
