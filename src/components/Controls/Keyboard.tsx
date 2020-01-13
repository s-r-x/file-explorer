import {Component} from 'react';
import hotkeys from 'hotkeys-js';
import {Props} from '@/containers/Controls';

class KeyboardControls extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {
    hotkeys('delete', this.onDelete);
  }
  onDelete = () => {
    this.props.removeFiles(true);
  };
  render(): null {
    return null;
  }
}

export default KeyboardControls;
