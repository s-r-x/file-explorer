import React, {memo} from 'react';
import {Props as ParentProps} from '@/containers/Files';
import {FixedSizeList as List, ListChildComponentProps} from 'react-window';
import cls from './List.less';
import moment from 'moment';
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
} & Pick<ParentProps, 'list' | 'zoom' | 'openFile' | 'goTo'>;
const TIME_FORMAT = 'DD-MM-YYYY HH:mm';
const FilesList = memo((props: Props) => {
  const onClick = (e: any) => {
    const $tar = e.currentTarget;
    const index: number = $tar.dataset.index;
    const file = props.list[index];
    if (!file) return;
    if ($tar.dataset.dblclick) {
      if (file.isFile) {
        props.openFile(file.path);
      } else if (file.isDir) {
        props.goTo(file.path);
      }
    } else {
      $tar.dataset.dblclick = 1;
      setTimeout(() => {
        $tar.removeAttribute('data-dblclick');
      }, 250);
    }
  };
  const renderRow = (listProps: ListChildComponentProps) => {
    const value = props.list[listProps.index];
    const created = moment(value.created).format(TIME_FORMAT);
    const updated = moment(value.created).format(TIME_FORMAT);
    return (
      <div
        onClick={onClick}
        data-index={listProps.index}
        className={cls.row}
        style={listProps.style}>
        <Icon file={value} view="list" zoom={props.zoom} />
        <span className={cls.name}>{value.base}</span>
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
