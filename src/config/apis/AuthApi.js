import { HttpService } from 'config/services';
import { apis, storage } from 'constants';
import { saveEncryptedStorage, clearEncryptedStorage } from 'utils/encryptedStorage';

/**
 * Handles API call related to authentication.
 * @class
 */
class AuthApi {
  /**
   * Authenticate the user and get access token
   *
   * @param   { Object }    data    Contains
   * @returns { Object }            Promise either resolve or rejected
   */
  static authorize(payload) {
    return HttpService.get(apis.endpoints.auth.authorize, payload).then((resp) => resp);
  }

  /**
   * Authenticate the user and get access token
   *
   * @param   { Object }    data    Contains
   * @returns { Object }            Promise either resolve or rejected
   */
  static login(payload) {
    return HttpService.post(apis.endpoints.auth.login, payload).then((resp) => {
      if (resp.data.access_token) {
        saveEncryptedStorage(storage.accessTokenKey, resp.data.access_token);
        saveEncryptedStorage(storage.idTokenKey, resp.data.id_token);
        saveEncryptedStorage(storage.refreshTokenKey, resp.data.refresh_token);
      }

      return resp;
    });
  }

  /**
   * Logouts the user and clears all tokens in storage
   *
   * @param   { Object }    data    Contains
   * @returns { Object }            Promise either resolve or rejected
   */
  static logout(payload) {
    return HttpService.get(apis.endpoints.auth.logout, payload, {
      baseURL: 'https://staging.palms.pa.gov.sg/api',
    }).then((resp) => {
      if (resp.data.access_token) {
        clearEncryptedStorage();
      }

      return resp;
    });
  }
}

export default AuthApi;
