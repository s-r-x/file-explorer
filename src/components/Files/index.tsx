import React, {useCallback} from 'react';
import cls from './index.less';
import AutoSizer from 'react-virtualized-auto-sizer';
import {Props} from '@/containers/Files/connector';
import List from './List';
import Grid from './Grid';

const Files = (props: Props) => {
  const onDragStart = useCallback((e: any) => {
    e.nativeEvent.dataTransfer.setData('file_meta', 'petya');
  }, []);
  const onDragOver = useCallback((e: any) => {
    e.stopPropagation();
    e.preventDefault();
  }, []);
  const onDrop = useCallback((e: any) => {
    e.stopPropagation();
    e.preventDefault();
    const data = e.dataTransfer.getData('file_meta');
    console.log(data);
  }, []);
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
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragStart={onDragStart}
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
