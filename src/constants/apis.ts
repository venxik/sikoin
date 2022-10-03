import Config from 'react-native-config';

const constant = {
  acceptHeader: '*/*',
  endpoints: {
    login: {
      koperasi: 'koperasi',
      emailAnggota: 'email-anggota',
      forgotPassword: 'lupa-password',
      login: 'login',
    },
    alamat: {
      alamat: 'daftar-alamat',
    },
    home: {
      beranda: 'beranda-user',
    },
    keluarga: {
      keluarga: 'ref-keluarga',
    },
    profile: {
      profile: 'profile-user',
    },
    biodata: {
      biodata: 'biodata',
    },
    pekerjaan: {
      pekerjaan: 'pekerjaan',
    },
    chat: 'kirim-pesan',
    saldo: {
      saldo: 'top-up',
      createSaldoList: 'top-up/create',
    },
    simpanan: {
      simpanan: 'simpanan',
      createSimpananList: 'simpanan/create',
      mutasiSimpanan: 'mutasi-simpanan',
    },
    ktpDokumen: {
      ktpDokumen: 'ktp-dokumen',
    },
    pinjaman: {
      getPinjaman: 'pinjaman',
      disetujui: 'pinjaman-disetujui',
      ditolak: 'pinjaman-ditolak',
      detailDisetujui: 'detail-pinjaman-disetujui',
      step1: 'pengajuan-pinjaman-data-pengguna',
      step2: 'pengajuan-pinjaman-biodata',
      step3: 'pengajuan-pinjaman-pekerjaan',
      step4: 'pengajuan-pinjaman-ktp-dokumen',
      create: 'pengajuan-pinjaman/create',
      summary: 'pengajuan-pinjaman/summary',
    },
  },
  errorTypes: {
    generic: 'Oops!',
    serverUnreachable: 'Server Unreachable',
    networkError: 'Network Error', // no internet
    badRequest: 'Bad Request', // 400
    unauthorized: 'Unauthorized', // 401
    forbidden: 'Forbidden', // 403
    notFound: ' Not Found', // 404
    methodNotAllowed: 'methodNotAllowed', // 405
    conflict: 'Conflict', // 409
    unsupported: 'Unsupported Type', // 415
    unprocessable: 'Unprocessable Entity', // 422
    serverError: 'Internal server error', // 500
  },
  authPathArray: ['koperasi', 'email-anggota', 'lupa-password', 'login'],
};

const API = {
  baseURL: Config.BASE_API_URL,
  ...constant,
};

export { API as default };
