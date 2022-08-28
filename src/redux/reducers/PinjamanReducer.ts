import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type IdJenisPinjaman = {
  idJenisPinjaman?: number;
};

export type PinjamanStep1Data = {
  nama?: string;
  noTelp?: string;
  email?: string;
} & IdJenisPinjaman;

export type PinjamanStep2Data = {
  tempatLahir?: string;
  tanggalLahir?: string;
  jenisKelamin?: string;
  golDarah?: string;
  kewarganegaraan?: string;
  pendidikanTerakhir?: string;
  agama?: string;
  statusPernikahan?: string;
  jumlahAnak?: number;
  pekerjaan?: string;
  detailPekerjaan?: string;
};

export type PinjamanStep3Data = {
  masaKerjaTahun?: number;
  masaKerjaBulan?: number;
  gajiBulanan?: string;
  jabatanTerakhir?: string;
  namaPerusahaan?: string;
  alamatKantor?: string;
  kota?: string;
  provinsi?: string;
  noTelpPt?: string;
  bank?: string;
  noRek?: string;
  namaPemilik?: string;
  namaKantorCabang?: string;
};

export type PinjamanStep4Data = {
  noKtp?: string;
  linkGambarKtp?: string;
  linkSelfieKtp?: string;
  linkDokumen?: string;
  namaDokumen?: string;
};

export type CreatePinjamanRequest = {
  noKtp?: string;
};

export type PinjamanSummaryResponse = {
  nominal?: number;
  tenor?: number;
  tujuan?: string;
  nama?: string;
  noRek?: string;
  namaBank?: string;
  namaPemilik?: string;
  namaKantorCabang?: string;
  noKtp?: string;
  namaJenisPinjaman?: string;
  bungaJenisPinjaman?: string;
  totalAngsuranPokok?: number;
  totalAngsuranBunga?: number;
  totalAngsuran?: number;
  simulasi?: RincianSimulasi[];
};

export type GetPinjamanInitialDataResponse = {
  jenisPinjaman: JenisPinjaman[];
  totalJumlahPinjamanDisetujui: number;
  pengajuanPinjaman: PengajuanPinjaman[];
};

export type PinjamanDetailResponse = {
  nama?: string;
  nominal?: number;
  namaBankTujuan: string;
  nomorRekeningBank: string;
  nomorKtp: string;
  jenisPinjaman: string;
  lamaPinjaman: number;
  totalAngsuranPokok?: number;
  totalAngsuranBunga?: number;
  totalAngsuran?: number;
  sisaAngsuran?: string;
  alasan?: string;
};

export type RincianSimulasi = {
  bulan?: string;
  tanggalJatuhTempo?: string;
  saldo?: number;
  angsuranPokok?: number;
  angsuranBunga?: number;
  jumlahAngsuran?: number;
  statusBayar?: boolean;
};

export type PinjamanDisetujuiDetailResponse = {
  rincianAngsuran: RincianSimulasi[];
};

export type JenisPinjaman = {
  id: number;
  nama: string;
  keterangan: string;
  maksimumTenor: string;
  bunga: string;
  maksimumPlafon: number;
  dokumen: null;
};

export type PengajuanPinjaman = {
  id: number;
  nomorPengajuan: string;
  tanggal: string;
  durasiPinjaman: string;
  nominal: number;
  tujuan: string;
  status: 'PENGAJUAN' | 'DISETUJUI' | 'DITOLAK' | 'SELESAI';
  namaJenisPinjaman: string;
  bungaJenisPinjaman: string;
};

export type CreatePinjamanInfo = {
  idJenisPinjaman?: number;
  nominal?: number;
  tenor?: number;
  tujuan?: string;
};

interface RootState {
  pinjamanInitialData: GetPinjamanInitialDataResponse;
  pinjamanDetailData: PinjamanDetailResponse;
  pinjamanInfo: CreatePinjamanInfo;
  pinjamanStep1Data: PinjamanStep1Data;
  pinjamanStep2Data: PinjamanStep2Data;
  pinjamanStep3Data: PinjamanStep3Data;
  pinjamanStep4Data: PinjamanStep4Data;
  pinjamanSummaryData: PinjamanSummaryResponse;
  pinjamanDisetujuiDetail: PinjamanDisetujuiDetailResponse;
  error?: unknown;
}

const initialState: RootState = {
  pinjamanInitialData: {
    jenisPinjaman: [
      {
        bunga: '',
        dokumen: null,
        id: 0,
        keterangan: '',
        maksimumPlafon: 0,
        maksimumTenor: '',
        nama: '',
      },
    ],
    totalJumlahPinjamanDisetujui: 0,
    pengajuanPinjaman: [],
  },
  pinjamanDetailData: {
    jenisPinjaman: '',
    lamaPinjaman: 0,
    namaBankTujuan: '',
    nomorKtp: '',
    nomorRekeningBank: '',
  },
  pinjamanStep1Data: {},
  pinjamanStep2Data: {},
  pinjamanStep3Data: {},
  pinjamanStep4Data: {},
  pinjamanInfo: {},
  pinjamanSummaryData: {},
  pinjamanDisetujuiDetail: {
    rincianAngsuran: [],
  },
};

