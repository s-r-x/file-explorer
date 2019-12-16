import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const DOMAIN = 'selection';

export const initialState = {
  selected: {} as {[key: string]: number},
};
const counterSlice = createSlice({
  name: DOMAIN,
  initialState,
  reducers: {
    clearSelection(state) {
      state.selected = {};
    },
    addToSelection(state, action: PayloadAction<string>) {
      state.selected[action.payload] = 1;
    },
    replaceSelection(state, action: PayloadAction<string>) {
      state.selected = {[action.payload]: 1};
    },
    removeFromSelection(state, action: PayloadAction<string>) {
      delete state.selected[action.payload];
    },
  },
});

export const {
  clearSelection,
  addToSelection,
  replaceSelection,
  removeFromSelection,
} = counterSlice.actions;

export default counterSlice.reducer;
