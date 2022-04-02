import HttpService from '../services/HttpService';
import { AxiosResponse } from 'axios';
import { apis } from '../../constants';
import { ProfileRequest } from '../../redux/reducers/ProfileReducer';

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
  static async updateProfile(data: ProfileRequest): Promise<AxiosResponse> {
    const resp = await HttpService.patch(apis.endpoints.profile.profile, data);
    return resp;
  }
}

export default ProfileApi;
