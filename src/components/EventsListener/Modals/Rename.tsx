import React from 'react';
import {Modal, Form, Input} from 'antd';
import ee, {IConfirmable} from '@/utils/ee';
import {EE_POLL_RENAME} from '@/constants/ee';

type State = {
  initialValue: string;
  value: string;
  isOpen: boolean;
  confirmable: IConfirmable;
};

class RenameModal extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      initialValue: '',
      value: '',
      isOpen: false,
      confirmable: null,
    };
  }
  componentDidMount() {
    ee.on(EE_POLL_RENAME, this.onEvent);
  }
  onEvent = (value: string, confirmable: IConfirmable) => {
    this.setState({
      initialValue: value,
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
  onSubmit = (e: any) => {
    e.preventDefault();
    this.onOk();
  };
  render() {
    const {state} = this;
    return (
      <Modal
        title={`Rename "${state.initialValue}"`}
        onOk={this.onOk}
        okText="Rename"
        onCancel={this.onCancel}
        visible={state.isOpen}>
        <Form layout="vertical" onSubmit={this.onSubmit}>
          <Form.Item label="Enter the new name:">
            <Input required onChange={this.onChange} value={state.value} />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
export default RenameModal;
