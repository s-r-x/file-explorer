import '@/styles/index.less';
import * as React from 'react';
import Settings from './Settings';
import SearchBar from './SearchBar';
import Files from './Files';
import Controls from './Controls';
import ContextMenu from './ContextMenu';
import FSWatcher from './FSWatcher';
import EventsListener from '@/components/EventsListener';

const App = () => (
  <>
    <ContextMenu />
    <Controls />
    <Settings />
    <SearchBar />
    <Files />
    <FSWatcher />
    <EventsListener />
  </>
);

export default App;
