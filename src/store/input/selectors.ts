import {RootState} from '@/store/rootReducer';

export const getInputValue = (state: RootState) => state.input.value;
export const getInputFocused = (state: RootState) => state.input.focused;
export const getInputAutocomplete = (state: RootState) =>
  state.input.autocomplete;
