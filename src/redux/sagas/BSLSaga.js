import { takeLatest, put, call } from 'redux-saga/effects';
import { showLoading, hideLoading } from 'reducers/LoadingReducer';
import { BSLApi } from 'config/apis';
import { strings } from 'constants';
import {
  getBslList,
  getBslListChapter1Success,
  getBslListChapter2Success,
  getBslListChapter3Success,
  getBslListChapter4Success,
  getBslListError,
} from 'reducers/BSLReducer';

function* getBslListSaga(action) {
  const { payload } = action || {};
  yield put(showLoading());

  try {
    const response = yield call(BSLApi.retrieveBSLs, { chapterId: payload });
    if (response.status === 200) {
      switch (payload) {
        case 0: {
          yield put(getBslListChapter1Success(response.data.bsls));
          break;
        }
        case 1: {
          yield put(getBslListChapter2Success(response.data.bsls));
          break;
        }
        case 2: {
          yield put(getBslListChapter3Success(response.data.bsls));
          break;
        }
        case 3: {
          yield put(getBslListChapter4Success(response.data.bsls));
          break;
        }
        default: {
          break;
        }
      }
    } else {
      yield put(getBslListError(strings.error));
    }
  } catch (error) {
    yield put(getBslListError(strings.error));
  }
  yield put(hideLoading());
}

export function* watchGetBslList() {
  yield takeLatest(getBslList, getBslListSaga);
}
