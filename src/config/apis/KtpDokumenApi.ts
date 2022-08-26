import HttpService from '../services/HttpService';
import { AxiosResponse } from 'axios';
import { apis } from '../../constants';

/**
 * Handles API call related to diagnostic
 * @class
 */
class KtpDokumenApi {
  /**
   * Retrieve KTP Data
   *
   * @returns { Object } Promise either resolve or rejected
   */
  static async getKtpData(): Promise<AxiosResponse> {
    const resp = await HttpService.get(apis.endpoints.ktpDokumen.ktpDokumen);
    return resp;
  }

  static async uploadGambarKtp(data: FormData): Promise<AxiosResponse> {
    const resp = await HttpService.post(
      apis.endpoints.ktpDokumen.uploadGambarKtp,
      data,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    );
    return resp;
  }
}

export default KtpDokumenApi;
