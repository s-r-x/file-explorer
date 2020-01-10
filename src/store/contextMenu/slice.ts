import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const DOMAIN = 'contextMenu';

export const initialState = {
  isOpen: false,
};
const counterSlice = createSlice({
  name: DOMAIN,
  initialState,
  reducers: {
    openContextMenu(state) {
      state.isOpen = true;
    },
    closeContextMenu(state) {
      state.isOpen = false;
    },
  },
});

export const {openContextMenu, closeContextMenu} = counterSlice.actions;

export default counterSlice.reducer;
