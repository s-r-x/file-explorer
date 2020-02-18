import React, { useEffect } from "react";
import cls from "./MassSelector.less";
import { Props as RootProps } from "@/containers/Controls";
import { getGridItemSize, getFilesViewSize } from "@/utils/view";

type Props = {
  x: number;
  y: number;
  initialX: number;
  initialY: number;
} & Pick<RootProps, "replaceSelectionMany" | "list">;
const MassSelector = (props: Props) => {
  const width = Math.abs(props.x - props.initialX);
  const height = Math.abs(props.y - props.initialY);
  const x = props.x < props.initialX ? props.x : props.initialX;
  const y = props.y < props.initialY ? props.y : props.initialY;
  useEffect(() => {
    const itemSize = getGridItemSize(1);
    const canvasSize = getFilesViewSize();
    const perRow = Math.floor(canvasSize / itemSize.width);
    // TODO:: bad coords
    const [colsOffset, colsSelected] = [
      Math.floor(x / itemSize.width),
      Math.ceil(width / itemSize.width)
    ];
    const [rowsOffset, rowsSelected] = [
      Math.floor(y / itemSize.height),
      Math.ceil(height / itemSize.height)
    ];
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
    }
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
