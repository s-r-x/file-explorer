import React from 'react';
import cls from './index.less';
import {getIcon} from '@/utils/icons';

type Props = {
  file: FileExcerpt;
  view: 'grid' | 'list';
  zoom?: number;
};
const FileIcon = (props: Props) => {
  let iconClasses: string = cls[props.view];
  if (props.zoom === 1) {
    iconClasses += ` ${cls.md}`;
  } else if (props.zoom === 2) {
    iconClasses += ` ${cls.lg}`;
  } else if (props.zoom === 3) {
    iconClasses += ` ${cls.xl}`;
  }
  const icon = getIcon(props.file);
  return <img className={iconClasses} src={icon} alt={props.file.path} />;
};

export default FileIcon;
