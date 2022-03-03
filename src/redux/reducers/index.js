import { combineReducers } from 'redux';
import ErrorModalReducer from './ErrorModalReducer';
import LoadingReducer from './LoadingReducer';
import DummyReducer from './DummyReducers';
import LoginReducer from './LoginReducer';
import KabarReducer from './KabarReducer';
import PromoReducer from './PromoReducer';
import MarketDataReducer from './MarketDataReducer';
import ProfileDataReducer from './ProfileDataReducer';
import SaldoSimpananReducer from './SaldoSimpananReducer';

export default combineReducers({
  errorModal: ErrorModalReducer,
  loading: LoadingReducer,
  DummyReducer: DummyReducer,
  LoginReducer: LoginReducer,
  KabarReducer: KabarReducer,
  PromoReducer: PromoReducer,
  MarketDataReducer: MarketDataReducer,
  ProfileDataReducer: ProfileDataReducer,
  SaldoSimpananReducer: SaldoSimpananReducer,
});
