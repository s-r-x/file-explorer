import {createSlice, PayloadAction, createAction} from '@reduxjs/toolkit';

export const DOMAIN = 'fileBuffer';

export type State = {
  type: 'COPY' | 'CUT';
  items: NumbersDict;
};
export const initialState: State = {
  type: null,
  items: {},
};
const counterSlice = createSlice({
  name: DOMAIN,
  initialState,
  reducers: {
    clear(state) {
      state.type = null;
      state.items = {};
    },
    replace(state, action: PayloadAction<State>) {
      state.type = action.payload.type;
      state.items = action.payload.items;
    },
  },
});

export const copy = createAction(`${DOMAIN}/copy`);
export const cut = createAction(`${DOMAIN}/cut`);
export const paste = createAction(`${DOMAIN}/paste`, (dest: string) => ({
  payload: dest,
}));
export const {clear, replace} = counterSlice.actions;

export default counterSlice.reducer;
