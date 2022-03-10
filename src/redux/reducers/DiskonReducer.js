import { createSlice } from '@reduxjs/toolkit';
import { images } from '../../constants';

const initialState = {
  diskonDataList: [
    {
      image: images.dummy_ktp,
      content: 'This is content example',
    },
    {
      image: images.dummy_ktp,
      content: 'This is content example',
    },
    {
      image: images.dummy_ktp,
      content: 'This is content example',
    },
    {
      image: images.dummy_ktp,
      content: 'This is content example',
    },
  ],
  error: null,
};

const diskonSlice = createSlice({
  name: 'diskonSlice',
  initialState,
  reducers: {
    fetchDiskon: () => {},
    fetchDiskonSuccess: (state, { payload }) => {
      state.diskonDataList = payload;
    },
    fetchDiskonFailed: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { fetchKabarSuccess, fetchKabarFailed, fetchKabar } =
  diskonSlice.actions;

export default diskonSlice.reducer;
