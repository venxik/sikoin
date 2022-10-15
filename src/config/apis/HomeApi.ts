import { AxiosResponse } from 'axios';

import { apis } from '../../constants';
import HttpService from '../services/HttpService';

/**
 * Handles API call related to diagnostic
 * @class
 */
class HomeApi {
  /**
   * Retrieve Home Beranda Data
   *
   * @returns { Object } Promise either resolve or rejected
   */
  static async getBerandaData(): Promise<AxiosResponse> {
    const resp = await HttpService.get(apis.endpoints.home.beranda);
    return resp;
  }
}

export default HomeApi;
