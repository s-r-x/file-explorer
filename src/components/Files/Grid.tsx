import React, { memo, useRef, useMemo } from "react";
import { Props as ParentProps } from "@/containers/Files/connector";
import { FixedSizeGrid as Grid, GridChildComponentProps } from "react-window";
import cls from "./Grid.less";
import { getGridItemSize } from "@/utils/view";
import FileIcon from "@/components/FileIcon";
import ee from "@/utils/ee";

const GridItem = memo((props: GridChildComponentProps) => {
  const index = props.rowIndex * props.data.perRow + props.columnIndex;
  const value = props.data.files[index];
  if (!value) {
    return null;
  }
  const itemClass = cls.item + " " + cls["item__size" + props.data.zoom];
  return (
    <div
      onDragStart={props.data.onDragStart}
      draggable
      onDragOver={value.isDir ? props.data.onDragOver : null}
      onDrop={value.isDir ? props.data.onDrop : null}
      style={props.style}
      data-selected={value && value.path in props.data.selected ? 1 : 0}
      data-fileindex={index}
      className={itemClass}
    >
      <FileIcon view="grid" zoom={props.data.zoom} file={value} />
      <div className={cls.itemPath}>{value.base}</div>
    </div>
  );
});
GridItem.displayName = "GridItem";

type Props = {
  width: number;
  height: number;
  onDragStart(e: any): void;
  onDragOver(e: any): void;
  onDrop(e: any): void;
} & Pick<ParentProps, "list" | "zoom" | "selected">;
const FilesList = memo((props: Props) => {
  const ref = useRef();
  const itemSize = getGridItemSize(props.zoom);
  const perRow = Math.floor(props.width / itemSize.width);
  const onItemsRendered = () => {
    // @ts-ignore
    const $scrollArea = ref.current._outerRef.firstChild;
    ee.emit("mass_selector/container_created", $scrollArea);
  };
  const rowProps = useMemo(() => {
    return {
      zoom: props.zoom,
      selected: props.selected,
      perRow,
      files: props.list,
      onDragStart: props.onDragStart,
      onDragOver: props.onDragOver,
      onDrop: props.onDrop
    };
  }, [
    props.zoom,
    props.selected,
    perRow,
    props.list,
    props.onDragStart,
    props.onDragOver,
    props.onDrop
  ]);
  return (
    <Grid
      itemData={rowProps}
      ref={ref}
      onItemsRendered={onItemsRendered}
      rowCount={Math.ceil(props.list.length / perRow)}
      columnCount={perRow}
      columnWidth={itemSize.width}
      rowHeight={itemSize.height}
      width={props.width}
      height={props.height}
    >
      {GridItem}
    </Grid>
  );
});
FilesList.displayName = "FilesGrid";

export default FilesList;
