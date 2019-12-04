import React from 'react';
import Files from '@/components/Files';
import connector, {Props as StoreProps} from './connector';
import {openFile} from '@/utils/fs';

export type Props = StoreProps & {
  openFile(path: string): void;
};
const Wrap = (props: StoreProps) => <Files openFile={openFile} {...props} />;

export default connector(Wrap);
