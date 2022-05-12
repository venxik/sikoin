import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SimpananData = {
  pokok: number;
  wajib: number;
  sukarela: number;
  total: number;
};

export type SaldoData = {
  total?: number;
  simpananSukarela: number;
};

interface RootState {
  simpanan: SimpananData;
  saldo: SaldoData;
  topUpNominal: string;
  error?: unknown;
}

const initialState: RootState = {
  simpanan: {
    pokok: 1500000,
    wajib: 10000000,
    sukarela: 1239000,
    total: 9999999,
  },
  saldo: {
    total: 1231222,
    simpananSukarela: 12312321,
  },
  topUpNominal: '',
  error: null,
};

const saldoSimpananSlice = createSlice({
  name: 'saldoSimpananSlice',
  initialState,
  reducers: {
    fetchSimpananData: (
      state: RootState,
      { payload }: PayloadAction<SimpananData>,
    ) => {
      state.simpanan = payload;
    },
    fetchSimpananDataSuccess: (
      state: RootState,
      { payload }: PayloadAction<SimpananData>,
    ) => {
      state.simpanan = payload;
    },
    fetchSimpananDataFailed: (
      state: RootState,
      { payload }: PayloadAction<unknown>,
    ) => {
      state.error = payload;
    },
    fetchSaldoData: (
      state: RootState,
      { payload }: PayloadAction<SaldoData>,
    ) => {
      state.saldo = payload;
    },
    fetchSaldoDataSuccess: (
      state: RootState,
      { payload }: PayloadAction<SaldoData>,
    ) => {
      state.saldo = payload;
    },
    fetchSaldoDataFailed: (
      state: RootState,
      { payload }: PayloadAction<unknown>,
    ) => {
      state.error = payload;
    },
    setTopupNominal: (state: RootState, { payload }: PayloadAction<string>) => {
      state.topUpNominal = payload;
    },
    resetTopupNominal: (state: RootState) => {
      state.topUpNominal = '';
    },
  },
});

export const {
  fetchSaldoData,
  fetchSaldoDataFailed,
  fetchSaldoDataSuccess,
  fetchSimpananData,
  fetchSimpananDataFailed,
  fetchSimpananDataSuccess,
  setTopupNominal,
  resetTopupNominal,
} = saldoSimpananSlice.actions;

export default saldoSimpananSlice.reducer;
