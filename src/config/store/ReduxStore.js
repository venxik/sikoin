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
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { rootSaga } from '../../redux/sagas';
import { createLogger } from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();
const middleware = [
  ...getDefaultMiddleware({
    thunk: false,
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  sagaMiddleware,
];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['AlamatReducer'],
};

if (__DEV__) {
  middleware.push(
    createLogger({
      collapsed: true,
      duration: true,
      timestamp: true,
      logErrors: true,
      diff: true,
    }),
  );
}

const persistReducers = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistReducers,
  middleware,
});

const persist = persistStore(store);

sagaMiddleware.run(rootSaga);

//this is for development reset redux persist every refresh
// persist.purge();

export { store, persist };
