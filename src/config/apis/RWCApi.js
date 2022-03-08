import { HttpService } from 'config/services';
import { apis } from 'constants';

/**
 * Handles API call related to savepoint
 * @class
 */
class RWCApi {
  /**
   * Updates the savepoint
   *
   * @param   { Object }    data    Contains
   * @returns { Object }            Promise either resolve or rejected
   */
  static fetchSignUpCoursesExplore(payload) {
    return HttpService.post(apis.endpoints.courses.signup, payload).then((resp) => resp);
  }

  static fetchGetRwcList(payload) {
    return HttpService.get(apis.endpoints.courses.rwcList, payload).then((resp) => resp);
  }
}

export default RWCApi;
