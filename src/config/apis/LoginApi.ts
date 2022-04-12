import HttpService from '../services/HttpService';
import { AxiosResponse } from 'axios';
import { apis } from '../../constants';

export type sendUserKoperasiResponseParams = {
  namaKoperasi: string;
  noAnggota: string;
  tanggalLahir: string;
};

export type sendUserEmailKoperasiParams = {
  userId: number;
  email: string;
};

/**
 * Handles API call related to diagnostic
 * @class
 */
class LoginApi {
  /**
   * Retrieve Koperasi List Data
   *
   * @returns { Object } Promise either resolve or rejected
   */
  static async getKoperasiList(): Promise<AxiosResponse> {
    const resp = await HttpService.get(apis.endpoints.login.koperasi);
    return resp;
  }

  /**
   * Send and submit user koperasi data
   *
   * @param   { Object } data Contains sendUserKoperasiResponseParams
   * @returns { Response }  Promise either resolve or rejected
   */
  static async sendUserKoperasi(
    data: sendUserKoperasiResponseParams,
  ): Promise<AxiosResponse> {
    const resp = await HttpService.post(apis.endpoints.login.koperasi, data);
    return resp;
  }
  // static sendUserKoperasi(data: sendUserKoperasiResponseParams) {
  //   fetch(apis.baseURL.concat(apis.endpoints.login.koperasi), {
  //     method: 'POST',
  //     headers: {
  //       Accept: '*/*',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   }).then(function (res) {
  //     console.log('content ', res.text());
  //   });
  // }

  /**
   * Submit email anggota koperasi
   *
   * @param data Contains
   * @returns { Object } Promise either resolve or rejected
   */
  static async sendUserEmailKoperasiParams(
    data: sendUserEmailKoperasiParams,
  ): Promise<AxiosResponse> {
    const resp = await HttpService.patch(
      apis.endpoints.login.emailAnggota,
      data,
    );
    return resp;
  }

  /**
   * Call Forget Password API
   *
   * @param data Contains
   * @returns { Object } Promise either resolve or rejected
   */
  static async forgotPassword(email: string): Promise<AxiosResponse> {
    const resp = await HttpService.post(apis.endpoints.login.forgotPassword, {
      email,
    });
    return resp;
  }

  /**
   * Call Login API
   *
   * @param data Contains
   * @returns { Object } Promise either resolve or rejected
   */
  static async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<AxiosResponse> {
    const resp = await HttpService.post(apis.endpoints.login.login, {
      email,
      password,
    });
    return resp;
  }
}

export default LoginApi;