const pinjamanSlice = createSlice({
  name: 'pinjamanSlice',
  initialState,
  reducers: {
    setPinjamanInfo: (
      state: RootState,
      { payload }: PayloadAction<CreatePinjamanInfo>,
    ) => {
      state.pinjamanInfo = payload;
    },
    getPinjamanInitialDataSuccess: (
      state: RootState,
      { payload }: PayloadAction<GetPinjamanInitialDataResponse>,
    ) => {
      state.pinjamanInitialData = payload;
    },
    getPinjamanInitialDataFailed: (
      state: RootState,
      { payload }: PayloadAction<unknown>,
    ) => {
      state.error = payload;
    },
    getPinjamanDisetujuiSuccess: (
      state: RootState,
      { payload }: PayloadAction<PinjamanDetailResponse>,
    ) => {
      state.pinjamanDetailData = payload;
    },
    getPinjamanDisetujuiFailed: (
      state: RootState,
      { payload }: PayloadAction<unknown>,
    ) => {
      state.error = payload;
    },
    getPinjamanDitolakSuccess: (
      state: RootState,
      { payload }: PayloadAction<PinjamanDetailResponse>,
    ) => {
      state.pinjamanDetailData = payload;
    },
    getPinjamanDitolakFailed: (
      state: RootState,
      { payload }: PayloadAction<unknown>,
    ) => {
      state.error = payload;
    },
    getPinjamanDisetujuiDetailSuccess: (
      state: RootState,
      { payload }: PayloadAction<PinjamanDisetujuiDetailResponse>,
    ) => {
      state.pinjamanDisetujuiDetail = payload;
    },
    getPinjamanDisetujuiDetailFailed: (
      state: RootState,
      { payload }: PayloadAction<unknown>,
    ) => {
      state.error = payload;
    },
    fetchPinjamanStep1Success: (
      state: RootState,
      { payload }: PayloadAction<PinjamanStep1Data>,
    ) => {
      state.pinjamanStep1Data = payload;
    },
    fetchPinjamanStep1Failed: (
      state: RootState,
      { payload }: PayloadAction<unknown>,
    ) => {
      state.error = payload;
    },
    fetchPinjamanStep2Success: (
      state: RootState,
      { payload }: PayloadAction<PinjamanStep2Data>,
    ) => {
      state.pinjamanStep2Data = payload;
    },
    fetchPinjamanStep2Failed: (
      state: RootState,
      { payload }: PayloadAction<unknown>,
    ) => {
      state.error = payload;
    },
    fetchPinjamanStep3Success: (
      state: RootState,
      { payload }: PayloadAction<PinjamanStep3Data>,
    ) => {
      state.pinjamanStep3Data = payload;
    },
    fetchPinjamanStep3Failed: (
      state: RootState,
      { payload }: PayloadAction<unknown>,
    ) => {
      state.error = payload;
    },
    fetchPinjamanStep4Success: (
      state: RootState,
      { payload }: PayloadAction<PinjamanStep4Data>,
    ) => {
      state.pinjamanStep4Data = payload;
    },
    fetchPinjamanStep4Failed: (
      state: RootState,
      { payload }: PayloadAction<unknown>,
    ) => {
      state.error = payload;
    },
    fetchPatchCreatePinjamanSuccess: () => {
      null;
    },
    fetchPatchCreatePinjamanFailed: (
      state: RootState,
      { payload }: PayloadAction<unknown>,
    ) => {
      state.error = payload;
    },
    fetchPinjamanSummarySuccess: (
      state: RootState,
      { payload }: PayloadAction<PinjamanSummaryResponse>,
    ) => {
      state.pinjamanSummaryData = payload;
    },
    fetchPinjamanSummaryFailed: (
      state: RootState,
      { payload }: PayloadAction<unknown>,
    ) => {
      state.error = payload;
    },
    fetchPostCreatePinjamanSuccess: () => {
      null;
    },
    fetchPostCreatePinjamanFailed: (
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
export const fetchPinjamanDisetujuiData = createAction<number>(
  'fetchPinjamanDisetujuiData',
);
export const fetchPinjamanDitolakData = createAction<number>(
  'fetchPinjamanDitolakData',
);
export const fetchPinjamanDisetujuiDetailData = createAction<number>(
  'fetchPinjamanDisetujuiDetailData',
);
export const fetchPinjamanStep1 = createAction('fetchPinjamanStep1');
export const fetchPinjamanStep2 = createAction('fetchPinjamanStep2');
export const fetchPinjamanStep3 =
  createAction<PinjamanStep2Data>('fetchPinjamanStep3');
export const fetchPinjamanStep4 =
  createAction<PinjamanStep3Data>('fetchPinjamanStep4');
export const fetchPatchCreatePinjaman = createAction<CreatePinjamanRequest>(
  'fetchPatchCreatePinjaman',
);
export const fetchPinjamanSummary = createAction<CreatePinjamanInfo>(
  'fetchPinjamanSummary',
);
export const fetchPostCreatePinjaman = createAction<CreatePinjamanInfo>(
  'fetchPostCreatePinjaman',
);

export const {
  setPinjamanInfo,
  getPinjamanInitialDataSuccess,
  getPinjamanInitialDataFailed,
  getPinjamanDisetujuiFailed,
  getPinjamanDisetujuiSuccess,
  getPinjamanDitolakFailed,
  getPinjamanDitolakSuccess,
  getPinjamanDisetujuiDetailFailed,
  getPinjamanDisetujuiDetailSuccess,
  fetchPinjamanStep1Failed,
  fetchPinjamanStep1Success,
  fetchPinjamanStep2Failed,
  fetchPinjamanStep2Success,
  fetchPinjamanStep3Failed,
  fetchPinjamanStep3Success,
  fetchPinjamanStep4Failed,
  fetchPinjamanStep4Success,
  fetchPatchCreatePinjamanFailed,
  fetchPatchCreatePinjamanSuccess,
  fetchPinjamanSummaryFailed,
  fetchPinjamanSummarySuccess,
  fetchPostCreatePinjamanFailed,
  fetchPostCreatePinjamanSuccess,
} = pinjamanSlice.actions;

export default pinjamanSlice.reducer;
