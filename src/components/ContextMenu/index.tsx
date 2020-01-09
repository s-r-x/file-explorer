import React from 'react';
import {Menu, Item} from 'react-contexify';
import {Props} from '@/containers/ContextMenu';
import _ from 'lodash';

const ContextMenu = (props: Props) => {
  const openFile = () => {
    // TODO
    props.selected.forEach(excerpt => {
      if (excerpt.isFile) {
        props.openFile(excerpt.path);
      } else if (excerpt.isDir) {
        props.goTo(excerpt.path);
      }
    });
  };
  const moveToTrash = () => {
    props.selected.forEach(({path}) => {
      props.moveToTrash(path);
    });
  };
  const remove = () => {
    props.selected.forEach(({path}) => {
      props.removeFile(path);
    });
  };
  const hasSelected = !_.isEmpty(props.selected);
  return (
    <>
      <Menu id="file_context_menu">
        {hasSelected && <Item onClick={openFile}>Open</Item>}
        {hasSelected && <Item onClick={moveToTrash}>Move To Trash</Item>}
        {hasSelected && <Item>Rename</Item>}
        {hasSelected && <Item>Copy</Item>}
        <Item>Properties</Item>
      </Menu>
    </>
  );
};

export default ContextMenu;
