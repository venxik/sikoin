import { ADD_ALAMAT, UPDATE_ALAMAT, DELETE_ALAMAT } from '../types';

const addAlamatToReducer = data => {
  return {
    type: ADD_ALAMAT,
    payload: data,
  };
};

const updateAlamatToReducer = ({ index, data }) => ({
  type: UPDATE_ALAMAT,
  index,
  payload: data,
});

const deleteAlamatFromReducer = data => ({
  type: DELETE_ALAMAT,
  payload: data,
});

export default {
  addAlamatToReducer,
  updateAlamatToReducer,
  deleteAlamatFromReducer,
};
