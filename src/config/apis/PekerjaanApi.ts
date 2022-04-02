import HttpService from '../services/HttpService';
import { AxiosResponse } from 'axios';
import { apis } from '../../constants';
import { PekerjaanResponse } from '../../redux/reducers/PekerjaanReducer';

/**
 * Handles API call related to diagnostic
 * @class
 */
class PekerjaanApi {
  /**
   * Retrieve pekerjaan
   *
   * @returns { Object } Promise either resolve or rejected
   */
  static async getPekerjaan(): Promise<AxiosResponse> {
    const resp = await HttpService.get(apis.endpoints.pekerjaan.pekerjaan);
    return resp;
  }

  /**
   * Update pekerjaan
   *
   * @param data Contains
   * @returns { Object } Promise either resolve or rejected
   */
  static async updatePekerjaan(
    data: PekerjaanResponse,
  ): Promise<AxiosResponse> {
    const resp = await HttpService.patch(
      apis.endpoints.pekerjaan.pekerjaan,
      data,
    );
    return resp;
  }
}

export default PekerjaanApi;
