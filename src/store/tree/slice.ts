import {createSlice, createAction, PayloadAction} from '@reduxjs/toolkit';

export const DOMAIN = 'tree';

export const initialState = {
  list: [] as FileExcerpt[],
};
const counterSlice = createSlice({
  name: DOMAIN,
  initialState,
  reducers: {
    updateList(state, action: PayloadAction<FileExcerpt[]>) {
      state.list = action.payload;
    },
  },
});

export const refresh = createAction(`${DOMAIN}/refresh`);
export const {updateList} = counterSlice.actions;

export default counterSlice.reducer;
