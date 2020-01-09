import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '@/store/rootReducer';
import {getRawFilesList} from '@/store/tree/selectors';
import _ from 'lodash';
export const getSelectedFiles = (state: RootState) => state.selection.selected;
// TODO:: performance refactor
export const getSelectedFilesExcerpt = createSelector(
  [getSelectedFiles, getRawFilesList],
  (selected, files) => {
    const normalized: FileExcerpt[] = _.reduce(
      selected,
      (acc, __, key) => {
        const found = files.find(({path}) => path === key);
        if (found) {
          acc.push(found);
        }
        return acc;
      },
      [],
    );
    return normalized;
  },
);
