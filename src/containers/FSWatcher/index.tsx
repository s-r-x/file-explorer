import React from 'react';
import FSWatcher from '@/components/FSWatcher';
import connector, {Props as StoreProps} from './connector';
import {getFileStats} from '@/utils/fs';

export type Props = StoreProps & {
  getFileStats(path: string): Promise<FileExcerpt>;
};
const Wrap = (props: StoreProps) => (
  <FSWatcher {...props} getFileStats={getFileStats} />
);
export default connector(Wrap);
