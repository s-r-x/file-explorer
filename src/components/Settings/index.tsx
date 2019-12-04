import React from 'react';
import {Menu, Checkbox, Radio, Button} from 'antd';
import {Props} from '@/containers/Settings/connector';

const Settings = (props: Props) => {
  return (
    <Menu mode="horizontal" selectable={false}>
      <Menu.SubMenu title="View">
        <Menu.Item>
          <Button icon="reload">Refresh</Button>
        </Menu.Item>
        <Menu.Item>
          <Checkbox
            checked={props.hidden}
            onChange={e => props.changeShowHidden(e.target.checked)}>
            Show hidden files
          </Checkbox>
        </Menu.Item>
        <Menu.SubMenu title="Arrange items">
          <Menu.ItemGroup title="Sort by">
            <Menu.Item>
              <Radio
                onChange={e => e.target.checked && props.changeSortBy('name')}
                checked={props.sortBy === 'name'}>
                Name
              </Radio>
            </Menu.Item>
            <Menu.Item>
              <Radio
                onChange={e => e.target.checked && props.changeSortBy('size')}
                checked={props.sortBy === 'size'}>
                Size
              </Radio>
            </Menu.Item>
            <Menu.Item>
              <Radio
                onChange={e =>
                  e.target.checked && props.changeSortBy('updated_at')
                }
                checked={props.sortBy === 'updated_at'}>
                Creation
              </Radio>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Sort type">
            <Menu.Item>
              <Radio
                onChange={e => e.target.checked && props.changeSortType('ASC')}
                checked={props.sortType === 'ASC'}>
                Ascending
              </Radio>
            </Menu.Item>
            <Menu.Item>
              <Radio
                onChange={e => e.target.checked && props.changeSortType('DESC')}
                checked={props.sortType === 'DESC'}>
                Descending
              </Radio>
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
        <Menu.Item>
          <Radio
            onChange={e => e.target.checked && props.changeViewMode('icons')}
            checked={props.mode === 'icons'}>
            Show as icons
          </Radio>
        </Menu.Item>
        <Menu.Item>
          <Radio
            onChange={e => e.target.checked && props.changeViewMode('list')}
            checked={props.mode === 'list'}>
            Show as list
          </Radio>
        </Menu.Item>
        <Menu.SubMenu title="Zoom">
          <Menu.Item>
            <Button onClick={props.incZoom} icon="zoom-in">
              Zoom in
            </Button>
          </Menu.Item>
          <Menu.Item>
            <Button onClick={props.decZoom} icon="zoom-out">
              Zoom out
            </Button>
          </Menu.Item>
          <Menu.Item>
            <Button onClick={props.resetZoom}>Actual size</Button>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu.SubMenu>
    </Menu>
  );
};

export default Settings;
