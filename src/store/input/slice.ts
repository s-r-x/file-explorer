import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const DOMAIN = 'input';

const slice = createSlice({
  name: DOMAIN,
  initialState: {
    value: '',
    autocomplete: [] as string[],
    focused: false,
  },
  reducers: {
    updateInput(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
    updateAutocomplete(state, action: PayloadAction<string[]>) {
      state.autocomplete = action.payload;
    },
    updateFocus(state, action: PayloadAction<boolean>) {
      state.focused = action.payload;
    },
  },
});

export const {updateInput, updateAutocomplete, updateFocus} = slice.actions;

export default slice.reducer;
