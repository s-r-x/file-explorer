import {Component} from 'react';
import {Props} from '@/containers/Controls';
import {contextMenu} from 'react-contexify';

type State = {
  $container: HTMLElement | null;
  dblclick: number | null;
};
class MouseControls extends Component<Props, State> {
  constructor(props: Props) {
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
      this.props.replaceSelection(file.path);
      this.setState({dblclick: index});
      setTimeout(() => {
        this.setState({dblclick: null});
      }, 250);
    }
  };
  getElemMeta = (e: any): {type: string; $el: any} => {
    let $el = e.target;
    let type;
    while ($el !== this.state.$container) {
      if ($el.matches('[data-fileindex]')) {
        type = 'file';
        break;
      }
      $el = $el.parentNode;
    }
    return {
      $el,
      type,
    };
  };
  onClick = (event: any) => {
    const {type, $el} = this.getElemMeta(event);
    if (type === 'file') {
      this.onFileClick($el);
    } else if (!type) {
      this.props.clearSelection();
    }
  };
  onRightClick = (event: any) => {
    const {type, $el} = this.getElemMeta(event);
    if (type === 'file') {
      const file = this.props.list[$el.dataset.fileindex];
      if (!file) return;
      this.props.replaceSelection(file.path);
      contextMenu.show({
        id: 'file_context_menu',
        event,
      });
    } else {
      this.props.clearSelection();
      contextMenu.show({
        id: 'file_context_menu',
        event,
      });
    }
  };
  componentDidMount() {
    const $container = document.getElementById('files');
    this.setState({$container});
    $container.addEventListener('click', this.onClick);
    $container.addEventListener('contextmenu', this.onRightClick);
  }
  componentWillUnmount() {
    this.state.$container.removeEventListener('click', this.onClick);
    this.state.$container.removeEventListener('contextmenu', this.onRightClick);
  }
  render(): null {
    return null;
  }
}

export default MouseControls;
