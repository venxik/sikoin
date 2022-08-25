import HttpService from '../services/HttpService';
import { AxiosResponse } from 'axios';
import { apis } from '../../constants';
import { SaldoSimpananTopupRequest } from '../../redux/reducers/SaldoSimpananReducer';

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

  /**
   * Submit Topup Simpanan
   *
   * @param data Contains
   * @returns { Object } Promise either resolve or rejected
   */
  static async submitPenarikan(
    data: SaldoSimpananTopupRequest,
  ): Promise<AxiosResponse> {
    const resp = await HttpService.post(apis.endpoints.simpanan.simpanan, data);
    return resp;
  }
}

export default KtpDokumenApi;
