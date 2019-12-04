import {RootState} from '@/store/rootReducer';
export const getSelectedFiles = (state: RootState) => state.selection.selected;
