import {createSlice, createAction, PayloadAction} from '@reduxjs/toolkit';

export const DOMAIN = 'tree';

export const initialState = {
  list: [] as FileExcerpt[],
};
const counterSlice = createSlice({
  name: DOMAIN,
  initialState,
  reducers: {
    addToList(state, action: PayloadAction<FileExcerpt>) {
      state.list.push(action.payload);
    },
    removeFromList(state, action: PayloadAction<string>) {
      // TODO:: performance refactor
      state.list = state.list.filter(({path}) => path != action.payload);
    },
    updateList(state, action: PayloadAction<FileExcerpt[]>) {
      state.list = action.payload;
    },
  },
});

export const refresh = createAction(`${DOMAIN}/refresh`);
export const removeFiles = createAction(
  `${DOMAIN}/remove`,
  (permanent: boolean) => ({
    payload: permanent,
  }),
);
export const {updateList, addToList, removeFromList} = counterSlice.actions;

export default counterSlice.reducer;
