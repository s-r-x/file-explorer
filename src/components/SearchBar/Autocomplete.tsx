import React, {SyntheticEvent} from 'react';
import {FixedSizeList as List, ListChildComponentProps} from 'react-window';
import cls from './Autocomplete.less';

type Props = {
  autocomplete: string[];
  goTo(path: string): void;
  updateAutocomplete(payload: []): void;
};

const Example = (props: Props) => {
  const onSelect = (e: SyntheticEvent<HTMLButtonElement>) => {
    const selected = props.autocomplete[+e.currentTarget.dataset.index];
    props.goTo(selected);
  };
  const renderRow = (listProps: ListChildComponentProps) => {
    return (
      <div style={listProps.style} className={cls.row}>
        <button data-index={listProps.index} onClick={onSelect}>
          {props.autocomplete[listProps.index]}
        </button>
      </div>
    );
  };
  return (
    <div className={cls.autocomplete}>
      <List
        height={250}
        itemCount={props.autocomplete.length}
        itemSize={30}
        width="100%">
        {renderRow}
      </List>
    </div>
  );
};
export default Example;
