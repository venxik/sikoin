import HttpService from '../services/HttpService';
import { AxiosResponse } from 'axios';
import { apis } from '../../constants';

/**
 * Handles API call related to diagnostic
 * @class
 */
class KabarApi {
  static async getAllKabar(): Promise<AxiosResponse> {
    const resp = await HttpService.get(apis.endpoints.kabar.getKabar);
    return resp;
  }
  static async getKabarDetail(id: number): Promise<AxiosResponse> {
    const resp = await HttpService.get(
      `${apis.endpoints.kabar.getKabar}/${id}`,
    );
    return resp;
  }
}

export default KabarApi;
