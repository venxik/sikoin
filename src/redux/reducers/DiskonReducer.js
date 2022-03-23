import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  diskonDataList: [
    {
      image: 'https://picsum.photos/id/121/400/400',
      content: 'This is content example',
    },
    {
      image: 'https://picsum.photos/id/11/400/400',
      content: 'This is content example',
    },
    {
      image: 'https://picsum.photos/id/77/400/400',
      content: 'This is content example',
    },
    {
      image: 'https://picsum.photos/id/5/400/400',
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
