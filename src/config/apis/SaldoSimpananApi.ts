import HttpService from '../services/HttpService';
import { AxiosResponse } from 'axios';
import { apis } from '../../constants';
import { SaldoSimpananTopupRequest } from '../../redux/reducers/SaldoSimpananReducer';

/**
 * Handles API call related to diagnostic
 * @class
 */
class SaldoSimpananApi {
  /**
   * Retrieve Saldo Data
   *
   * @returns { Object } Promise either resolve or rejected
   */
  static async getSaldoData(): Promise<AxiosResponse> {
    const resp = await HttpService.get(apis.endpoints.saldo.saldo);
    return resp;
  }

  /**
   * Retrieve Create Saldo List
   *
   * @returns { Object } Promise either resolve or rejected
   */
  static async getCreateSaldoList(): Promise<AxiosResponse> {
    const resp = await HttpService.get(apis.endpoints.saldo.createSaldoList);
    return resp;
  }

  /**
   * Submit Topup Saldo
   *
   * @param data Contains
   * @returns { Object } Promise either resolve or rejected
   */
  static async submitTopup(
    data: SaldoSimpananTopupRequest,
  ): Promise<AxiosResponse> {
    const resp = await HttpService.post(apis.endpoints.saldo.saldo, data);
    return resp;
  }

  /**
   * Retrieve Saldo Data
   *
   * @returns { Object } Promise either resolve or rejected
   */
  static async getSimpananData(): Promise<AxiosResponse> {
    const resp = await HttpService.get(apis.endpoints.simpanan.simpanan);
    return resp;
  }

  /**
   * Retrieve Create Simpanan List
   *
   * @returns { Object } Promise either resolve or rejected
   */
  static async getCreateSimpananList(): Promise<AxiosResponse> {
    const resp = await HttpService.get(
      apis.endpoints.simpanan.createSimpananList,
    );
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

export default SaldoSimpananApi;
