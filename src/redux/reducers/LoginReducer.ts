import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  SendUserEmailKoperasiParams,
  SendUserKoperasiResponseParams,
} from '../../config/apis/LoginApi';
import { storage } from '../../constants';
import { EncryptedStorage } from '../../utils';

export interface KoperasiListResponse {
  namaKoperasi: string;
}

export interface UserKoperasiResponse {
  noAnggota: string;
  nama: string;
  profilePic: string;
  email: string;
  tanggalLahir: string;
  memberSejak: string;
  noTelp: string;
}

export interface LoginResponse {
  message: string;
  user: object;
  token: string;
}

export type ChangePasswordForm = {
  passwordLama: string;
  password: string;
  confPassword: string;
};

type ForgotPasswordStatus = 'idle' | 'success' | 'failed';

interface RootState {
  koperasiListData: KoperasiListResponse[];
  userKoperasiData: UserKoperasiResponse;
  error?: unknown;
  forgotPasswordStatus: ForgotPasswordStatus;
  versionNumber: string;
  changePasswordStatus: ForgotPasswordStatus;
}

const initialState: RootState = {
  koperasiListData: [],
  userKoperasiData: {} as UserKoperasiResponse,
  forgotPasswordStatus: 'idle',
  versionNumber: '',
  changePasswordStatus: 'idle',
};

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    getKoperasiListSuccess: (
      state: RootState,
      { payload }: PayloadAction<KoperasiListResponse[]>,
    ) => {
      state.koperasiListData = payload;
    },
    getKoperasiListFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
    getUserKoperasiSuccess: (
      state: RootState,
      { payload }: PayloadAction<UserKoperasiResponse>,
    ) => {
      state.userKoperasiData = payload;
    },
    getUserKoperasiFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
    updateUserKoperasiEmailSuccess: (
      state: RootState,
      { payload }: PayloadAction<UserKoperasiResponse>,
    ) => {
      state.userKoperasiData = payload;
    },
    updateUserKoperasiEmailFailed: (state: RootState, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
    setForgotPasswordStatus: (
      state: RootState,
      { payload }: PayloadAction<ForgotPasswordStatus>,
    ) => {
      state.forgotPasswordStatus = payload;
    },
    fetchLoginSuccess: (_: unknown, { payload }: PayloadAction<LoginResponse>) => {
      EncryptedStorage.saveEncryptedStorage(storage.authCode, payload.token);
    },
    fetchLoginFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
    fetchLogoutSuccess: () => {},
    fetchLogoutFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
    fetchVersionNumberSuccess: (
      state: RootState,
      { payload }: PayloadAction<{ versionNumber: string }>,
    ) => {
      state.versionNumber = payload.versionNumber;
    },
    fetchVersionNumberFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
    fetchChangePasswordSuccess: () => {},
    fetchChangePasswordFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
    setChangePasswordStatus: (
      state: RootState,
      { payload }: PayloadAction<ForgotPasswordStatus>,
    ) => {
      state.changePasswordStatus = payload;
    },
  },
});

export const fetchKoperasiList = createAction('fetchKoperasiList');
export const fetchUserKoperasi = createAction<SendUserKoperasiResponseParams>('fetchUserKoperasi');
export const fetchUserKoperasiEmail =
  createAction<SendUserEmailKoperasiParams>('fetchUserKoperasiEmail');
export const fetchForgotPassword = createAction<string>('fetchForgotPassword');
export const fetchLogin = createAction<{ email: string; password: string }>('fetchLogin');
export const fetchLogout = createAction('fetchLogout');
export const fetchVersionNumber = createAction('fetchversionNumber');
export const fetchChangePassword = createAction<ChangePasswordForm>('fetchChangePassword');
export const {
  getKoperasiListSuccess,
  getKoperasiListFailed,
  updateUserKoperasiEmailFailed,
  getUserKoperasiFailed,
  getUserKoperasiSuccess,
  setForgotPasswordStatus,
  fetchLoginFailed,
  fetchLoginSuccess,
  fetchLogoutFailed,
  fetchLogoutSuccess,
  fetchVersionNumberFailed,
  fetchVersionNumberSuccess,
  fetchChangePasswordFailed,
  fetchChangePasswordSuccess,
  updateUserKoperasiEmailSuccess,
  setChangePasswordStatus,
} = loginSlice.actions;

export default loginSlice.reducer;
