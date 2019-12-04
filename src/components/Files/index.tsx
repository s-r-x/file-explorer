import React from 'react';
import cls from './index.less';
import AutoSizer from 'react-virtualized-auto-sizer';
import {Props} from '@/containers/Files';
import List from './List';
import Grid from './Grid';

const Files = (props: Props) => {
  return (
    <div className={cls.wrap}>
      <AutoSizer>
        {({width, height}) => (
          <>
            {props.mode === 'list' && (
              <List
                openFile={props.openFile}
                zoom={props.zoom}
                list={props.list}
                height={height}
                width={width}></List>
            )}
            {props.mode === 'icons' && (
              <Grid
                openFile={props.openFile}
                goTo={props.goTo}
                zoom={props.zoom}
                list={props.list}
                height={height}
                width={width}></Grid>
            )}
          </>
        )}
      </AutoSizer>
    </div>
  );
};

export default Files;
