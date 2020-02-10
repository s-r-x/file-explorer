import React, {memo, useRef, useMemo} from 'react';
import {Props as ParentProps} from '@/containers/Files/connector';
import {FixedSizeGrid as Grid, GridChildComponentProps} from 'react-window';
import cls from './Grid.less';
import {getGridItemSize} from '@/utils/view';
import FileIcon from '@/components/FileIcon';

const Row = memo((props: GridChildComponentProps) => {
  const index = props.rowIndex * props.data.perRow + props.columnIndex;
  const value = props.data.files[index];
  if (!value) {
    return null;
  }
  const itemClass = cls.item + ' ' + cls['item__size' + props.data.zoom];
  return (
    <div
      style={props.style}
      data-selected={value && value.path in props.data.selected ? 1 : 0}
      data-fileindex={index}
      className={itemClass}>
      <FileIcon view="grid" zoom={props.data.zoom} file={value} />
      <div className={cls.itemPath}>{value.base}</div>
    </div>
  );
});

type Props = {
  width: number;
  height: number;
} & Pick<ParentProps, 'list' | 'zoom' | 'selected'>;
const FilesList = memo((props: Props) => {
  const ref = useRef();
  const itemSize = getGridItemSize(props.zoom);
  const perRow = Math.floor(props.width / itemSize.width);
  const rowProps = useMemo(() => {
    return {
      zoom: props.zoom,
      selected: props.selected,
      perRow,
      files: props.list,
    };
  }, [props.zoom, props.selected, perRow, props.list]);
  const onRender = ({visibleRowStartIndex, visibleRowStopIndex}: any) => {
    console.log(visibleRowStopIndex, visibleRowStartIndex);
  };
  return (
    <Grid
      itemData={rowProps}
      ref={ref}
      onItemsRendered={onRender}
      rowCount={Math.ceil(props.list.length / perRow)}
      columnCount={perRow}
      columnWidth={itemSize.width}
      rowHeight={itemSize.height}
      width={props.width}
      height={props.height}>
      {Row}
    </Grid>
  );
});
FilesList.displayName = 'FilesGrid';

export default FilesList;
