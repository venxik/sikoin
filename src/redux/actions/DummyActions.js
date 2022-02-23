import { FETCH_DATA_FAILED, FETCH_DATA_SUCCESS } from '../types';
import { showLoading, hideLoading } from 'reducers/LoadingReducer';
import { apis } from 'constants';
import { HttpService } from 'config/services';
import axios from 'axios';

const fetchData = () => {
  return async dispatch => {
    dispatch(showLoading());
    try {
      HttpService.get(apis.baseURL)
        .then(response => {
          console.log('response', response);
          dispatch(fetchDataSuccess(response.data));
        })
        .catch(err => {
          console.log('err', err);
          dispatch(fetchDataFailed(err));
          return Promise.reject();
        })
        .finally(() => {
          dispatch(hideLoading());
        });
    } catch (err) {
      dispatch(fetchDataFailed(err));
      return Promise.reject();
    }
  };
};

const fetchDataSuccess = data => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});

const fetchDataFailed = data => ({
  type: FETCH_DATA_FAILED,
  payload: data,
});

export { fetchData, fetchDataSuccess, fetchDataFailed };
