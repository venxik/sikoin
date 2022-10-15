import { AxiosResponse } from 'axios';

import { apis } from '../../constants';
import { BiodataResponse } from '../../redux/reducers/BiodataReducer';
import HttpService from '../services/HttpService';

/**
 * Handles API call related to diagnostic
 * @class
 */
class BiodataApi {
  /**
   * Retrieve biodata
   *
   * @returns { Object } Promise either resolve or rejected
   */
  static async getBiodata(): Promise<AxiosResponse> {
    const resp = await HttpService.get(apis.endpoints.biodata.biodata);
    return resp;
  }

  /**
   * Update biodata
   *
   * @param data Contains
   * @returns { Object } Promise either resolve or rejected
   */
  static async updateBiodata(data: BiodataResponse): Promise<AxiosResponse> {
    const resp = await HttpService.patch(apis.endpoints.biodata.biodata, data);
    return resp;
  }
}

export default BiodataApi;
