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
  // whitelist: '',
};

const persistReducers = persistReducer(persistConfig, rootReducer);
// const store = createStore(persistReducers, applyMiddleware(thunk));
const store = configureStore({
  reducer: persistReducers,
  middleware,
});

const persist = persistStore(store);

sagaMiddleware.run(rootSaga);

//this is for development
persist.purge();

export { store, persist };
