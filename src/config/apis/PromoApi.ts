import HttpService from '../services/HttpService';
import { AxiosResponse } from 'axios';
import { apis } from '../../constants';

/**
 * Handles API call related to diagnostic
 * @class
 */
class PromoApi {
  static async getAllPromo(): Promise<AxiosResponse> {
    const resp = await HttpService.get(apis.endpoints.promo.getPromo);
    return resp;
  }
  static async getPromoDetail(id: number): Promise<AxiosResponse> {
    const resp = await HttpService.get(
      `${apis.endpoints.promo.getPromo}/${id}`,
    );
    return resp;
  }
}

export default PromoApi;
