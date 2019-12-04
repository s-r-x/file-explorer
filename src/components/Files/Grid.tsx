import React, {memo} from 'react';
import {Props as ParentProps} from '@/containers/Files';
import {FixedSizeList as List, ListChildComponentProps} from 'react-window';
import cls from './Grid.less';
import FileIcon from '@/components/FileIcon';

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
} & Pick<
  ParentProps,
  'list' | 'zoom' | 'goTo' | 'openFile' | 'selected' | 'addToSelection'
>;
const FilesList = memo((props: Props) => {
  const itemSize = getItemSize(props.zoom);
  const perRow = Math.floor(props.width / itemSize.width);
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
      props.addToSelection(file.path);
      $tar.dataset.dblclick = 1;
      setTimeout(() => {
        $tar.removeAttribute('data-dblclick');
      }, 250);
    }
  };
  const renderRow = (listProps: ListChildComponentProps) => {
    const itemClass = cls.item + ' ' + cls['item__size' + props.zoom];
    const startIndex = listProps.index * perRow;
    const items = [];
    for (let i = startIndex; i < startIndex + perRow; i++) {
      const value = props.list[i];
      if (value) {
        items.push(
          <div
            key={i}
            data-selected={value.path in props.selected ? 1 : 0}
            data-index={i}
            onClick={onClick}
            className={itemClass}>
            <FileIcon view="grid" zoom={props.zoom} file={value} />
            <div className={cls.itemPath}>{value.base}</div>
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
