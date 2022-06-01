import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SaldoSimpananTopupRequest = {
  jenisSimpananId: number;
  nominal: number;
};

export type CreateSaldoListResponse = {
  simpananBelanja: {
    id: number;
    nama: string;
  }[];
};

export type CreateSimpananListResponse = {
  simpananDapatDitarik: {
    id: number;
    nama: string;
    sisaSaldo: number;
  }[];
  noRek: string;
  bank: string;
};

export type SubmitTopupResponse = {
  message: string;
};

export type SaldoSimpananList = {
  nama: string;
  saldo: number;
};

export type SaldoDataResponse = {
  totalSaldoBelanja?: number;
  simpananBelanja?: SaldoSimpananList[];
};

export type SimpananDataResponse = {
  totalSaldoTerlihat: number;
  simpananTerlihat?: SaldoSimpananList[];
};

interface RootState {
  simpanan: SimpananDataResponse;
  saldo: SaldoDataResponse;
  createSaldoList?: CreateSaldoListResponse;
  createSimpananList?: CreateSimpananListResponse;
  topUpNominal: string;
  error?: unknown;
  message?: string;
}

const initialState: RootState = {
  saldo: {
    totalSaldoBelanja: 1231222,
    simpananBelanja: [
      {
        nama: '',
        saldo: 0,
      },
    ],
  },
  simpanan: {
    totalSaldoTerlihat: 0,
    simpananTerlihat: [
      {
        nama: '',
        saldo: 0,
      },
    ],
  },
  topUpNominal: '',
  error: null,
};

const saldoSimpananSlice = createSlice({
  name: 'saldoSimpananSlice',
  initialState,
  reducers: {
    fetchSaldoDataSuccess: (
      state: RootState,
      { payload }: PayloadAction<SaldoDataResponse>,
    ) => {
      state.saldo = payload;
    },
    fetchSaldoDataFailed: (
      state: RootState,
      { payload }: PayloadAction<unknown>,
    ) => {
      state.error = payload;
    },
    fetchCreateSaldoListSuccess: (
      state: RootState,
      { payload }: PayloadAction<CreateSaldoListResponse>,
    ) => {
      state.createSaldoList = payload;
    },
    fetchCreateSaldoListFailed: (
      state: RootState,
      { payload }: PayloadAction<unknown>,
    ) => {
      state.error = payload;
    },
    fetchSubmitTopupSuccess: (
      state: RootState,
      { payload }: PayloadAction<SubmitTopupResponse>,
    ) => {
      state.message = payload.message;
    },
    fetchSubmitTopupFailed: (
      state: RootState,
      { payload }: PayloadAction<unknown>,
    ) => {
      state.error = payload;
    },
    fetchSimpananDataSuccess: (
      state: RootState,
      { payload }: PayloadAction<SimpananDataResponse>,
    ) => {
      state.simpanan = payload;
    },
    fetchSimpananDataFailed: (
      state: RootState,
      { payload }: PayloadAction<unknown>,
    ) => {
      state.error = payload;
    },
    fetchCreateSimpananListSuccess: (
      state: RootState,
      { payload }: PayloadAction<CreateSimpananListResponse>,
    ) => {
      state.createSimpananList = payload;
    },
    fetchCreateSimpananListFailed: (
      state: RootState,
      { payload }: PayloadAction<unknown>,
    ) => {
      state.error = payload;
    },
    fetchSubmitPenarikanSuccess: (
      state: RootState,
      { payload }: PayloadAction<SubmitTopupResponse>,
    ) => {
      state.message = payload.message;
    },
    fetchSubmitPenarikanFailed: (
      state: RootState,
      { payload }: PayloadAction<unknown>,
    ) => {
      state.error = payload;
    },
  },
});

export const fetchSaldoData = createAction('fetchSaldoData');
export const fetchSimpananData = createAction('fetchSimpananData');
export const fetchCreateSaldoList = createAction('fetchCreateSaldoList');
export const fetchCreateSimpananList = createAction('fetchCreateSimpananList');
export const fetchSubmitTopup =
  createAction<SaldoSimpananTopupRequest>('fetchSubmitTopup');
export const fetchSubmitPenarikan = createAction<SaldoSimpananTopupRequest>(
  'fetchSubmitPenarikan',
);

export const {
  fetchSaldoDataFailed,
  fetchSaldoDataSuccess,
  fetchCreateSaldoListFailed,
  fetchCreateSaldoListSuccess,
  fetchSubmitTopupFailed,
  fetchSubmitTopupSuccess,
  fetchSimpananDataFailed,
  fetchSimpananDataSuccess,
  fetchCreateSimpananListFailed,
  fetchCreateSimpananListSuccess,
  fetchSubmitPenarikanFailed,
  fetchSubmitPenarikanSuccess,
} = saldoSimpananSlice.actions;

export default saldoSimpananSlice.reducer;
