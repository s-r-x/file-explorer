import React from 'react';
import ContextMenu from '@/components/ContextMenu';
import connector, {Props as StoreProps} from './connector';
import {openFile} from '@/utils/fs';

export type Props = StoreProps & {
  openFile(file: string): void;
};
const Wrap = (props: StoreProps) => (
  <ContextMenu openFile={openFile} {...props} />
);
export default connector(Wrap);
