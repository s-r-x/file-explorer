import React, {memo} from 'react';
import {Props as ParentProps} from '@/containers/Files/connector';
import {FixedSizeGrid as Grid, GridChildComponentProps} from 'react-window';
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
type Props = {
  width: number;
  height: number;
} & Pick<ParentProps, 'list' | 'zoom' | 'selected'>;
const FilesList = memo((props: Props) => {
  const itemSize = getItemSize(props.zoom);
  const perRow = Math.floor(props.width / itemSize.width);
  const renderRow = (gridProps: GridChildComponentProps) => {
    const index = gridProps.rowIndex * perRow + gridProps.columnIndex;
    const value = props.list[index];
    if (!value) {
      return null;
    }
    const itemClass = cls.item + ' ' + cls['item__size' + props.zoom];
    return (
      <div
        style={gridProps.style}
        data-selected={value && value.path in props.selected ? 1 : 0}
        data-fileindex={index}
        className={itemClass}>
        <FileIcon view="grid" zoom={props.zoom} file={value} />
        <div className={cls.itemPath}>{value.base}</div>
      </div>
    );
  };
  return (
    <Grid
      rowCount={Math.ceil(props.list.length / perRow)}
      columnCount={perRow}
      columnWidth={itemSize.width}
      rowHeight={itemSize.height}
      width={props.width}
      height={props.height}>
      {renderRow}
    </Grid>
  );
});
FilesList.displayName = 'FilesGrid';

export default FilesList;
