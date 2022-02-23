import Config from 'react-native-config';

const constant = {
  acceptHeader: '*/*',
  endpoints: {
    comments: 'comments',
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
};

const API = {
  baseURL: 'https://jsonplaceholder.typicode.com/',
  test: Config.API_URL,
  ...constant,
};

export { API as default };
