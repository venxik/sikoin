import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dokumenDataList: [
    {
      id: 1,
      tipeFile: 'pdf',
      namaFile: 'Data_Anggota.pdf',
      pemilik: 'Bahram Ishat',
      tglDibuat: Date.now(),
      lokasiFile: 'Dokumen - Data Anggota',
      ukuran: '2.3 MB',
      izin: 'Umum',
      memberAkses: [
        {
          id: 1,
          profilePic: 'https://picsum.photos/200/300',
          namaMember: 'Agus',
        },
        {
          id: 2,
          profilePic: 'https://picsum.photos/id/227/200/300',
          namaMember: 'Budi',
        },
        {
          id: 3,
          profilePic: 'https://picsum.photos/id/21/200/300',
          namaMember: 'Teteh',
        },
        {
          id: 4,
          profilePic: 'https://picsum.photos/id/7/200/300',
          namaMember: 'Imah',
        },
      ],
    },
    {
      id: 2,
      tipeFile: 'jpg',
      namaFile: 'Data_Anggota.jpg',
      pemilik: 'Agus Bahrim',
      tglDibuat: Date.now(),
      lokasiFile: 'Dokumen - Data Anggota',
      ukuran: '2.3 MB',
      izin: 'Umum',
      memberAkses: [
        {
          id: 1,
          profilePic: 'https://picsum.photos/200/300',
          namaMember: 'Agus',
        },
        {
          id: 2,
          profilePic: 'https://picsum.photos/id/227/200/300',
          namaMember: 'Budi',
        },
        {
          id: 3,
          profilePic: 'https://picsum.photos/id/21/200/300',
          namaMember: 'Teteh',
        },
        {
          id: 4,
          profilePic: 'https://picsum.photos/id/7/200/300',
          namaMember: 'Imah',
        },
      ],
    },
    {
      id: 3,
      tipeFile: 'xls',
      namaFile: 'Data_Anggota.xls',
      pemilik: 'Joni Egol',
      tglDibuat: Date.now(),
      lokasiFile: 'Dokumen - Data Anggota',
      ukuran: '2.3 MB',
      izin: 'Umum',
      memberAkses: [
        {
          id: 1,
          profilePic: 'https://picsum.photos/200/300',
          namaMember: 'Agus',
        },
        {
          id: 2,
          profilePic: 'https://picsum.photos/id/227/200/300',
          namaMember: 'Budi',
        },
        {
          id: 3,
          profilePic: 'https://picsum.photos/id/21/200/300',
          namaMember: 'Teteh',
        },
        {
          id: 4,
          profilePic: 'https://picsum.photos/id/7/200/300',
          namaMember: 'Imah',
        },
      ],
    },
    {
      id: 4,
      tipeFile: 'word',
      namaFile: 'Data_Anggota.doc',
      pemilik: 'bambnang Sutirsna',
      tglDibuat: Date.now(),
      lokasiFile: 'Dokumen - Data Anggota',
      ukuran: '2.3 MB',
      izin: 'Umum',
      memberAkses: [
        {
          id: 1,
          profilePic: 'https://picsum.photos/200/300',
          namaMember: 'Agus',
        },
        {
          id: 2,
          profilePic: 'https://picsum.photos/id/227/200/300',
          namaMember: 'Budi',
        },
        {
          id: 3,
          profilePic: 'https://picsum.photos/id/21/200/300',
          namaMember: 'Teteh',
        },
        {
          id: 4,
          profilePic: 'https://picsum.photos/id/7/200/300',
          namaMember: 'Imah',
        },
      ],
    },
    {
      id: 5,
      tipeFile: 'other',
      namaFile: 'Data_Anggota.other',
      pemilik: 'Megaman',
      tglDibuat: Date.now(),
      lokasiFile: 'Dokumen - Data Anggota',
      ukuran: '2.3 MB',
      izin: 'Umum',
      memberAkses: [
        {
          id: 1,
          profilePic: 'https://picsum.photos/200/300',
          namaMember: 'Agus',
        },
        {
          id: 2,
          profilePic: 'https://picsum.photos/id/227/200/300',
          namaMember: 'Budi',
        },
        {
          id: 3,
          profilePic: 'https://picsum.photos/id/21/200/300',
          namaMember: 'Teteh',
        },
        {
          id: 4,
          profilePic: 'https://picsum.photos/id/7/200/300',
          namaMember: 'Imah',
        },
      ],
    },
  ],
  error: null,
};

const dokumenSlice = createSlice({
  name: 'dokumenSlice',
  initialState,
  reducers: {
    fetchDokumen: () => {},
    fetchDokumenSuccess: (state, { payload }) => {
      state.dokumenDataList = payload;
    },
    fetchDokumenFailed: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { fetchDokumen, fetchDokumenFailed, fetchDokumenSuccess } =
  dokumenSlice.actions;

export default dokumenSlice.reducer;
