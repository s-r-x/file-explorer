import '@/styles/index.less';
import * as React from 'react';
import Settings from './Settings';
import SearchBar from './SearchBar';
import Files from './Files';
import Controls from './Controls';
import ContextMenu from './ContextMenu';

const App = () => (
  <>
    <ContextMenu />
    <Controls />
    <Settings />
    <SearchBar />
    <Files />
  </>
);

export default App;
