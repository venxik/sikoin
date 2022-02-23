import { combineReducers } from 'redux';
import ErrorModalReducer from './ErrorModalReducer';
import LoadingReducer from './LoadingReducer';
import DummyReducers from './DummyReducers';

export default combineReducers({
  errorModal: ErrorModalReducer,
  loading: LoadingReducer,
  DummyReducers: DummyReducers,
});
