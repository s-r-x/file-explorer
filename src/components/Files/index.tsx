import React from 'react';
import cls from './index.less';
import AutoSizer from 'react-virtualized-auto-sizer';
import {Props} from '@/containers/Files/connector';
import List from './List';
import Grid from './Grid';

const Files = (props: Props) => {
  return (
    <div id="files" className={cls.wrap}>
      <AutoSizer>
        {({width, height}) => (
          <>
            {props.mode === 'list' && (
              <List
                zoom={props.zoom}
                list={props.list}
                height={height}
                width={width}
              />
            )}
            {props.mode === 'icons' && (
              <Grid
                selected={props.selected}
                zoom={props.zoom}
                list={props.list}
                height={height}
                width={width}
              />
            )}
          </>
        )}
      </AutoSizer>
    </div>
  );
};

export default Files;
