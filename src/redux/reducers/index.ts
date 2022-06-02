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
import { koperasiApi } from '../api/LoginApi';

const rootReducers = combineReducers({
  errorModal: ErrorModalReducer,
  loading: LoadingReducer,
  LoginReducer: LoginReducer,
  KabarReducer: KabarReducer,
  PromoReducer: PromoReducer,
  MarketReducer: MarketReducer,
  ProfileReducer: ProfileReducer,
  SaldoSimpananReducer: SaldoSimpananReducer,
  AlamatReducer: AlamatReducer,
  RefKeluargaReducer: RefKeluargaReducer,
  KtpReducer: KtpReducer,
  BiodataReducer: BiodataReducer,
  PekerjaanReducer: PekerjaanReducer,
  DiskonReducer: DiskonReducer,
  TransaksiReducer: TransaksiReducer,
  VoucherReducer: VoucherReducer,
  DokumenReducer: DokumenReducer,
  HomeReducer: HomeReducer,
  [koperasiApi.reducerPath]: koperasiApi.reducer,
});

export default rootReducers;
