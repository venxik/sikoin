import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
  error: null,
};

const saldoSimpananSlice = createSlice({
  name: 'saldoSimpananSlice',
  initialState,
  reducers: {
    fetchSimpananData: () => {},
    fetchSimpananDataSuccess: (state, { payload }) => {
      state.simpanan = payload;
    },
    fetchSimpananDataFailed: (state, { payload }) => {
      state.error = payload;
    },
    fetchSaldoData: () => {},
    fetchSaldoDataSuccess: (state, { payload }) => {
      state.saldo = payload;
    },
    fetchSaldoDataFailed: (state, { payload }) => {
      state.error = payload;
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
} = saldoSimpananSlice.actions;

export default saldoSimpananSlice.reducer;
