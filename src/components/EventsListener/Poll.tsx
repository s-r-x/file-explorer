import React from 'react';
import {Modal, Form, Input} from 'antd';
import ee, {IConfirmable, IPollPayload} from '@/utils/ee';
import {EE_POLL} from '@/constants/ee';

type State = {
  okText: string;
  label: string;
  title: string;
  value: string;
  isOpen: boolean;
  confirmable: IConfirmable;
};

class PollListener extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      okText: '',
      title: '',
      label: '',
      value: '',
      isOpen: false,
      confirmable: null,
    };
  }
  componentDidMount() {
    ee.on(EE_POLL, this.onEvent);
  }
  onEvent = (payload: IPollPayload, confirmable: IConfirmable) => {
    this.setState({
      okText: payload.okText,
      title: payload.title,
      label: payload.label,
      confirmable,
      value: payload.input,
      isOpen: true,
    });
  };
  resetState = () => {
    this.setState({
      isOpen: false,
      value: '',
      okText: '',
      label: '',
      title: '',
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
        title={state.title}
        onOk={this.onOk}
        okText={state.okText}
        onCancel={this.onCancel}
        visible={state.isOpen}>
        <Form layout="vertical" onSubmit={this.onSubmit}>
          <Form.Item label={state.label}>
            <Input required onChange={this.onChange} value={state.value} />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
export default PollListener;
