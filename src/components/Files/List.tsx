import React, {memo} from 'react';
import {Props as ParentProps} from '@/containers/Files/connector';
import {FixedSizeList as List, ListChildComponentProps} from 'react-window';
import cls from './List.less';
import moment from 'moment';
import path from 'path';
import pb from 'pretty-bytes';
import Icon from '@/components/FileIcon';

const getItemSize = (zoom: number) => {
  switch (zoom) {
    case 1:
      return 35;
    case 2:
      return 45;
    case 3:
      return 50;
  }
};

type Props = {
  width: number;
  height: number;
} & Pick<ParentProps, 'list' | 'zoom'>;
const TIME_FORMAT = 'MM-DD-YYYY HH:mm';
const FilesList = memo((props: Props) => {
  const renderRow = (listProps: ListChildComponentProps) => {
    const value = props.list[listProps.index];
    const created = moment(value.created).format(TIME_FORMAT);
    const updated = moment(value.created).format(TIME_FORMAT);
    return (
      <div className={cls.row} style={listProps.style}>
        <Icon file={value} view="list" zoom={props.zoom} />
        <span className={cls.name}>{path.basename(value.path)}</span>
        <span className={cls.size}>{pb(value.size)}</span>
        <span className={cls.type}>{value.isDir ? 'Folder' : 'File'}</span>
        <span title={created} className={cls.created}>
          {created}
        </span>
        <span title={updated} className={cls.updated}>
          {updated}
        </span>
      </div>
    );
  };
  return (
    <List
      width={props.width}
      height={props.height}
      itemSize={getItemSize(props.zoom)}
      itemCount={props.list.length}>
      {renderRow}
    </List>
  );
});
FilesList.displayName = 'FilesList';

export default FilesList;
