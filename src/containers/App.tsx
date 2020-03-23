import "@/styles/index.less";
import * as React from "react";
import Settings from "./Settings";
import SearchBar from "./SearchBar";
import Files from "./Files";
import Controls from "./Controls";
import ContextMenu from "./ContextMenu";
import FSWatcher from "./FSWatcher";
import EventsListener from "@/components/EventsListener";
import BottomStats from "./BottomStats";
import Aside from "./Aside";
import { Layout } from "antd";

const App = () => (
  <>
    <ContextMenu />
    <Controls />
    <Settings />
    <FSWatcher />
    <EventsListener />
    <Layout style={{ flex: 1 }}>
      <Aside />
      <Layout>
        <SearchBar />
        <Files />
        <BottomStats />
      </Layout>
    </Layout>
  </>
);

export default App;
