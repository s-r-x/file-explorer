import React from 'react';
import {Props} from '@/containers/FSWatcher';
import chokidar, {FSWatcher as WatcherType} from 'chokidar';

type State = {
  watcher: WatcherType;
};
const watcherConfig = {
  depth: 0,
  ignoreInitial: true,
  disableGlobbing: true,
};
class FSWatcher extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {watcher: null};
    this.addListener = this.addListener.bind(this);
    this.removeListener = this.removeListener.bind(this);
  }
  async addListener(path: string) {
    const excerpt = await this.props.getFileStats(path);
    this.props.addToList(excerpt);
  }
  removeListener(path: string) {
    if(path in this.props.selected) {
      this.props.removeFromSelection(path);
    }
    this.props.removeFromList(path);
  }
  async initWatcher() {
    const {watcher: oldWatcher} = this.state;
    if (oldWatcher) {
      await oldWatcher.close();
    }
    const watcher = chokidar.watch(this.props.path, watcherConfig);
    watcher
      .on('add', this.addListener)
      .on('addDir', this.addListener)
      .on('unlink', this.removeListener)
      .on('unlinkDir', this.removeListener);
    this.setState({watcher});
  }
  componentDidMount() {
    this.initWatcher();
  }
  async componentDidUpdate(prevProps: Props) {
    if (prevProps.path !== this.props.path) {
      this.initWatcher();
    }
  }
  componentWillUnmount() {
    this.state.watcher.close();
  }
  render(): null {
    return null;
  }
}

export default FSWatcher;
