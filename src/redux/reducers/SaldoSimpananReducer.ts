import { createSlice } from '@reduxjs/toolkit';

export type SimpananData = {
  pokok?: number;
  wajib?: number;
  sukarela?: number;
  total?: number;
};

export type SaldoData = {
  total?: number;
  simpananSukarela?: number;
};

interface RootState {
  simpanan: SimpananData;
  saldo: SaldoData;
  topUpNominal?: number | string;
  error: null;
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
    fetchSimpananData: (state, { payload }) => {
      state.simpanan = payload;
    },
    fetchSimpananDataSuccess: (state, { payload }) => {
      state.simpanan = payload;
    },
    fetchSimpananDataFailed: (state, { payload }) => {
      state.error = payload;
    },
    fetchSaldoData: (state, { payload }) => {
      state.saldo = payload;
    },
    fetchSaldoDataSuccess: (state, { payload }) => {
      state.saldo = payload;
    },
    fetchSaldoDataFailed: (state, { payload }) => {
      state.error = payload;
    },
    setTopupNominal: (state, { payload }) => {
      state.topUpNominal = payload;
    },
    resetTopupNominal: state => {
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
