import { HttpService } from 'config/services';
import { apis } from 'constants';

/**
 * Handles API call related to savepoint
 * @class
 */
class SavePointApi {
  /**
   * Updates the savepoint
   *
   * @param   { Object }    data    Contains
   * @returns { Object }            Promise either resolve or rejected
   */
  static updateSavePoint(payload) {
    return HttpService.post(apis.endpoints.savepoint.update, payload).then((resp) => resp);
  }
}

export default SavePointApi;
