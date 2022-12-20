import { combineReducers } from 'redux';

import AlamatReducer from './AlamatReducer';
import BiodataReducer from './BiodataReducer';
import DiskonReducer from './DiskonReducer';
import DokumenReducer from './DokumenReducer';
import ErrorModalReducer from './ErrorModalReducer';
import HomeReducer from './HomeReducer';
import KabarReducer from './KabarReducer';
import KoperasiReducer from './KoperasiReducer';
import KtpReducer from './KtpReducer';
import LoadingReducer from './LoadingReducer';
import LoginReducer from './LoginReducer';
import MarketReducer from './MarketReducer';
import NotifikasiReducer from './NotifikasiReducer';
import PekerjaanReducer from './PekerjaanReducer';
import PinjamanReducer from './PinjamanReducer';
import ProfileReducer from './ProfileReducer';
import PromoReducer from './PromoReducer';
import RefKeluargaReducer from './RefKeluargaReducer';
import SaldoSimpananReducer from './SaldoSimpananReducer';
import TransaksiReducer from './TransaksiReducer';
import VoucherReducer from './VoucherReducer';

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
  NotifikasiReducer,
  KoperasiReducer,
});

export default rootReducers;
