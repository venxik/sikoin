import { HttpService } from 'config/services';
import { apis } from 'constants';

/**
 * Handles API call related to friends
 * @class
 */
class LeaderboardApi {
  /**
   * Retrieve the individual list
   *
   * @param   { Object }    data    Contains
   * @returns { Object }            Promise either resolve or rejected
   */
  static retrieveIndividualList(payload) {
    return HttpService.get(apis.endpoints.ranking.individual, payload).then((resp) => resp);
  }

  /**
   * Retrieve the team list
   *
   * @param   { Object }    data    Contains
   * @returns { Object }            Promise either resolve or rejected
   */
  static retrieveTeamList(payload) {
    return HttpService.get(apis.endpoints.ranking.team, payload).then((resp) => resp);
  }
}

export default LeaderboardApi;
