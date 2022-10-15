/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-var-requires */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';

import Reactotron from '../../../ReactotronConfig';
import rootReducer from '../../redux/reducers';
import { rootSaga } from '../../redux/sagas';

const sagaMonitor = Reactotron.createSagaMonitor!();
let sagaMiddleware: SagaMiddleware;

if (!__DEV__) {
  sagaMiddleware = createSagaMiddleware();
} else {
  sagaMiddleware = createSagaMiddleware({ sagaMonitor });
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['HomeReducer'],
};

const persistReducers = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
  enhancers: (e) => e.concat(__DEV__ ? Reactotron.createEnhancer!() : []),
});

const persist = persistStore(store);

sagaMiddleware.run(rootSaga);

//this is for development reset redux persist every refresh
// persist.purge();

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { persist, store };
