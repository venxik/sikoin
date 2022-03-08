import { takeLatest, put, call } from 'redux-saga/effects';
import { strings } from 'constants';
import { createNonce } from 'utils/nonce';
import { showLoading, hideLoading } from 'reducers/LoadingReducer';
import { DiagnosticApi } from 'config/apis';
import {
  getRecommendedCourses,
  getRecommendedCoursesSuccess,
  getRecommendedCoursesFailed,
  signUpCourses,
  signUpCoursesSuccess,
  signUpCoursesFailed,
} from 'reducers/DiagnosticReducer';
import { navigate } from 'config/navigation/NavigationService';

function* getRecommendedCoursesSaga(action) {
  const { pathwayId } = action.payload || {};
  yield put(showLoading());
  try {
    const response = yield call(DiagnosticApi.retrieveRecommendedCourses, {
      pathwayId,
      nonce: createNonce(9),
    });
    if (response.status === 200) {
      yield put(getRecommendedCoursesSuccess(response.data.courseList));
    } else {
      yield put(getRecommendedCoursesFailed(strings.error));
    }
  } catch (error) {
    yield put(getRecommendedCoursesFailed(strings.error));
  }
  yield put(hideLoading());
}

function* signUpCoursesSaga(action) {
  const { payload } = action || {};
  yield put(showLoading());
  try {
    const response = yield call(DiagnosticApi.signUpRecommendedCourses, payload);
    if (response.status === 200) {
      yield put(signUpCoursesSuccess());
      navigate('RecommendedCoursesCompletionScreen');
    } else {
      yield put(signUpCoursesFailed(strings.error));
    }
  } catch (error) {
    yield put(signUpCoursesFailed(strings.error));
  }
  yield put(hideLoading());
}

export function* watchGetRecommendedCourses() {
  yield takeLatest(getRecommendedCourses, getRecommendedCoursesSaga);
}

export function* watchSignUpCourses() {
  yield takeLatest(signUpCourses, signUpCoursesSaga);
}
