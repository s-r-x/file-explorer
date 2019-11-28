import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import os from 'os';
import {getParentDir} from '@/utils';

const DOMAIN = 'path';

export const initialState = {
  current: 0,
  history: ['/'],
};
const counterSlice = createSlice({
  name: DOMAIN,
  initialState,
  reducers: {
    goBack(state) {
      if (state.current > 0) {
        state.current -= 1;
      }
    },
    goForward(state) {
      if (state.history.length - 1 !== state.current) {
        state.current += 1;
      }
    },
    goHome(state) {
      const {current, history} = state;
      history.splice(current + 1);
      history.push(os.homedir());
      state.current = history.length - 1;
    },
    goParent(state) {
      const {current, history} = state;
      const parent = getParentDir(history[current]);
      if (parent !== history[current]) {
        history.splice(current + 1);
        history.push(parent);
        state.current = history.length - 1;
      }
    },
    goTo(state, action: PayloadAction<string>) {
      const {history} = state;
      if (history[state.current] !== action.payload) {
        history.push(action.payload);
        state.current = history.length - 1;
      }
    },
  },
});

export const {goBack, goForward, goHome, goParent, goTo} = counterSlice.actions;

export default counterSlice.reducer;
