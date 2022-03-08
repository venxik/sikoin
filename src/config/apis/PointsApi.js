import { HttpService } from 'config/services';
import { apis } from 'constants';

/**
 * Handles API call related to friends
 * @class
 */
class PointsApi {
  /**
   * Submit profile avatarId and username
   *
   * @param   { Object }    data    Contains
   * @returns { Object }            Promise either resolve or rejected
   */
  static submitPoints(payload) {
    return HttpService.post(apis.endpoints.points.update, payload).then((resp) => resp);
  }
}

export default PointsApi;
