/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export interface ICounterState {
  count: number;
}

const initialState: ICounterState = {
  count: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state: ICounterState) => {
      state.count += 1;
    },
    decrement: (state: ICounterState) => {
      state.count -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
