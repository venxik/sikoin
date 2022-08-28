import { combineReducers } from 'redux';
import ErrorModalReducer from './ErrorModalReducer';
import LoadingReducer from './LoadingReducer';
import LoginReducer from './LoginReducer';
import KabarReducer from './KabarReducer';
import PromoReducer from './PromoReducer';
import MarketReducer from './MarketReducer';
import ProfileReducer from './ProfileReducer';
import SaldoSimpananReducer from './SaldoSimpananReducer';
import AlamatReducer from './AlamatReducer';
import RefKeluargaReducer from './RefKeluargaReducer';
import KtpReducer from './KtpReducer';
import BiodataReducer from './BiodataReducer';
import PekerjaanReducer from './PekerjaanReducer';
import DiskonReducer from './DiskonReducer';
import TransaksiReducer from './TransaksiReducer';
import VoucherReducer from './VoucherReducer';
import DokumenReducer from './DokumenReducer';
import HomeReducer from './HomeReducer';
import PinjamanReducer from './PinjamanReducer';

const rootReducers = combineReducers({
  errorModal: ErrorModalReducer,
  loading: LoadingReducer,
  LoginReducer,
  KabarReducer,
  PromoReducer,
  MarketReducer,
  ProfileReducer,
  SaldoSimpananReducer,
  AlamatReducer,
  RefKeluargaReducer,
  KtpReducer,
  BiodataReducer,
  PekerjaanReducer,
  DiskonReducer,
  TransaksiReducer,
  VoucherReducer,
  DokumenReducer,
  HomeReducer,
  PinjamanReducer,
});

export default rootReducers;
