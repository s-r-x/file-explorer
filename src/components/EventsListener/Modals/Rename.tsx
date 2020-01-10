import React from 'react';
import {Modal, Input} from 'antd';
import ee, {IConfirmable} from '@/utils/ee';
import {EE_POLL_RENAME} from '@/constants/ee';

type State = {
  value: string;
  isOpen: boolean;
  confirmable: IConfirmable;
};

class RenameModal extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: '',
      isOpen: false,
      confirmable: null,
    };
  }
  componentDidMount() {
    ee.on(EE_POLL_RENAME, this.onEvent);
  }
  onEvent = (value: string, confirmable: IConfirmable) => {
    console.log(value);
    this.setState({
      confirmable,
      value,
      isOpen: true,
    });
  };
  resetState = () => {
    this.setState({
      isOpen: false,
      value: '',
      confirmable: null,
    });
  };
  onCancel = () => {
    this.state.confirmable.noAck();
    this.resetState();
  };
  onOk = () => {
    this.state.confirmable.ack(this.state.value);
    this.resetState();
  };
  onChange = (e: any) => {
    this.setState({value: e.target.value});
  };
  render() {
    return (
      <Modal
        onOk={this.onOk}
        onCancel={this.onCancel}
        visible={this.state.isOpen}>
        <Input onChange={this.onChange} value={this.state.value} />
      </Modal>
    );
  }
}
export default RenameModal;
