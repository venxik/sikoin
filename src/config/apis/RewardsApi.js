import { HttpService } from 'config/services';
import { apis } from 'constants';

/**
 * Handles API call related to rewards
 * @class
 */
class RewardsApi {
  /**
   * Retrieves rewards list
   *
   * @param   { Object }    data    Contains
   * @returns { Object }            Promise either resolve or rejected
   */
  static retrieveRewards(payload) {
    return HttpService.get(apis.endpoints.rewards.list, payload).then((resp) => resp);
  }

  static claimReward(payload) {
    return HttpService.post(apis.endpoints.rewards.claim, payload).then((resp) => resp);
  }
}

export default RewardsApi;
