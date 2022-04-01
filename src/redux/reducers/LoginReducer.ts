import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  sendUserEmailKoperasiParams,
  sendUserKoperasiResponseParams,
} from '../../config/apis/LoginApi';
import { storage } from '../../constants';
import encryptedStorage from '../../utils/encryptedStorage';

export type KoperasiListResponse = {
  id: string;
  nama: string;
  logo_koperasi: string;
  nomor_induk: string;
  alamat: string;
  no_telepon: string;
  email: string;
  website: string;
  durasi_subscription: string;
  created_at: string;
  updated_at: string;
};

export type UserKoperasiResponse = {
  id: number;
  no_anggota: string;
  nama: string;
  profile_pic: string;
  slug: string;
  email: string;
  tanggal_lahir: string;
  member_sejak: string;
  no_telp: string;
  koperasi_id: number;
  data_diri_id: number;
  created_at: string;
  updated_at: string;
};

type ForgotPasswordStatusState = 'idle' | 'success' | 'failed';

interface RootState {
  koperasiListData: KoperasiListResponse[];
  userKoperasiData: UserKoperasiResponse;
  error?: object;
  forgotPasswordStatus: ForgotPasswordStatusState;
}

const initialState: RootState = {
  koperasiListData: [],
  userKoperasiData: {} as UserKoperasiResponse,
  forgotPasswordStatus: 'idle',
};

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    fetchKoperasiListSuccess: (
      state,
      { payload }: PayloadAction<KoperasiListResponse[]>,
    ) => {
      state.koperasiListData = payload;
    },
    fetchKoperasiListFailed: (state, { payload }) => {
      state.error = payload;
    },
    fetchUserKoperasiSuccess: (
      state,
      { payload }: PayloadAction<UserKoperasiResponse>,
    ) => {
      state.userKoperasiData = payload;
    },
    fetchUserKoperasiFailed: (state, { payload }) => {
      state.error = payload;
    },
    fetchUserKoperasiEmailFailed: (state, { payload }) => {
      state.error = payload;
    },
    setForgotPasswordStatus: (
      state,
      { payload }: PayloadAction<ForgotPasswordStatusState>,
    ) => {
      state.forgotPasswordStatus = payload;
    },
    fetchLoginSuccess: (_, { payload }) => {
      encryptedStorage.saveEncryptedStorage(storage.authCode, payload);
    },
    fetchLoginFailed: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const fetchKoperasiList = createAction('fetchKoperasiList');
export const fetchUserKoperasi =
  createAction<sendUserKoperasiResponseParams>('fetchUserKoperasi');
export const fetchUserKoperasiEmail = createAction<sendUserEmailKoperasiParams>(
  'fetchUserKoperasiEmail',
);
export const fetchForgotPassword = createAction<string>('fetchForgotPassword');
export const fetchLogin = createAction<{ email: string; password: string }>(
  'fetchLogin',
);
export const {
  fetchKoperasiListSuccess,
  fetchKoperasiListFailed,
  fetchUserKoperasiEmailFailed,
  fetchUserKoperasiFailed,
  fetchUserKoperasiSuccess,
  setForgotPasswordStatus,
  fetchLoginFailed,
  fetchLoginSuccess,
} = loginSlice.actions;

export default loginSlice.reducer;
