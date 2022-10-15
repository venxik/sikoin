/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-namespace */
/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AlamatDataResponse } from '../../redux/reducers/AlamatReducer';
import { BiodataResponse } from '../../redux/reducers/BiodataReducer';
import { DokumenData } from '../../redux/reducers/DokumenReducer';
import { RefKeluargaResponse } from '../../redux/reducers/RefKeluargaReducer';

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList
      extends ParentStackParamList,
        HomeStackParamList,
        ProfileStackParamList,
        ChatStackParamList {}
  }
}

export type HomeTabScreenProps<Screen extends keyof HomeTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, Screen>,
  NativeStackScreenProps<HomeStackParamList>
>;

export type ParentStackParamList = {
  SplashScreen: undefined;
  OnboardingScreen: undefined;
  LoginScreen: undefined;
  DaftarKoperasiIntroScreen: undefined;
  DaftarKoperasiSearchScreen: undefined;
  DaftarKoperasiStep1Screen: undefined;
  DaftarKoperasiStep2Screen: undefined;
  DaftarKoperasiSuccessScreen: { email: string };
  DaftarKoperasiFailedScreen: undefined;
  HomeTab: HomeTabParamList | undefined;
};

export type HomeTabParamList = {
  HomeStackNavigator: HomeStackParamList | undefined;
  ChatStackNavigator: ChatStackParamList | undefined;
  ProfileStackNavigator: ProfileStackParamList | undefined;
};

export type ChatStackParamList = {
  ChatMainScreen: undefined;
  ChatDetailScreen: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  SaldoSimpananMainScreen: { showSaldo: boolean };
  TransaksiMainScreen: undefined;
  TopupPenarikanMainScreen: { isTopup: boolean };
  TopupPenarikanDetailScreen: {
    selectedTopupPenarikan: { nama: string; id: number } | null;
    nominal: string;
    isTopup: boolean;
  };
  PenarikanSuccessScreen: undefined;
  CartScreen: undefined;
  CheckoutScreen: undefined;
  SelectPaymentScreen: undefined;
  PaymentScreen: {
    nominal: number;
    isTopup?: boolean;
    selectedTopupPenarikan?: { nama: string; id: number } | null;
  };
  PaymentSuccessScreen: undefined;
  PinjamanMainScreen: undefined;
  PinjamanListScreen: undefined;
  PinjamanStep1Screen: undefined;
  PinjamanStep2Screen: undefined;
  PinjamanStep3Screen: undefined;
  PinjamanStep4Screen: undefined;
  PinjamanStep5Screen: undefined;
  PinjamanSucessScreen: undefined;
  PinjamanSummaryScreen: undefined;
  PinjamanDetailScreen: { id: number; status: string };
  PinjamanRincianScreen: { id: number };
  PinjamanSimulasiScreen: undefined;
  DaftarKtpCameraScreen: undefined;
  DaftarKtpSelfieScreen: undefined;
  VoucherMainScreen: undefined;
  MarketMainScreen: undefined;
  MarketItemDetailsScreen: undefined;
  DiskonMainScreen: undefined;
  DokumenMainScreen: undefined;
  DokumenDetailScreen: { item: DokumenData };
  SaldoSimpananDetailScreen: undefined;
  KabarMainScreen: undefined;
  KabarDetailScreen: undefined;
  PromoMainScreen: undefined;
  PromoDetailScreen: undefined;
};

export type ProfileStackParamList = {
  ProfileMainScreen: undefined;
  EditProfileScreen: undefined;
  PengaturanScreen: undefined;
  DataKoperasiMainScreen: undefined;
  DataDiriMainScreen: undefined;
  DaftarAlamatAddScreen: {
    update: boolean;
    item?: AlamatDataResponse;
  };
  DaftarAlamatMainScreen: undefined;
  DaftarRefKeluargaAddScreen: {
    update: boolean;
    item?: RefKeluargaResponse;
  };
  DaftarRefKeluargaMainScreen: undefined;
  DaftarKtpMainScreen: undefined;
  DaftarKtpAddScreen: undefined;
  DaftarKtpCameraScreen: undefined;
  DaftarKtpSelfieScreen: undefined;
  DaftarBiodataMainScreen: undefined;
  DaftarBiodataAddScreen: { update: boolean; data?: BiodataResponse };
  DaftarPekerjaanMainScreen: undefined;
  DaftarPekerjaanAddScreen: undefined;
  DokumenPendukungMainScreen: undefined;
  IDCardMainScreen: undefined;
};
