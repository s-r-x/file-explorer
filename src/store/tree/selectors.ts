import {RootState} from '@/store/rootReducer';
import {createSelector} from '@reduxjs/toolkit';
import {getShowHidden} from '../view/selectors';
import path from 'path';

const getRawFilesList = (state: RootState) => state.tree.list;
export const getFilesList = createSelector(
  [getRawFilesList, getShowHidden],
  (files, showHidden) => {
    if (showHidden) return files;
    return files.filter(
      ({path: fullPath}) => path.basename(fullPath)[0] !== '.',
    );
  },
);
