import {PureComponent} from 'react';
import {Props} from '@/containers/Controls';

type State = {
  $container: HTMLElement | null;
  dblclick: number | null;
};
class MouseControls extends PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      $container: null,
      dblclick: null,
    };
  }
  onFileClick = ($el: any) => {
    const index = $el.dataset.fileindex;
    const file = this.props.list[index];
    if (!file) return;
    const {dblclick} = this.state;
    if (dblclick && index === dblclick) {
      if (file.isFile) {
        this.props.openFile(file.path);
      } else if (file.isDir) {
        this.props.goTo(file.path);
      }
    } else {
      this.props.addToSelection(file.path);
      this.setState({dblclick: index});
      setTimeout(() => {
        this.setState({dblclick: null});
      }, 250);
    }
  };
  onClick = (e: any) => {
    const {$container} = this.state;
    let $el = e.target;
    let gotIndex = false;
    while ($el !== $container) {
      if ($el.matches('[data-fileindex]')) {
        this.onFileClick($el);
        gotIndex = true;
        break;
      }
      $el = $el.parentNode;
    }
    if (!gotIndex) {
      this.props.clearSelection();
    }
  };
  componentDidMount() {
    const $container = document.getElementById('files');
    this.setState({$container});
    $container.addEventListener('click', this.onClick);
  }
  componentWillUnmount() {
    this.state.$container.removeEventListener('click', this.onClick);
  }
  render(): null {
    return null;
  }
}

export default MouseControls;
