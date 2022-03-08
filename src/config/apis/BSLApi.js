import { HttpService } from 'config/services';
import { apis } from 'constants';

/**
 * Handles API call related to savepoint
 * @class
 */
class BSLApi {
  /**
   * Updates the savepoint
   *
   * @param   { Object }    data    Contains
   * @returns { Object }            Promise either resolve or rejected
   */
  static retrieveBSLs(payload) {
    return HttpService.get(apis.endpoints.bsl.list, payload).then((resp) => resp);
  }
}

export default BSLApi;
