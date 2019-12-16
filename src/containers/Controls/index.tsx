import React from 'react';
import Controls from '@/components/Controls';
import connector, {Props as StoreProps} from './connector';
import {openFile} from '@/utils/fs';

export type Props = StoreProps & {
  openFile(path: string): void;
};
const Wrap = (props: StoreProps) => <Controls openFile={openFile} {...props} />;

export default connector(Wrap);
