import { HttpService } from 'config/services';
import { apis } from 'constants';

/**
 * Handles API call related to friends
 * @class
 */
class ProfileApi {
  /**
   * Submit profile avatarId and username
   *
   * @param   { Object }    data    Contains
   * @returns { Object }            Promise either resolve or rejected
   */
  static submitProfile(payload) {
    return HttpService.post(apis.endpoints.profile.submit, payload).then((resp) => resp);
  }
}

export default ProfileApi;
