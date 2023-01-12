import NetInfo from '@react-native-community/netinfo';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { apis, storage } from '../../constants';
import { showErrorModal } from '../../redux/reducers/ErrorModalReducer';
import { resetUserData } from '../../redux/reducers/HomeReducer';
import { hideLoading } from '../../redux/reducers/LoadingReducer';
import { getEncryptedStorage } from '../../utils';
import { navigateAndReset } from '../navigation';
// import { getEncryptedStorage } from 'utils/encryptedStorage';
import { store } from '../store';

let instance: HttpService | null = null;

class HttpService {
  instance = null;

  http: AxiosInstance = axios;

  constructor() {
    if (instance) {
      return instance;
    }

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    instance = this;

    const http = axios.create({
      transitional: { forcedJSONParsing: true },
      baseURL: apis.baseURL,
      // timeout: 1000,
      headers: {
        Accept: apis.acceptHeader,
        'Content-Type': 'application/json',
      },
    });

    // setup interceptor for http request
    http.interceptors.request.use(this.handleRequestInterceptor);

    // setup interceptor for http response
    http.interceptors.response.use(
      // success response
      this.handleResponseInterceptor,
      // error response
      this.handleErrorInterceptor,
    );

    this.http = http;
  }

  // Request interceptor to add auth bearer token to request header
  handleRequestInterceptor = async (request: AxiosRequestConfig) => {
    const requestURL = request.url;
    // apply only if the request needs an access token
    if (apis.authPathArray.some((substring) => !requestURL?.includes(substring))) {
      let accessToken: null | string = null;
      accessToken = await getEncryptedStorage(storage.authCode);
      if (!request?.headers) {
        throw new Error("Expected 'config' and 'config.headers' not to be undefined");
      }
      if (accessToken !== '' || accessToken !== null) {
        request.headers.Authorization = `Bearer ${accessToken}`;
      }
      return request;
    }
    return request;
  };

  // Response interceptor to manage error message
  handleResponseInterceptor = (response: AxiosResponse) => {
    store.dispatch(hideLoading());
    const error = response.data.error;
    const url = response?.request?.responseURL as string;
    if (error) {
      if (url?.includes('api/version')) return;
      else if (url?.includes('api/koperasi'))
        this.showErrorDialogHandler(apis.errorTypes.anggotaTerdaftar, error);
      else if (url?.includes('api/simpanan'))
        if (url?.includes('api/simpanan/create'))
          this.showErrorDialogHandler(apis.errorTypes.inputNoRek, error);
        else this.showErrorDialogHandler(apis.errorTypes.penarikanGagal, error);
      else this.showErrorDialogHandler(apis.errorTypes.generic, error);
    }
    return response;
  };

  // Response interceptor to manage token refresh
  handleErrorInterceptor = (error: AxiosError) => {
    store.dispatch(hideLoading());
    const url = error.request?.responseURL as string;
    if (url?.includes('api/version')) return;
    switch (error.response?.status) {
      case 400:
        this.showErrorDialogHandler(apis.errorTypes.badRequest, error.response?.data?.error);
        break;
      case 401:
        if (url?.includes('login')) {
          this.showErrorDialogHandler(apis.errorTypes.unauthorized, error.response?.data?.error);
        } else {
          store.dispatch(resetUserData());
          navigateAndReset('LoginScreen');
        }
        break;
      default:
        this.showErrorDialogHandler(apis.errorTypes.generic, error.response?.data?.error);
        break;
    }
    return Promise.reject();
  };

  showErrorDialogHandler = (errorType: string, errorMessage?: string) => {
    store.dispatch(
      showErrorModal({
        options: {
          screenSource: 'HttpService',
          errorType,
        },
        error: {
          title: 'Error',
          message: errorMessage as string,
        },
      }),
    );
  };

  get = (url: string, params?: AxiosRequestConfig, conf?: AxiosRequestConfig) => {
    const config: AxiosRequestConfig = {
      method: 'get',
      url,
      params,
      ...conf,
    };
    return NetInfo.fetch()
      .then((state) => {
        if (state.isConnected) {
          return this.http.request(config);
        }
        return Promise.reject(new Error('Network Error'));
      })
      .then((response) => this.handleSuccessResponse(response))
      .catch((error) => this.handleFailResponse(error));
  };

  post = (url: string, params?: AxiosRequestConfig['data'], conf?: AxiosRequestConfig) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url,
      data: params,
      ...conf,
    };

    return NetInfo.fetch()
      .then((state) => {
        if (state.isConnected) {
          return this.http.request(config);
        }
        return Promise.reject(new Error('Network Error'));
      })
      .then((response) => this.handleSuccessResponse(response))
      .catch((error) => this.handleFailResponse(error));
  };

  patch = (url: string, params?: AxiosRequestConfig['data'], conf?: AxiosRequestConfig) => {
    const config: AxiosRequestConfig = {
      method: 'patch',
      url,
      data: params,
      ...conf,
    };

    return NetInfo.fetch()
      .then((state) => {
        if (state.isConnected) {
          return this.http.request(config);
        }
        return Promise.reject(new Error('Network Error'));
      })
      .then((response) => this.handleSuccessResponse(response))
      .catch((error) => this.handleFailResponse(error));
  };

  put = (url: string, params?: AxiosRequestConfig['data'], conf?: AxiosRequestConfig) => {
    const config: AxiosRequestConfig = {
      method: 'put',
      url,
      data: params,
      ...conf,
    };

    return NetInfo.fetch()
      .then((state) => {
        if (state.isConnected) {
          return this.http.request(config);
        }
        return Promise.reject(new Error('Network Error'));
      })
      .then((response) => this.handleSuccessResponse(response))
      .catch((error) => this.handleFailResponse(error));
  };

  delete = (url: string, params?: AxiosRequestConfig['data'], conf?: AxiosRequestConfig) => {
    const config: AxiosRequestConfig = {
      method: 'delete',
      url,
      data: params,
      ...conf,
    };

    return NetInfo.fetch()
      .then((state) => {
        if (state.isConnected) {
          return this.http.request(config);
        }
        return Promise.reject(new Error('Network Error'));
      })
      .then((response) => this.handleSuccessResponse(response))
      .catch((error) => this.handleFailResponse(error));
  };

  handleSuccessResponse = (response: AxiosResponse) => response;

  handleFailResponse = (response: AxiosResponse) => response;
}

export default new HttpService();
