import React, {memo} from 'react';
import {Props as ParentProps} from '@/containers/Files/connector';
import {FixedSizeList as List, ListChildComponentProps} from 'react-window';
import cls from './Grid.less';
import moment from 'moment';
import path from 'path';
import pb from 'pretty-bytes';
import FileIcon from '@/components/FileIcon';

const TIME_FORMAT = 'MM-DD-YYYY HH:mm';

const getItemSize = (zoom: number) => {
  switch (zoom) {
    case 1:
      return {
        width: 125,
        height: 100,
      };
    case 2:
      return {
        width: 150,
        height: 125,
      };
    case 3:
      return {
        width: 175,
        height: 150,
      };
  }
};
// https://codesandbox.io/s/5xpkw9376p
type Props = {
  width: number;
  height: number;
} & Pick<ParentProps, 'list' | 'zoom' | 'goTo'>;
const FilesList = memo((props: Props) => {
  const itemSize = getItemSize(props.zoom);
  const perRow = Math.floor(props.width / itemSize.width);
  const onClick = (e: any) => {
    const $tar = e.currentTarget;
    const filePath = $tar.dataset.path;
    if ($tar.dataset.dblclick) {
      if (filePath) {
        props.goTo(filePath);
      }
    } else {
      $tar.dataset.dblclick = 1;
      setTimeout(() => {
        $tar.removeAttribute('data-dblclick');
      }, 250);
    }
  };
  const renderRow = (listProps: ListChildComponentProps) => {
    const itemClass = `${cls.item} ${cls['item__size' + props.zoom]}`;
    const startIndex = listProps.index * perRow;
    const items = [];
    for (let i = startIndex; i < startIndex + perRow; i++) {
      const value = props.list[i];
      if (value) {
        items.push(
          <div
            key={i}
            data-path={value.path}
            onClick={onClick}
            className={itemClass}>
            <FileIcon view="grid" zoom={props.zoom} file={value} />
            <div className={cls.itemPath}>{path.basename(value.path)}</div>
          </div>,
        );
      } else {
        items.push(<div key={i} className={itemClass} />);
      }
    }
    return (
      <div className={cls.row} style={listProps.style}>
        {items}
      </div>
    );
  };
  return (
    <List
      width={props.width}
      height={props.height}
      itemSize={itemSize.height}
      itemCount={Math.ceil(props.list.length / perRow)}>
      {renderRow}
    </List>
  );
});
FilesList.displayName = 'FilesGrid';

export default FilesList;
