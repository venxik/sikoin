/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
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
        DaftarKoperasiParamList,
        DataDiriStackParamList,
        PaymentStackParamList {}
  }
}

export type HomeTabScreenProps<Screen extends keyof HomeTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, Screen>,
    NativeStackScreenProps<HomeStackParamList>
  >;

export type ParentStackParamList = {
  OnboardingStackNavigator: undefined;
  LoginStackNavigator: LoginStackParamList | undefined;
};

export type LoginStackParamList = {
  LoginScreen: undefined;
  DaftarKoperasiStackNavigator: DaftarKoperasiParamList | undefined;
  HomeTab: HomeTabParamList | undefined;
};

export type DaftarKoperasiParamList = {
  DaftarKoperasiIntroScreen: undefined;
  DaftarKoperasiSearchScreen: undefined;
  DaftarKoperasiStep1Screen: undefined;
  DaftarKoperasiStep2Screen: undefined;
  DaftarKoperasiSuccessScreen: { email: string };
  DaftarKoperasiFailedScreen: undefined;
};

export type HomeTabParamList = {
  HomeStackNavigator: HomeStackParamList | undefined;
  ChatStackNavigator: ChatStackParamList | undefined;
  ProfileStackNavigator: ProfileStackParamList | undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  SaldoSimpananStackNavigator:
    | NavigatorScreenParams<SaldoSimpananStackParamList>
    | undefined;
  DiskonStackNavigator: DiskonStackParamList | undefined;
  TopupPenarikanStackNavigator:
    | NavigatorScreenParams<TopupPenarikanStackParamList>
    | undefined;
  TransaksiStackNavigator: TransaksiStackParamList | undefined;
  VoucherStackNavigator:
    | NavigatorScreenParams<VoucherStackParamList>
    | undefined;
  PinjamanStackNavigator: PinjamanStackParamList | undefined;
  DokumenStackNavigator: DokumenStackParamList | undefined;
  MarketStackNavigator: NavigatorScreenParams<MarketStackParamList> | undefined;
};

export type ChatStackParamList = {
  ChatMainScreen: undefined;
  ChatDetailScreen: undefined;
};

export type ProfileStackParamList = {
  ProfileMainScreen: undefined;
  EditProfileScreen: undefined;
  DataDiriStackNavigator: DataDiriStackParamList | undefined;
  PengaturanScreen: undefined;
  DataKoperasiMainScreen: undefined;
};

export type DataDiriStackParamList = {
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
};

export type DiskonStackParamList = {
  DiskonMainScreen: undefined;
};

export type DokumenStackParamList = {
  DokumenMainScreen: undefined;
  DokumenDetailScreen: { item: DokumenData };
};

export type PaymentStackParamList = {
  CartScreen: undefined;
  CheckoutScreen: undefined;
  SelectPaymentScreen: undefined;
  PaymentScreen: {
    nominal: number;
    isTopup?: boolean;
    selectedTopupPenarikan?: { nama: string; id: number } | null;
  };
  PaymentSuccessScreen: undefined;
};

export type SaldoSimpananStackParamList = {
  SaldoSimpananMainScreen: { showSaldo: boolean };
  TransaksiStackNavigator:
    | NavigatorScreenParams<TransaksiStackParamList>
    | undefined;
  TopupPenarikanStackNavigator:
    | NavigatorScreenParams<TopupPenarikanStackParamList>
    | undefined;
};

export type TopupPenarikanStackParamList = {
  TopupPenarikanMainScreen: { isTopup: boolean };
  TopupPenarikanDetailScreen: {
    selectedTopupPenarikan: { nama: string; id: number } | null;
    nominal: string;
    isTopup: boolean;
  };
  TopupPayment: NavigatorScreenParams<PaymentStackParamList> | undefined;
  PenarikanSuccessScreen: undefined;
  // TopupPaymentScreen: { nominal: string };
  // TopupSuccessScreen: undefined;
};

export type TransaksiStackParamList = {
  TransaksiMainScreen: undefined;
};

export type VoucherStackParamList = {
  VoucherMainScreen: undefined;
  VoucherPayment: NavigatorScreenParams<PaymentStackParamList> | undefined;
};

export type MarketStackParamList = {
  MarketMainScreen: undefined;
  MarketItemDetailsScreen: undefined;
  MarketPayment: NavigatorScreenParams<PaymentStackParamList> | undefined;
};

export type PinjamanStackParamList = {
  PinjamanStep1Screen: undefined;
  PinjamanStep2Screen: undefined;
  PinjamanStep3Screen: undefined;
  PinjamanStep4Screen: undefined;
  PinjamanStep5Screen: undefined;
  PinjamanSucessScreen: undefined;
  PinjamanReviewScreen: undefined;
  DaftarKtpCameraScreen: undefined;
};
