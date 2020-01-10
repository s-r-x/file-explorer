import React from 'react';
import ee from '@/utils/ee';
import {EE_REPLACE_FILE_CONFIRM} from '@/constants/ee';
import {Modal} from 'antd';

const {confirm} = Modal;
class EventsListener extends React.Component {
  componentDidMount() {
    ee.on(EE_REPLACE_FILE_CONFIRM, this.onReplaceConfirm);
  }
  onReplaceConfirm(filePath: string) {
    confirm({
      title: 'Confirm to replace files',
      content: `This folder already contains ${filePath}. Replace it?`,
      onOk() {
        ee.ack(EE_REPLACE_FILE_CONFIRM, true);
      },
      onCancel() {
        ee.ack(EE_REPLACE_FILE_CONFIRM, false);
      },
    });
  }
  render(): null {
    return null;
  }
}

export default EventsListener;
