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
  simpanan: {
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
  id?: number;
};

export type SaldoDataResponse = {
  totalSaldoBelanja?: number;
  simpananBelanja?: SaldoSimpananList[];
};

export type SimpananDataResponse = {
  totalSaldoTerlihat: number;
  simpananTerlihat?: SaldoSimpananList[];
};

export type MutasiSimpananDetail = {
  jenis: 'SIMPANAN' | 'PENARIKAN';
  nominal: number;
  catatan: string;
  tanggal: string;
  kode: string;
};

export type MutasiSimpananResponse = {
  jenisSimpanan: {
    nama: string;
  };
  totalDana: {
    danaSimpanan: number;
    danaPending: number;
  };
  mutasi: MutasiSimpananDetail[];
};

interface RootState {
  simpanan: SimpananDataResponse;
  saldo: SaldoDataResponse;
  createSaldoList?: CreateSaldoListResponse;
  createSimpananList?: CreateSimpananListResponse;
  topUpNominal: string;
  mutasiSimpanan?: MutasiSimpananResponse;
  error?: unknown;
  message?: string;
}

const initialState: RootState = {
  saldo: {
    totalSaldoBelanja: 0,
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
    fetchMutasiSimpananSuccess: (
      state: RootState,
      { payload }: PayloadAction<MutasiSimpananResponse>,
    ) => {
      state.mutasiSimpanan = payload;
    },
    fetchMutasiSimpananFailed: (
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
export const fetchMutasiSimpanan = createAction<number>('fetchMutasiSimpanan');

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
  fetchMutasiSimpananFailed,
  fetchMutasiSimpananSuccess,
} = saldoSimpananSlice.actions;

export default saldoSimpananSlice.reducer;
