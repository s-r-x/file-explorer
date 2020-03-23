import React, { useState, useCallback } from "react";
import { Layout, Menu } from "antd";
import { Props } from "@/containers/Aside/connector";
import { SelectParam } from "antd/es/menu";

const Aside = ({ platformFolders, currentPath, goTo }: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const onSelect = useCallback(
    (param: SelectParam) => {
      goTo(param.key);
    },
    [goTo]
  );
  return (
    <Layout.Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      <Menu
        selectedKeys={[currentPath]}
        onSelect={onSelect}
        selectable
        multiple={false}
        theme="dark"
        defaultSelectedKeys={[platformFolders.home]}
        mode="inline"
      >
        <Menu.Item key={platformFolders.home}>
          <span>Home</span>
        </Menu.Item>
        <Menu.Item key={platformFolders.desktop}>
          <span>Desktop</span>
        </Menu.Item>
        <Menu.Item key={platformFolders.music}>
          <span>Music</span>
        </Menu.Item>
        <Menu.Item key={platformFolders.pictures}>
          <span>Pictures</span>
        </Menu.Item>
        <Menu.Item key={platformFolders.videos}>
          <span>Videos</span>
        </Menu.Item>
        <Menu.Item key={platformFolders.downloads}>
          <span>Downloads</span>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};

export default Aside;
