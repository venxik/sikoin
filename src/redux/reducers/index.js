import { combineReducers } from 'redux';
import ErrorModalReducer from './ErrorModalReducer';
import LoadingReducer from './LoadingReducer';
import DummyReducers from './DummyReducers';
import LoginReducers from './LoginReducers';

export default combineReducers({
  errorModal: ErrorModalReducer,
  loading: LoadingReducer,
  DummyReducers: DummyReducers,
  LoginReducers: LoginReducers,
});
