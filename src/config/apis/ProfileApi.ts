import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { apis } from '../../constants';
import HttpService from '../services/HttpService';

/**
 * Handles API call related to diagnostic
 * @class
 */
class ProfileApi {
  /**
   * Retrieve Alamat List
   *
   * @returns { Object } Promise either resolve or rejected
   */
  static async getProfile(): Promise<AxiosResponse> {
    const resp = await HttpService.get(apis.endpoints.profile.profile);
    return resp;
  }

  /**
   * Update existing alamat
   *
   * @param data Contains
   * @returns { Object } Promise either resolve or rejected
   */
  static async updateProfile(formData: FormData): Promise<AxiosResponse> {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: () => {
        return formData;
      },
      data: formData,
    };
    const resp = await HttpService.post(apis.endpoints.profile.profile, {}, config);
    return resp;
  }
}

export default ProfileApi;
