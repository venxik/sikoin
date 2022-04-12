import Config from 'react-native-config';

const constant = {
  acceptHeader: '*/*',
  endpoints: {
    login: {
      koperasi: '/api/koperasi',
      emailAnggota: '/api/email-anggota',
      forgotPassword: '/api/lupa-password',
      login: '/api/login',
    },
    alamat: {
      alamat: '/api/daftar-alamat',
    },
    home: {
      beranda: '/api/beranda-user',
    },
    keluarga: {
      keluarga: '/api/ref-keluarga',
    },
    profile: {
      profile: '/api/profile-user',
    },
    biodata: {
      biodata: '/api/biodata',
    },
    pekerjaan: {
      pekerjaan: '/api/pekerjaan',
    },
  },
  errorTypes: {
    generic: 'Error',
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
  authPathArray: [
    '/api/koperasi',
    '/api/email-anggota',
    '/api/lupa-password',
    '/api/login',
  ],
};

const API = {
  baseURL: Config.BASE_API_URL,
  ...constant,
};

export { API as default };
