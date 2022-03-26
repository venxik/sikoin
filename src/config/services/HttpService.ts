import NetInfo from '@react-native-community/netinfo';
import { apis } from '../../constants';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { showErrorModal } from '../../redux/reducers/ErrorModalReducer';
// import { getEncryptedStorage } from 'utils/encryptedStorage';
import { store } from '../store/ReduxStore';

class HttpService {
  http: AxiosInstance = axios;
  constructor() {
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
  }

  // Request interceptor to add auth bearer token to request header
  handleRequestInterceptor = async (request: AxiosRequestConfig) => {
    // const requestURL = request.url;
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
  handleResponseInterceptor = (response: AxiosResponse) => {
    // const responseURL = response.config.url;
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
    //     default:
    //       return Promise.reject(error.response);
    //   }
    // }
    return Promise.reject(response);
  };

  showErrorDialogHandler = (errorType: string) => {
    store.dispatch(
      showErrorModal({
        options: {
          screenSource: 'HttpService',
          errorType,
        },
      }),
    );
  };

  get = (
    url: string,
    params?: AxiosRequestConfig,
    conf?: AxiosRequestConfig,
  ) => {
    const config: AxiosRequestConfig = {
      method: 'get',
      url,
      params,
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

  post = (
    url: string,
    params?: AxiosRequestConfig['data'],
    conf?: AxiosRequestConfig,
  ) => {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url,
      data: params,
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

  put = (
    url: string,
    params?: AxiosRequestConfig['data'],
    conf?: AxiosRequestConfig,
  ) => {
    const config: AxiosRequestConfig = {
      method: 'PUT',
      url,
      data: params,
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

  delete = (
    url: string,
    params?: AxiosRequestConfig['data'],
    conf?: AxiosRequestConfig,
  ) => {
    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url,
      data: params,
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

  handleSuccessResponse = (response: AxiosResponse) => response;

  handleFailResponse = (response: AxiosResponse) => response;
}

export default new HttpService();
