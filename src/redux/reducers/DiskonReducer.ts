import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DiskonData = {
  image: string;
  content: string;
};

interface RootState {
  diskonDataList: DiskonData[];
  error: null;
}

const initialState: RootState = {
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
    fetchDiskon: (state, { payload }: PayloadAction<DiskonData[]>) => {
      state.diskonDataList = payload;
    },
    fetchDiskonSuccess: (state, { payload }: PayloadAction<DiskonData[]>) => {
      state.diskonDataList = payload;
    },
    fetchDiskonFailed: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { fetchDiskon, fetchDiskonFailed, fetchDiskonSuccess } =
  diskonSlice.actions;

export default diskonSlice.reducer;
