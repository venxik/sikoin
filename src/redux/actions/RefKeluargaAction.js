import { ADD_KELUARGA, UPDATE_KELUARGA, DELETE_KELUARGA } from '../types';

const addKelToReducer = data => {
  return {
    type: ADD_KELUARGA,
    payload: data,
  };
};

const updateKelToReducer = ({ index, data }) => ({
  type: UPDATE_KELUARGA,
  index,
  payload: data,
});

const deleteKelFromReducer = data => ({
  type: DELETE_KELUARGA,
  payload: data,
});

export { addKelToReducer, updateKelToReducer, deleteKelFromReducer };
