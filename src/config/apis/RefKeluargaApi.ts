import HttpService from '../services/HttpService';
import { AxiosResponse } from 'axios';
import { apis } from '../../constants';
import { RefKeluargaRequest } from '../../redux/reducers/RefKeluargaReducer';

/**
 * Handles API call related to diagnostic
 * @class
 */
class RefKeluargaApi {
  /**
   * Retrieve Alamat List
   *
   * @returns { Object } Promise either resolve or rejected
   */
  static async getRefKeluargaList(): Promise<AxiosResponse> {
    const resp = await HttpService.get(apis.endpoints.keluarga.keluarga);
    return resp;
  }

  /**
   * Submit new alamat
   *
   * @param data Contains
   * @returns { Object } Promise either resolve or rejected
   */
  static async submitRefKeluarga(
    data: RefKeluargaRequest,
  ): Promise<AxiosResponse> {
    const resp = await HttpService.post(apis.endpoints.keluarga.keluarga, data);
    return resp;
  }

  /**
   * Update existing alamat
   *
   * @param data Contains
   * @returns { Object } Promise either resolve or rejected
   */
  static async updateRefKeluarga({
    data,
    id,
  }: {
    data: RefKeluargaRequest;
    id: number;
  }): Promise<AxiosResponse> {
    const resp = await HttpService.patch(
      `${apis.endpoints.keluarga.keluarga}/${id}`,
      data,
    );
    return resp;
  }
}

export default RefKeluargaApi;
