import React from 'react';
import ee from '@/utils/ee';
import {EE_CONFIRM} from '@/constants/ee';
import {Modal} from 'antd';
import {IConfirmable, IConfirmPayload} from '@/utils/ee';

const {confirm} = Modal;
class ConfirmListener extends React.Component {
  componentDidMount() {
    ee.on(EE_CONFIRM, this.onReplaceConfirm);
  }
  onReplaceConfirm(payload: IConfirmPayload, confirmable: IConfirmable) {
    confirm({
      title: payload.title,
      content: payload.content,
      onOk() {
        confirmable.ack();
      },
      onCancel() {
        confirmable.noAck();
      },
    });
  }
  render(): null {
    return null;
  }
}

export default ConfirmListener;
