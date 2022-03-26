import HttpService from '../services/HttpService';
import { AxiosResponse } from 'axios';

/**
 * Handles API call related to diagnostic
 * @class
 */
class DummyApi {
  /**
   * Retrieve the recommended courses
   *
   * @param   { Object }    data    Contains
   * @returns { Object }            Promise either resolve or rejected
   */
  static fetchDummy() {
    return HttpService.get('https://reqres.in/api/users').then(
      (resp: AxiosResponse) => resp,
    );
  }
}

export default DummyApi;
