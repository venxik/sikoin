// Imports: Dependencies
import { all, fork } from 'redux-saga/effects';
import { watchDummyList } from './DummySaga';

// Imports: Redux Sagas

// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([
    fork(watchDummyList),
    //   fork(watchGetIndividualRank),
    //   fork(watchGetTeamRank),
    //   fork(watchGetFriendList),
    //   fork(watchAddFriend),
    //   fork(watchUpdatePoints),
    //   fork(watchUpdateSavePoint),
    //   fork(watchGetBslList),
    //   fork(watchGetRecommendedCourses),
    //   fork(watchSignUpCourses),
    //   // fork(watchUpdateRWC),
    //   fork(watchGetRwcList),
    //   fork(watchUploadProfileData),
    //   fork(watchSignUpCoursesExplore),
    //   fork(watchGetToken),
    //   fork(watchLogout),
    //   fork(watchGetAuthorization),
    //   // fork(watchSetMailbox),
    //   fork(watchRetrieveReward),
    //   fork(watchClaimReward),
  ]);
}
