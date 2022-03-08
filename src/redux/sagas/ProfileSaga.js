import { takeLatest, put, call, select } from 'redux-saga/effects';
import { strings, apis } from 'constants';
import { selectProfileAvatarId, selectProfileNickname } from 'selectors/ProfileSelector';
import { selectSavepointId } from 'selectors/SavepointSelector';
import { showLoading, hideLoading } from 'reducers/LoadingReducer';
import { navigate } from 'config/navigation/NavigationService';
import { ProfileApi } from 'config/apis';
import {
  uploadProfileData,
  uploadProfileDataSuccess,
  uploadProfileDataFailed,
} from 'reducers/ProfileReducer';
import { createNonce } from 'utils/nonce';
import { showErrorModal } from 'reducers/ErrorModalReducer';

function* uploadProfileDataSaga() {
  const avatarId = yield select(selectProfileAvatarId);
  const nickname = yield select(selectProfileNickname);
  const savepointId = yield select(selectSavepointId);
  yield put(showLoading());
  try {
    const response = yield call(ProfileApi.submitProfile, {
      avatarId,
      nickname,
      savepointId,
      nonce: createNonce(10),
    });
    switch (response.status) {
      case 200: {
        yield put(uploadProfileDataSuccess(response.data));
        navigate('RegistrationCompletionScreen');
        break;
      }
      case 409: {
        yield put(uploadProfileDataFailed(strings.error));
        yield put(
          showErrorModal({
            options: {
              screenSource: 'ProfileSaga',
              errorType: apis.errorTypes.conflict,
            },
          }),
        );
        break;
      }
      default:
        break;
    }
  } catch (error) {
    yield put(uploadProfileDataFailed(strings.error));
    yield put(
      showErrorModal({
        options: {
          screenSource: 'ProfileSaga',
          errorType: apis.errorTypes.generic,
        },
      }),
    );
  }
  yield put(hideLoading());
}

export function* watchUploadProfileData() {
  yield takeLatest(uploadProfileData, uploadProfileDataSaga);
}
