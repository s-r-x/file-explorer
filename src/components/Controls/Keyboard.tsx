import {Component} from 'react';
import hotkeys from 'hotkeys-js';
import {Props} from '@/containers/Controls';

class KeyboardControls extends Component<Props> {
  componentDidMount() {
    hotkeys('delete', this.onDelete);
    hotkeys('right', this.onRight);
    hotkeys('left', this.onLeft);
    hotkeys('up', this.onUp);
    hotkeys('down', this.onDown);
  }
  onDown = () => {
    this.props.moveSelectionBottom();
  };
  onUp = () => {
    this.props.moveSelectionTop();
  };
  onRight = () => {
    this.props.moveSelectionRight();
  };
  onLeft = () => {
    this.props.moveSelectionLeft();
  };
  onDelete = () => {
    this.props.removeFiles(true);
  };
  render(): null {
    return null;
  }
}

export default KeyboardControls;
