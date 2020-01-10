import React from 'react';
import ContextMenu from '@/components/ContextMenu';
import connector, {Props as StoreProps} from './connector';
import {openFile, moveToTrash, removeFile} from '@/utils/fs';

export type Props = StoreProps & {
  openFile(file: string): void;
  moveToTrash(file: string): void;
  removeFile(file: string): Promise<void>;
};
const Wrap = (props: StoreProps) => (
  <ContextMenu
    openFile={openFile}
    removeFile={removeFile}
    moveToTrash={moveToTrash}
    {...props}
  />
);
export default connector(Wrap);
