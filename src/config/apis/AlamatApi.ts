import HttpService from '../services/HttpService';
import { AxiosResponse } from 'axios';
import { apis } from '../../constants';
import { AlamatDataRequest } from '../../redux/reducers/AlamatReducer';

/**
 * Handles API call related to diagnostic
 * @class
 */
class AlamatApi {
  /**
   * Retrieve Alamat List
   *
   * @returns { Object } Promise either resolve or rejected
   */
  static async getAlamatList(): Promise<AxiosResponse> {
    const resp = await HttpService.get(apis.endpoints.alamat.alamat);
    return resp;
  }

  /**
   * Submit new alamat
   *
   * @param data Contains
   * @returns { Object } Promise either resolve or rejected
   */
  static async submitAlamat(data: AlamatDataRequest): Promise<AxiosResponse> {
    const resp = await HttpService.post(apis.endpoints.alamat.alamat, data);
    return resp;
  }

  /**
   * Update existing alamat
   *
   * @param data Contains
   * @returns { Object } Promise either resolve or rejected
   */
  static async updateAlamat(data: AlamatDataRequest): Promise<AxiosResponse> {
    const resp = await HttpService.patch(apis.endpoints.alamat.alamat, data);
    return resp;
  }
}

export default AlamatApi;
