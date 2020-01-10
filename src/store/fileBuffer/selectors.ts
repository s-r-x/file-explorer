import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '@/store/rootReducer';
import _ from 'lodash';

export const getFileBufferType = (state: RootState) => state.fileBuffer.type;
export const getFileBuffer = (state: RootState) => state.fileBuffer.items;
export const isFileBufferEmpty = createSelector(
  [getFileBuffer],
  buffer => {
    return _.isEmpty(buffer);
  },
);
