import rootReducer from '../../redux/reducers';
import createSagaMiddleware from 'redux-saga';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { rootSaga } from '../../redux/sagas';
import { createLogger } from 'redux-logger';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['AlamatReducer'],
  blacklist: [],
};

const logger = createLogger({
  collapsed: true,
  duration: true,
  timestamp: true,
  logErrors: true,
  diff: true,
});

const persistReducers = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(sagaMiddleware)
      .concat(logger),
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

export { store, persist };
