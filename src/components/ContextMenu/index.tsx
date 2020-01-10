import React, {useMemo} from 'react';
import {Menu, Item} from 'react-contexify';
import {Props} from '@/containers/ContextMenu';
import _ from 'lodash';

const ContextMenu = (props: Props) => {
  const hasSelected = !_.isEmpty(props.selected);
  const canPaste = useMemo(() => {
    if (props.isBufferEmpty) {
      return false;
    }
    if (props.selected.length > 1) {
      return false;
    }
    return true;
  }, [props.selected, props.isBufferEmpty]);
  const canPasteIntoFolder = useMemo(() => {
    return canPaste && hasSelected && props.selected[0].isDir;
  }, [canPaste, props.selected, hasSelected]);
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
  const paste = () => {
    if (canPasteIntoFolder) {
      return props.paste(props.selected[0].path);
    }
    if (canPaste) {
      return props.paste(props.currentPath);
    }
  };
  return (
    <>
      <Menu id="file_context_menu">
        {hasSelected && <Item onClick={openFile}>Open</Item>}
        {hasSelected && <Item onClick={moveToTrash}>Move To Trash</Item>}
        {hasSelected && <Item onClick={remove}>Remove</Item>}
        {hasSelected && <Item>Rename</Item>}
        {hasSelected && <Item onClick={props.copy}>Copy</Item>}
        {hasSelected && <Item onClick={props.cut}>Cut</Item>}
        {canPaste && !canPasteIntoFolder && <Item onClick={paste}>Paste</Item>}
        {canPasteIntoFolder && <Item onClick={paste}>Paste Into Folder</Item>}
        <Item>Properties</Item>
      </Menu>
    </>
  );
};

export default ContextMenu;
