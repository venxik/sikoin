import { AxiosResponse } from 'axios';

import { apis } from '../../constants';
import { AlamatDataResponse } from '../../redux/reducers/AlamatReducer';
import HttpService from '../services/HttpService';

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
  static async submitAlamat(data: AlamatDataResponse): Promise<AxiosResponse> {
    const resp = await HttpService.post(apis.endpoints.alamat.alamat, data);
    return resp;
  }

  /**
   * Update existing alamat
   *
   * @param data Contains
   * @returns { Object } Promise either resolve or rejected
   */
  static async updateAlamat({
    data,
    id,
  }: {
    data: AlamatDataResponse;
    id: number;
  }): Promise<AxiosResponse> {
    const resp = await HttpService.patch(`${apis.endpoints.alamat.alamat}/${id}`, data);
    return resp;
  }

  /**
   * Delete existing alamat
   *
   * @param data Contains
   * @returns { Object } Promise either resolve or rejected
   */
  static async deleteAlamat(id: number): Promise<AxiosResponse> {
    const resp = await HttpService.delete(`${apis.endpoints.alamat.alamat}/${id}`);
    return resp;
  }

  static async getCityProvince(): Promise<AxiosResponse> {
    const resp = await HttpService.get(apis.endpoints.alamat.getCityProvince);
    return resp;
  }
}

export default AlamatApi;
