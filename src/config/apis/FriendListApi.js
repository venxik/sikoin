import { HttpService } from 'config/services';
import { apis } from 'constants';

/**
 * Handles API call related to friends
 * @class
 */
class FriendListApi {
  /**
   * Retrieve the friend list
   *
   * @param   { Object }    data    Contains
   * @returns { Object }            Promise either resolve or rejected
   */
  static retrieveFriendList(payload) {
    return HttpService.get(apis.endpoints.friends.list, payload).then((resp) => resp);
  }

  /**
   * Add friend and retrieve updated friend list
   *
   * @param   { Object }    data    Contains
   * @returns { Object }            Promise either resolve or rejected
   */
  static callAddFriend(payload) {
    return HttpService.post(apis.endpoints.friends.add, payload).then((resp) => resp);
  }
}

export default FriendListApi;
