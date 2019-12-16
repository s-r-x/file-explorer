import React from 'react';
import MouseControls from './Mouse';
import KeyboardControls from './Keyboard';
import {Props} from '@/containers/Controls';

const Controls = (props: Props) => {
  return (
    <>
      <MouseControls {...props} />
      <KeyboardControls {...props} />
    </>
  );
};

export default Controls;
