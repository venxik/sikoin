import { combineReducers } from 'redux';
import ErrorModalReducer from './ErrorModalReducer';
import LoadingReducer from './LoadingReducer';
import DummyReducer from './DummyReducers';
import KabarReducer from './KabarReducer';
import PromoReducer from './PromoReducer';
import MarketReducer from './MarketReducer';
import ProfileReducer from './ProfileReducer';
import SaldoSimpananReducer from './SaldoSimpananReducer';
import AlamatReducer from './AlamatReducer';
import RefKeluargaReducer from './RefKeluargaReducer';
import KtpReducer from './KtpReducer';
import BiodataReducer from './BiodataReducer';
import TtdReducer from './TtdReducer';
import PekerjaanReducer from './PekerjaanReducer';
import DiskonReducer from './DiskonReducer';
import TransaksiReducer from './TransaksiReducer';
import VoucherReducer from './VoucherReducer';

const rootReducers = combineReducers({
  errorModal: ErrorModalReducer,
  loading: LoadingReducer,
  DummyReducer: DummyReducer,
  KabarReducer: KabarReducer,
  PromoReducer: PromoReducer,
  MarketReducer: MarketReducer,
  ProfileReducer: ProfileReducer,
  SaldoSimpananReducer: SaldoSimpananReducer,
  AlamatReducer: AlamatReducer,
  RefKeluargaReducer: RefKeluargaReducer,
  KtpReducer: KtpReducer,
  BiodataReducer: BiodataReducer,
  TtdReducer: TtdReducer,
  PekerjaanReducer: PekerjaanReducer,
  DiskonReducer: DiskonReducer,
  TransaksiReducer: TransaksiReducer,
  VoucherReducer: VoucherReducer,
});

export default rootReducers;
