import React from "react";
import { Component } from "react";
import { Props } from "@/containers/Controls";
import { contextMenu } from "react-contexify";
import MassSelector from "./MassSelector";
import ee from "@/utils/ee";
import { createPortal } from "react-dom";

type Point = {
  x: number;
  y: number;
};
type State = {
  $container: HTMLElement | null;
  dblclick: number | null;
  multiselect: boolean;
  multiselectInitialCoords: Point | null;
  multiselectCoords: Point | null;
};
class MouseControls extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      $container: null,
      dblclick: null,
      multiselect: false,
      multiselectCoords: null,
      multiselectInitialCoords: null
    };
  }
  onFileClick = ($el: any) => {
    const index = $el.dataset.fileindex;
    const file = this.props.list[index];
    if (!file) return;
    const { dblclick } = this.state;
    if (dblclick && index === dblclick) {
      if (file.isFile) {
        this.props.openFile(file.path);
      } else if (file.isDir) {
        this.props.goTo(file.path);
      }
    } else {
      this.props.replaceSelection(file.path);
      this.setState({ dblclick: index });
      setTimeout(() => {
        this.setState({ dblclick: null });
      }, 250);
    }
  };
  getElemMeta = (e: any): { type: string; $el: any } => {
    let $el = e.target;
    let type;
    while ($el !== this.state.$container) {
      if ($el.matches("[data-fileindex]")) {
        type = "file";
        break;
      }
      $el = $el.parentNode;
    }
    return {
      $el,
      type
    };
  };
  onMouseMove = (event: any) => {
    if (!this.state.multiselect) {
      return;
    } else {
      const { left, top } = this.state.$container.getBoundingClientRect();
      this.setState({
        multiselectCoords: {
          x: event.clientX - left,
          y: event.clientY - top,
        }
      });
    }
  };
  onMouseDown = (event: any) => {
    if (event.which !== 1) {
      return;
    }
    const { type } = this.getElemMeta(event);
    if (type === undefined) {
      const { left, top } = this.state.$container.getBoundingClientRect();
      this.setState({
        multiselect: true,
        multiselectInitialCoords: {
          x: event.clientX - left,
          y: event.clientY - top,
        }
      });
    }
  };
  onMouseUp = (event: any) => {
    if (event.which !== 1) {
      return;
    }
    const { type } = this.getElemMeta(event);
    if (type === undefined) {
      this.setState({
        multiselect: false,
        multiselectInitialCoords: null,
        multiselectCoords: null
      });
      // TODO
    }
  };
  onClick = (event: any) => {
    const { type, $el } = this.getElemMeta(event);
    if (type === "file") {
      this.onFileClick($el);
    } else if (!type) {
      this.props.clearSelection();
    }
  };
  onRightClick = (event: any) => {
    const { type, $el } = this.getElemMeta(event);
    if (type === "file") {
      const file = this.props.list[$el.dataset.fileindex];
      if (!file) return;
      this.props.replaceSelection(file.path);
      contextMenu.show({
        id: "file_context_menu",
        event
      });
    } else {
      this.props.clearSelection();
      contextMenu.show({
        id: "file_context_menu",
        event
      });
    }
  };
  componentDidMount() {
    ee.on("mass_selector/container_created", ($container: HTMLElement) => {
      this.setState({ $container });
      $container.addEventListener("mousedown", this.onMouseDown);
      $container.addEventListener("mouseup", this.onMouseUp);
      $container.addEventListener("mousemove", this.onMouseMove);
      $container.addEventListener("click", this.onClick);
      $container.addEventListener("contextmenu", this.onRightClick);
    });
  }
  componentWillUnmount() {
    this.state.$container.removeEventListener("mousedown", this.onMouseDown);
    this.state.$container.removeEventListener("mouseup", this.onMouseUp);
    this.state.$container.removeEventListener("mousemove", this.onMouseMove);
    this.state.$container.removeEventListener("click", this.onClick);
    this.state.$container.removeEventListener("contextmenu", this.onRightClick);
  }
  render() {
    const {
      multiselectInitialCoords: initialCoords,
      multiselectCoords: coords,
      multiselect,
      $container
    } = this.state;
    if (!multiselect || !initialCoords || !coords || !$container) return null;
    return createPortal(
      <MassSelector
        list={this.props.list}
        replaceSelectionMany={this.props.replaceSelectionMany}
        x={coords.x}
        y={coords.y}
        initialX={initialCoords.x}
        initialY={initialCoords.y}
      />,
      $container
    );
  }
}

export default MouseControls;
