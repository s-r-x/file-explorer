import React from 'react';
import cls from './index.less';
import {Input, Button} from 'antd';

const SearchBar = () => {
  return (
    <div className={cls.wrap}>
      <div className={cls.buttons}>
        <Button shape="circle" icon="arrow-left"/>
        <Button shape="circle" icon="arrow-right"/>
        <Button shape="circle" icon="arrow-up"/>
        <Button shape="circle" icon="reload"/>
        <Button shape="circle" type="primary" icon="home"/>
      </div>
      <div className={cls.inputWrap}>
        <Input />
      </div>
    </div>
  );
};

export default SearchBar;
