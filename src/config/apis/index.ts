import AlamatApi from './AlamatApi';
import BiodataApi from './BiodataApi';
import DokumenApi from './DokumenApi';
import HomeApi from './HomeApi';
import KabarApi from './KabarApi';
import KtpDokumenApi from './KtpDokumenApi';
import LoginApi from './LoginApi';
import MarketApi from './MarketApi';
import NotifikasiApi from './NotifikasiApi';
import PekerjaanApi from './PekerjaanApi';
import PinjamanApi from './PinjamanApi';
import ProfileApi from './ProfileApi';
import PromoApi from './PromoApi';
import RefKeluargaApi from './RefKeluargaApi';
import SaldoSimpananApi from './SaldoSimpananApi';

export type ApiResponse<T> = {
  data: T;
  error: string;
};

export {
  AlamatApi,
  BiodataApi,
  DokumenApi,
  HomeApi,
  KabarApi,
  KtpDokumenApi,
  LoginApi,
  MarketApi,
  NotifikasiApi,
  PekerjaanApi,
  PinjamanApi,
  ProfileApi,
  PromoApi,
  RefKeluargaApi,
  SaldoSimpananApi,
};
