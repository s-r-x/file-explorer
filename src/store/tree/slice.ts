import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";

export const DOMAIN = "tree";

export const initialState = {
  list: [] as FileExcerpt[]
};
const counterSlice = createSlice({
  name: DOMAIN,
  initialState,
  reducers: {
    addToList(state, action: PayloadAction<FileExcerpt>) {
      state.list.push(action.payload);
    },
    removeFromList(state, action: PayloadAction<string>) {
      const idx = state.list.findIndex(({ path }) => path === action.payload);
      if (idx) {
        state.list.splice(idx, 1);
      }
    },
    updateList(state, action: PayloadAction<FileExcerpt[]>) {
      state.list = action.payload;
    }
  }
});

export const refresh = createAction(`${DOMAIN}/refresh`);
export const removeFiles = createAction(
  `${DOMAIN}/remove`,
  (permanent: boolean) => ({
    payload: permanent
  })
);
export const renameFile = createAction(`${DOMAIN}/rename`);
export const createFolder = createAction(`${DOMAIN}/createFolder`);
export const { updateList, addToList, removeFromList } = counterSlice.actions;

export default counterSlice.reducer;
