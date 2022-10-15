import { AxiosResponse } from 'axios';

import { apis } from '../../constants';
import { RefKeluargaResponse } from '../../redux/reducers/RefKeluargaReducer';
import HttpService from '../services/HttpService';

/**
 * Handles API call related to diagnostic
 * @class
 */
class RefKeluargaApi {
  /**
   * Retrieve Referensi Keluarga List
   *
   * @returns { Object } Promise either resolve or rejected
   */
  static async getRefKeluargaList(): Promise<AxiosResponse> {
    const resp = await HttpService.get(apis.endpoints.keluarga.keluarga);
    return resp;
  }

  /**
   * Submit new Referensi Keluarga
   *
   * @param data Contains
   * @returns { Object } Promise either resolve or rejected
   */
  static async submitRefKeluarga(data: RefKeluargaResponse): Promise<AxiosResponse> {
    const resp = await HttpService.post(apis.endpoints.keluarga.keluarga, data);
    return resp;
  }

  /**
   * Update existing Referensi Keluarga
   *
   * @param data Contains
   * @returns { Object } Promise either resolve or rejected
   */
  static async updateRefKeluarga({
    data,
    id,
  }: {
    data: RefKeluargaResponse;
    id: number;
  }): Promise<AxiosResponse> {
    const resp = await HttpService.patch(`${apis.endpoints.keluarga.keluarga}/${id}`, data);
    return resp;
  }

  /**
   * Delete existing Referensi Keluarga
   *
   * @param data Contains
   * @returns { Object } Promise either resolve or rejected
   */
  static async deleteRefKeluarga(id: number): Promise<AxiosResponse> {
    const resp = await HttpService.delete(`${apis.endpoints.keluarga.keluarga}/${id}`);
    return resp;
  }
}

export default RefKeluargaApi;
