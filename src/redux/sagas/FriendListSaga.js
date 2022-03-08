// Imports: Dependencies
import { takeLatest, put, call } from 'redux-saga/effects';
import { strings } from 'constants';
import { createNonce } from 'utils/nonce';
import { showLoading, hideLoading } from 'reducers/LoadingReducer';
import { navigate } from 'config/navigation/NavigationService';
import { FriendListApi } from 'config/apis';
import {
  getFriendList,
  getFriendListSuccess,
  getFriendListFailed,
  addFriend,
  addFriendSuccess,
  addFriendFailed,
} from 'reducers/FriendListReducer';

function* getFriendListSaga() {
  yield put(showLoading());
  try {
    const response = yield call(FriendListApi.retrieveFriendList);
    if (response.status === 200) {
      yield put(getFriendListSuccess(response.data.friendlist));
    } else {
      yield put(getFriendListFailed(strings.error));
    }
  } catch (error) {
    yield put(getFriendListFailed(strings.error));
  }
  yield put(hideLoading());
}

function* addFriendSaga(action) {
  const { friendUsername, firstTime } = action.payload || {};
  yield put(showLoading());
  try {
    const response = yield call(FriendListApi.callAddFriend, {
      friendUsername,
      nonce: createNonce(9),
    });
    if (response.status === 200) {
      yield put(addFriendSuccess(response.data.friendlist));
      navigate('AddFriendCompletionScreen', { firstTime });
    } else {
      yield put(addFriendFailed(strings.error));
    }
  } catch (error) {
    yield put(addFriendFailed(strings.error));
  }
  yield put(hideLoading());
}

export function* watchGetFriendList() {
  yield takeLatest(getFriendList, getFriendListSaga);
}
export function* watchAddFriend() {
  yield takeLatest(addFriend, addFriendSaga);
}
