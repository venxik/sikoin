import { AxiosResponse } from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';
import { KtpDokumenApi } from '../../config/apis';
import { hideLoading, showLoading } from '../reducers/LoadingReducer';
import { formatter } from '../../utils';
import {
  fetchKtpDokumen,
  fetchKtpDokumenFailed,
  fetchKtpDokumenSuccess,
  KtpDokumenResponse,
} from '../reducers/KtpReducer';

function* getKtpDokumen() {
  yield put(showLoading());

  try {
    const response: AxiosResponse<{ data: KtpDokumenResponse }> = yield call(
      KtpDokumenApi.getKtpData,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      yield put(fetchKtpDokumenSuccess(data?.data));
    } else {
      yield put(fetchKtpDokumenFailed('Error'));
    }
  } catch (error) {
    yield put(fetchKtpDokumenFailed(error));
  }
  yield put(hideLoading());
}

// function* updateAlamat(action: ReturnType<typeof fetchUpdateAlamat>) {
//   yield put(showLoading());

//   try {
//     const response: AxiosResponse<{ data: AlamatDataResponse[] }> = yield call(
//       AlamatApi.updateAlamat,
//       action.payload,
//     );
//     if (response?.status === 200) {
//       const data = formatter.addMissingBracketJSON(response.data);
//       yield put(updateAlamatSuccess(data?.data));
//       if (!isEmpty(data)) {
//         goBack();
//       }
//     } else {
//       yield put(updateAlamatFailed('Error'));
//     }
//   } catch (error) {
//     yield put(updateAlamatFailed(error));
//   }
//   yield put(hideLoading());
// }

export function* watchGetKtpDokumen() {
  yield takeLatest(fetchKtpDokumen, getKtpDokumen);
}

// export function* watchUpdateAlamat() {
//   yield takeLatest(fetchUpdateAlamat, updateAlamat);
// }
