import { createSlice } from '@reduxjs/toolkit';

export type KabarData = {
  title: string;
  company: string;
  profilePic: string;
  content: string;
  name: string;
  timestamp: Date | number | string;
  fullContent: string;
};

interface RootState {
  kabarDataList: KabarData[];
  error: object | undefined | null;
}

const initialState: RootState = {
  kabarDataList: [
    {
      title: 'Jababeka Bakal Terbitkan Obligasi Global Rp 5,06 Triliun',
      company: 'Jababeka & co',
      profilePic: 'https://picsum.photos/400/400',
      content:
        'Realisasi belanja pemerintah membeli produk UMKM telah mencapai 70 persen dari target Rp 447,28 triliun.',
      name: 'Achmad Ega',
      timestamp: Date.now(),
      fullContent:
        'PT Kawasan Industri Jababeka Tbk (KIJA) melalui Jababeka International B.V akan menerbitkan surat utang atau obligasi global sebanyak-banyaknya USD 350 juta atau sekitar Rp 5,05 triliun (asumsi kurs Rp 14.472 per dolar AS). PT Kawasan Industri Jababeka Tbk akan memakai dana tersebut untuk melakukan penukaran, pembelian kembali dan atau pembayaran atas surat utang lama. Selain itu, perseroan juga akan gunakan penerbitan obligasi tersebut untuk mendukung pertumbuhan kelompok usaha perseroan pada masa yang akan datang. Perseroan berharap dengan penerbitan obligasi ini dapat memperbaiki profil jatuh tempo pinjaman dan mengurangi risiko kredit perseroan. Selain itu, perseroan juga dapat memperoleh efisiensi dengan melunasi atas pinjaman yang diterima perseroan dan kelompok entitas anak. "Selain itu, surat utang baru juga akan digunakan untuk membiayai kegiatan umum perseroan yang akan meningkatkan likuiditas dan keuntungan perseroan,” tulis perseroan yang dikutip dari keterbukaan informasi BEI, Sabtu (24/7/2021).',
    },
    {
      title: 'Jababeka Bakal Terbitkan Obligasi Global Rp 5,06 Triliun',
      company: 'Jababeka & co',
      profilePic: 'https://picsum.photos/400/400',
      content:
        'Realisasi belanja pemerintah membeli produk UMKM telah mencapai 70 persen dari target Rp 447,28 triliun.',
      name: 'Achmad Ega',
      timestamp: Date.now(),
      fullContent:
        'PT Kawasan Industri Jababeka Tbk (KIJA) melalui Jababeka International B.V akan menerbitkan surat utang atau obligasi global sebanyak-banyaknya USD 350 juta atau sekitar Rp 5,05 triliun (asumsi kurs Rp 14.472 per dolar AS). PT Kawasan Industri Jababeka Tbk akan memakai dana tersebut untuk melakukan penukaran, pembelian kembali dan atau pembayaran atas surat utang lama. Selain itu, perseroan juga akan gunakan penerbitan obligasi tersebut untuk mendukung pertumbuhan kelompok usaha perseroan pada masa yang akan datang. Perseroan berharap dengan penerbitan obligasi ini dapat memperbaiki profil jatuh tempo pinjaman dan mengurangi risiko kredit perseroan. Selain itu, perseroan juga dapat memperoleh efisiensi dengan melunasi atas pinjaman yang diterima perseroan dan kelompok entitas anak. "Selain itu, surat utang baru juga akan digunakan untuk membiayai kegiatan umum perseroan yang akan meningkatkan likuiditas dan keuntungan perseroan,” tulis perseroan yang dikutip dari keterbukaan informasi BEI, Sabtu (24/7/2021).',
    },
    {
      title: 'Jababeka Bakal Terbitkan Obligasi Global Rp 5,06 Triliun',
      company: 'Jababeka & co',
      profilePic: 'https://picsum.photos/400/400',
      content:
        'Realisasi belanja pemerintah membeli produk UMKM telah mencapai 70 persen dari target Rp 447,28 triliun.',
      name: 'Achmad Ega',
      timestamp: Date.now(),
      fullContent:
        'PT Kawasan Industri Jababeka Tbk (KIJA) melalui Jababeka International B.V akan menerbitkan surat utang atau obligasi global sebanyak-banyaknya USD 350 juta atau sekitar Rp 5,05 triliun (asumsi kurs Rp 14.472 per dolar AS). PT Kawasan Industri Jababeka Tbk akan memakai dana tersebut untuk melakukan penukaran, pembelian kembali dan atau pembayaran atas surat utang lama. Selain itu, perseroan juga akan gunakan penerbitan obligasi tersebut untuk mendukung pertumbuhan kelompok usaha perseroan pada masa yang akan datang. Perseroan berharap dengan penerbitan obligasi ini dapat memperbaiki profil jatuh tempo pinjaman dan mengurangi risiko kredit perseroan. Selain itu, perseroan juga dapat memperoleh efisiensi dengan melunasi atas pinjaman yang diterima perseroan dan kelompok entitas anak. "Selain itu, surat utang baru juga akan digunakan untuk membiayai kegiatan umum perseroan yang akan meningkatkan likuiditas dan keuntungan perseroan,” tulis perseroan yang dikutip dari keterbukaan informasi BEI, Sabtu (24/7/2021).',
    },
  ],
  error: null,
};

const kabarSlice = createSlice({
  name: 'kabarSlice',
  initialState,
  reducers: {
    fetchKabar: (state, { payload }) => {
      state.kabarDataList = payload;
    },
    fetchKabarSuccess: (state, { payload }) => {
      state.kabarDataList = payload;
    },
    fetchKabarFailed: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { fetchKabarSuccess, fetchKabarFailed, fetchKabar } =
  kabarSlice.actions;

export default kabarSlice.reducer;
