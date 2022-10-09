import HttpService from '../services/HttpService';
import { AxiosResponse } from 'axios';
import { apis } from '../../constants';

/**
 * Handles API call related to diagnostic
 * @class
 */
class NotifikasiApi {
  static async getAllNotifikasi(): Promise<AxiosResponse> {
    const resp = await HttpService.get(apis.endpoints.notifikasi.getNotifikasi);
    return resp;
  }

  static async getNotifikasiDetail(id: number): Promise<AxiosResponse> {
    const resp = await HttpService.get(
      `${apis.endpoints.notifikasi.getNotifikasi}/${id}`,
    );
    return resp;
  }
}

export default NotifikasiApi;
