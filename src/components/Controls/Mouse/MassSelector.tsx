import React, { useEffect, useCallback } from "react";
import cls from "./MassSelector.less";
import { Props as RootProps } from "@/containers/Controls";
import { getGridItemSize, getFilesViewSize } from "@/utils/view";
import _ from "lodash";

type Props = {
  x: number;
  y: number;
  initialX: number;
  initialY: number;
} & Pick<RootProps, "replaceSelectionMany" | "list" | "clearSelection">;
const MassSelector = (props: Props) => {
  const width = Math.abs(props.x - props.initialX);
  const height = Math.abs(props.y - props.initialY);
  const x = props.x < props.initialX ? props.x : props.initialX;
  const y = props.y < props.initialY ? props.y : props.initialY;
  const updateSelection = useCallback(
    _.throttle(
      (
        colsOffset: number,
        colsSelected: number,
        rowsSelected: number,
        rowsOffset: number,
        perRow: number
      ) => {
        if (colsSelected && rowsSelected) {
          const selected = props.list
            .filter((_, i) => {
              const x = (i % perRow) + 1;
              const y = Math.floor(i / perRow) + 1;
              return (
                x > colsOffset &&
                x - colsOffset <= colsSelected &&
                y > rowsOffset &&
                y - rowsOffset <= rowsSelected
              );
            })
            .reduce((acc, file) => {
              acc[file.path] = 1;
              return acc;
            }, {} as { [key: string]: number });
          props.replaceSelectionMany(selected);
        } else {
          props.clearSelection();
        }
      },
      125
    ),
    [props.list]
  );
  useEffect(() => {
    // TODO:: pass actual zoom
    const itemSize = getGridItemSize(1);
    const canvasSize = getFilesViewSize();
    const perRow = Math.floor(canvasSize / itemSize.width);
    const rowsCount = Math.ceil(props.list.length / perRow);
    //const perCol = Math.ceil(props.list.length / perRow);
    const colsOffset = Math.floor(x / itemSize.width);
    const rowsOffset = Math.floor(y / itemSize.height);
    // TODO:: maybe we can cache items positions right after mousedown event
    // TODO:: correct pos calculations when the files container's height is less than the parent height
    const getColsSelected = () => {
      const items = Array.from(new Array(perRow - colsOffset)).filter(
        (__, i) => {
          const pos = colsOffset * itemSize.width + i * itemSize.width;
          return (
            _.inRange(pos, x, x + width) ||
            _.inRange(pos + itemSize.width, x, x + width) ||
            _.inRange(x, pos, pos + itemSize.width)
          );
        }
      );
      return items.length;
    };

    const colsSelected = getColsSelected();
    const getRowsSelected = () => {
      const intersected = Array.from(new Array(rowsCount)).filter((__, i) => {
        const pos = i * itemSize.height;
        return (
          _.inRange(pos, y, y + height) ||
          _.inRange(pos + itemSize.height, y, y + height) ||
          _.inRange(y, pos, pos + itemSize.height)
        );
      });
      return intersected.length;
    };
    const rowsSelected = getRowsSelected();
    updateSelection(colsOffset, colsSelected, rowsSelected, rowsOffset, perRow);
  }, [width, height, x, y, props.list]);
  return (
    <div
      style={{
        transform: `translate(${x}px, ${y}px)`,
        width: `${width}px`,
        height: `${height}px`
      }}
      className={cls.massSelector}
    />
  );
};

export default MassSelector;
