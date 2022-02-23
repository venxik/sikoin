import NetInfo from '@react-native-community/netinfo';
import { apis, storage } from 'constants';
import axios from 'axios';

import { showErrorModal } from 'reducers/ErrorModalReducer';
import { hideLoading } from 'reducers/LoadingReducer';
// import { getEncryptedStorage } from 'utils/encryptedStorage';
import { store } from 'config/store/ReduxStore';

let instance = null;

class HttpService {
  constructor() {
    if (instance) {
      return instance;
    }

    instance = this;
    const http = axios.create({
      baseURL: apis.baseURL,
      // timeout: 1000,
      headers: {
        Accept: apis.acceptHeader,
      },
    });

    // setup interceptor for http request
    http.interceptors.request.use(this.handleRequestInterceptor);

    // setup interceptor for http response
    http.interceptors.response.use(
      // success response
      response => response,
      // error response
      this.handleResponseInterceptor,
    );

    this.http = http;
    this.inFlightAuthRequest = null;
    this.apiMode = 'httpClient';
  }

  setApiMode = mode => {
    this.apiMode = mode;
  };

  // Request interceptor to add auth bearer token to request header
  handleRequestInterceptor = async request => {
    const requestURL = request.url;
    // apply only if the request needs an access token
    // if (apis.authPathArray.some((substring) => !requestURL.includes(substring))) {
    //   let accessToken = '';
    //   accessToken = await getEncryptedStorage(storage.accessTokenKey);
    //   if (accessToken !== '' || accessToken !== null) {
    //     request.headers.Authorization = `Bearer ${accessToken}`;
    //   }
    //   return request;
    // }
    return request;
  };

  // Response interceptor to manage token refresh
  handleResponseInterceptor = error => {
    const responseURL = error.response.config.url; // holds full URL
    // store.dispatch(hideLoading());
    // if (apis.authPathArray.some((substring) => !responseURL.includes(substring))) {
    //   store.dispatch(hideLoading());
    //   switch (error.response.status) {
    //     case 400:
    //       this.showErrorDialogHandler(apis.errorTypes.badRequest);
    //       return Promise.reject(new Error(1));
    //     case 401:
    //       // redirect to login screen
    //       this.showErrorDialogHandler(apis.errorTypes.unauthorized);
    //       return Promise.reject(new Error(1));
    //     case 403:
    //       this.showErrorDialogHandler(apis.errorTypes.forbidden);
    //       return Promise.reject(new Error(1));
    //     case 405:
    //       this.showErrorDialogHandler(apis.errorTypes.methodNotAllowed);
    //       return Promise.reject(new Error(1));
    //     case 415:
    //       this.showErrorDialogHandler(apis.errorTypes.unsupported);
    //       return Promise.reject(new Error(1));
    //     case 422:
    //       this.showErrorDialogHandler(apis.errorTypes.unprocessable);
    //       return Promise.reject(new Error(1));
    //     case 500:
    //       this.showErrorDialogHandler(apis.errorTypes.serverError);
    //       return Promise.reject(new Error(1));
    //     default:
    //       return Promise.reject(error.response);
    //   }
    // }

    return Promise.reject(error.response);
  };

  showErrorDialogHandler = errorType => {
    store.dispatch(
      showErrorModal({
        options: {
          screenSource: 'HttpService',
          errorType,
        },
      }),
    );
  };

  // Perform a get http call
  get = (url, payload, conf = {}) => {
    const config = {
      method: 'get',
      url,
      params: payload,
      ...conf,
    };
    return NetInfo.fetch()
      .then(state => {
        if (state.isConnected) {
          return this.http.request(config);
        }
        return Promise.reject(new Error('Network Error'));
      })
      .then(response => this.handleSuccessResponse(response))
      .catch(error => this.handleFailResponse(error));
  };

  // Perform a post http call
  post = (url, payload, conf = {}) => {
    const config = {
      method: 'POST',
      url,
      data: payload,
      ...conf,
    };

    return NetInfo.fetch()
      .then(state => {
        if (state.isConnected) {
          return this.http.request(config);
        }
        return Promise.reject(new Error('Network Error'));
      })
      .then(response => this.handleSuccessResponse(response))
      .catch(error => this.handleFailResponse(error));
  };

  put = (url, payload = {}, conf = {}) => {
    const config = {
      method: 'PUT',
      url,
      data: payload,
      ...conf,
    };

    return NetInfo.fetch()
      .then(state => {
        if (state.isConnected) {
          return this.http.request(config);
        }
        return Promise.reject(new Error('Network Error'));
      })
      .then(response => this.handleSuccessResponse(response))
      .catch(error => this.handleFailResponse(error));
  };

  delete = (url, payload = {}, conf = {}) => {
    const config = {
      method: 'DELETE',
      url,
      data: payload,
      ...conf,
    };

    return NetInfo.fetch()
      .then(state => {
        if (state.isConnected) {
          return this.http.request(config);
        }
        return Promise.reject(new Error('Network Error'));
      })
      .then(response => this.handleSuccessResponse(response))
      .catch(error => this.handleFailResponse(error));
  };

  handleSuccessResponse = response => response;

  handleFailResponse = error => error;
}

export default new HttpService();
