import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  sendUserEmailKoperasiParams,
  sendUserKoperasiResponseParams,
} from '../../config/apis/LoginApi';
import { storage } from '../../constants';
import encryptedStorage from '../../utils/encryptedStorage';

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
    getKoperasiListSuccess: (
      state,
      { payload }: PayloadAction<KoperasiListResponse[]>,
    ) => {
      state.koperasiListData = payload;
    },
    getKoperasiListFailed: (state, { payload }) => {
      state.error = payload;
    },
    getUserKoperasiSuccess: (
      state,
      { payload }: PayloadAction<UserKoperasiResponse>,
    ) => {
      state.userKoperasiData = payload;
    },
    getUserKoperasiFailed: (state, { payload }) => {
      state.error = payload;
    },
    updateUserKoperasiEmailSuccess: (
      state,
      { payload }: PayloadAction<UserKoperasiResponse>,
    ) => {
      state.userKoperasiData = payload;
    },
    updateUserKoperasiEmailFailed: (state, { payload }) => {
      state.error = payload;
    },
    setForgotPasswordStatus: (
      state,
      { payload }: PayloadAction<ForgotPasswordStatusState>,
    ) => {
      state.forgotPasswordStatus = payload;
    },
    fetchLoginSuccess: (_, { payload }: PayloadAction<LoginResponse>) => {
      console.log('fetchLoginSuccess', payload);
      encryptedStorage.saveEncryptedStorage(storage.authCode, payload.token);
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
  getKoperasiListSuccess,
  getKoperasiListFailed,
  updateUserKoperasiEmailFailed,
  getUserKoperasiFailed,
  getUserKoperasiSuccess,
  setForgotPasswordStatus,
  fetchLoginFailed,
  fetchLoginSuccess,
} = loginSlice.actions;

export default loginSlice.reducer;