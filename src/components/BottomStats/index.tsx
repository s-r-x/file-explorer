import React, { useMemo } from "react";
import cls from "./index.less";
import { Props } from "@/containers/BottomStats/connector";
import PB from "pretty-bytes";
import _ from "lodash";

const WithSelection = (props: Pick<Props, "files" | "selected">) => {
  const amount = useMemo(() => {
    return _.size(props.selected);
  }, [props.selected]);
  // TODO:: performance refactor
  const size = useMemo(() => {
    return _.reduce(
      props.selected,
      (acc, __, key) => {
        const file = props.files.find(file => file.path === key);
        if (!file) return acc;
        return file.size + acc;
      },
      0
    );
  }, [props.files, props.selected]);
  return (
    <>
      <span>{amount} items selected </span>
      <span>({PB(size)})</span>
    </>
  );
};
const WithoutSelection = (props: Pick<Props, "files">) => {
  const size = useMemo(() => {
    return props.files.reduce((acc, file) => {
      return acc + file.size;
    }, 0);
  }, [props.files]);
  return (
    <>
      <span>{props.files.length} items </span>
      <span>({PB(size)})</span>
    </>
  );
};

const BottomStats = (props: Props) => {
  return (
    <div className={cls.wrap}>
      {_.isEmpty(props.selected) ? (
        <WithoutSelection files={props.files} />
      ) : (
        <WithSelection files={props.files} selected={props.selected} />
      )}
    </div>
  );
};

export default BottomStats;
