import React, {useCallback, useEffect} from 'react';
import cls from './index.less';
import {Input, Button, Icon} from 'antd';
import {Props} from '@/containers/SearchBar/connector';
import Autocomplete from './Autocomplete';
import _ from 'lodash';

const BLUR_DELAY = 150;

const SearchBar = (props: Props) => {
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    props.updateInput(e.target.value);
  }, []);
  const onFocus = useCallback(() => {
    props.updateFocus(true);
  }, []);
  const onBlur = useCallback(() => {
    // this delay gives us some time to handle autocomplete list click
    setTimeout(() => {
      props.updateFocus(false);
    }, BLUR_DELAY);
  }, []);
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && props.input) {
        props.updateAutocomplete([]);
        props.goTo(props.input);
      }
    },
    [props.input],
  );
  useEffect(() => {
    props.updateInput(props.path);
  }, [props.path]);
  return (
    <div className={cls.wrap}>
      <div className={cls.buttons}>
        <Button
          disabled={!props.canGoBack}
          onClick={props.goBack}
          shape="circle"
          icon="arrow-left"
        />
        <Button
          disabled={!props.canGoForward}
          onClick={props.goForward}
          shape="circle"
          icon="arrow-right"
        />
        <Button
          disabled={!props.canGoParent}
          onClick={props.goParent}
          shape="circle"
          icon="arrow-up"
        />
        <Button shape="circle" icon="reload" onClick={props.refresh} />
        <Button
          onClick={props.goHome}
          shape="circle"
          type="primary"
          icon="home"
        />
      </div>
      <div className={cls.inputWrap}>
        <Input
          onFocus={onFocus}
          onBlur={onBlur}
          prefix={<Icon type={props.input ? 'folder' : 'stop'} />}
          onKeyDown={onKeyDown}
          onChange={onChange}
          value={props.input}
        />
        {props.focused && !_.isEmpty(props.autocomplete) && (
          <Autocomplete
            autocomplete={props.autocomplete}
            updateAutocomplete={props.updateAutocomplete}
            goTo={props.goTo}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
