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
import { AlamatData } from '../../redux/reducers/AlamatReducer';
import { BiodataData } from '../../redux/reducers/BiodataReducer';
import { DokumenData } from '../../redux/reducers/DokumenReducer';
import { KeluargaData } from '../../redux/reducers/RefKeluargaReducer';

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends ParentStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

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
  DaftarKoperasiStep1Screen: undefined;
  DaftarKoperasiStep2Screen: undefined;
  DaftarKoperasiSuccessScreen: undefined;
};

export type HomeTabParamList = {
  HomeStackNavigator: HomeStackParamList | undefined;
  ChatStackNavigator: ChatStackParamList | undefined;
  ProfileStackNavigator: ProfileStackParamList | undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  SaldoSimpananStackNavigator: NavigatorScreenParams<SaldoSimpananStackParamList>;
  DiskonStackNavigator: DiskonStackParamList | undefined;
  TopupStackNavigator: TopupStackParamList | undefined;
  TransaksiStackNavigator: TransaksiStackParamList | undefined;
  VoucherStackNavigator: VoucherStackParamList | undefined;
  PinjamanStackNavigator: PinjamanStackParamList | undefined;
  DokumenStackNavigator: DokumenStackParamList | undefined;
  MarketStackNavigator: MarketStackParamList | undefined;
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
  DaftarAlamatAddScreen: { update: boolean; item?: AlamatData; index?: number };
  DaftarAlamatMainScreen: undefined;
  DaftarRefKeluargaAddScreen: {
    update: boolean;
    item?: KeluargaData;
    index?: number;
  };
  DaftarRefKeluargaMainScreen: undefined;
  DaftarKtpMainScreen: undefined;
  DaftarKtpAddScreen: undefined;
  DaftarKtpCameraScreen: undefined;
  DaftarKtpSelfieScreen: undefined;
  DaftarBiodataMainScreen: undefined;
  DaftarBiodataAddScreen: { update: boolean; data?: BiodataData };
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

export type SaldoSimpananStackParamList = {
  SaldoSimpananMainScreen: { showSaldo: boolean };
};

export type TopupStackParamList = {
  TopupMainScreen: undefined;
  TopupDetailScreen: { selectedTopup: string; nominal: string };
  TopupPembayaranScreen: { nominal: string };
  TopupSuccessScreen: undefined;
};

export type TransaksiStackParamList = {
  TransaksiMainScreen: undefined;
};

export type VoucherStackParamList = {
  VoucherMainScreen: undefined;
};

export type MarketStackParamList = {
  MarketMainScreen: undefined;
};

export type PinjamanStackParamList = {
  PinjamanStep1: undefined;
  PinjamanStep2: undefined;
  PinjamanStep3: undefined;
  PinjamanStep4: undefined;
};
