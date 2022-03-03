import rootReducer from '../../redux/reducers';
import { persistStore, persistReducer } from 'redux-persist';
import { createStore, applyMiddleware } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // whitelist: '',
};

const persistReducers = persistReducer(persistConfig, rootReducer);
const store = createStore(persistReducers, applyMiddleware(thunk));
const persist = persistStore(store);

export { store, persist };
