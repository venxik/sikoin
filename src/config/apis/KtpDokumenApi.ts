import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { apis } from '../../constants';
import HttpService from '../services/HttpService';

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

  static async uploadGambarKtp(formData: FormData): Promise<AxiosResponse> {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: () => {
        return formData;
      },
      data: formData,
    };

    const resp = await HttpService.post(apis.endpoints.ktpDokumen.ktpDokumen, {}, config);
    return resp;
  }
}

export default KtpDokumenApi;
