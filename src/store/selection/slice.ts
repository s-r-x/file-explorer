import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";

export const DOMAIN = "selection";

export const initialState = {
  selected: {} as { [key: string]: number }
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
      state.selected = { [action.payload]: 1 };
    },
    replaceSelectionMany(
      state,
      action: PayloadAction<{ [key: string]: number }>
    ) {
      state.selected = action.payload;
    },
    removeFromSelection(state, action: PayloadAction<string>) {
      delete state.selected[action.payload];
    }
  }
});

export const moveSelectionRight = createAction(`${DOMAIN}/moveRight`);
export const moveSelectionLeft = createAction(`${DOMAIN}/moveLeft`);
export const moveSelectionBottom = createAction(`${DOMAIN}/moveBottom`);
export const moveSelectionTop = createAction(`${DOMAIN}/moveTop`);
export const {
  clearSelection,
  addToSelection,
  replaceSelection,
  replaceSelectionMany,
  removeFromSelection
} = counterSlice.actions;

export default counterSlice.reducer;
