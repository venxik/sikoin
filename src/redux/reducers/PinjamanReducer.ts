import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type JenisPinjaman = {
  id: string;
  nama: string;
  keterangan: string;
  maksimumTenor: string;
  bunga: string;
  maksimumPlafon: number;
  dokumen: null;
};

export type PengajuanPinjaman = {
  id?: null;
  nomorPengajuan?: string;
  tanggal?: string;
  durasiPinjaman?: string;
  nominal?: number;
  tujuan?: string;
  status?: string;
  namaJenisPinjaman?: string;
  bungaJenisPinjaman?: string;
};

export type InitialPinjamanDataResponse = {
  jenisPinjaman: JenisPinjaman[];
  totalJumlahPinjamanDisetujui: number;
  pengajuanPinjaman: PengajuanPinjaman[];
};

interface RootState {
  pinjamanInitialData: InitialPinjamanDataResponse;
  error?: unknown;
}

const initialState: RootState = {
  pinjamanInitialData: {
    jenisPinjaman: [
      {
        bunga: '',
        dokumen: null,
        id: '',
        keterangan: '',
        maksimumPlafon: 0,
        maksimumTenor: '',
        nama: '',
      },
    ],
    totalJumlahPinjamanDisetujui: 0,
    pengajuanPinjaman: [],
  },
};

const pinjamanSlice = createSlice({
  name: 'pinjamanSlice',
  initialState,
  reducers: {
    getPinjamanInitialDataSuccess: (
      state: RootState,
      { payload }: PayloadAction<InitialPinjamanDataResponse>,
    ) => {
      state.pinjamanInitialData = payload;
    },
    getPinjamanInitialDataFailed: (
      state: RootState,
      { payload }: PayloadAction<unknown>,
    ) => {
      state.error = payload;
    },
  },
});

export const fetchGetPinjamanInitialData = createAction(
  'fetchGetPinjamanInitialData',
);

export const { getPinjamanInitialDataSuccess, getPinjamanInitialDataFailed } =
  pinjamanSlice.actions;

export default pinjamanSlice.reducer;
