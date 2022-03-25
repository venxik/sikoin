import HttpService from '../services/HttpService';
import { apis } from '../../constants';

/**
 * Handles API call related to diagnostic
 * @class
 */
class DiagnosticApi {
  /**
   * Retrieve the recommended courses
   *
   * @param   { Object }    data    Contains
   * @returns { Object }            Promise either resolve or rejected
   */
  static retrieveRecommendedCourses(payload) {
    return HttpService.post(
      apis.endpoints.courses.recommendedCourseList,
      payload,
    ).then(resp => resp);
  }

  /**
   * Sign up the selected recommended courses
   *
   * @param   { Object }    data    Contains
   * @returns { Object }            Promise either resolve or rejected
   */
  static signUpRecommendedCourses(payload) {
    return HttpService.post(apis.endpoints.courses.signup, payload).then(
      resp => resp,
    );
  }
}

export default DiagnosticApi;
