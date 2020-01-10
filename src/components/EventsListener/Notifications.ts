import React from 'react';
import {message} from 'antd';
import ee from '@/utils/ee';
import {EE_NOTIFICATION} from '@/constants/ee';
import {INotificationPayload} from '@/utils/ee';

class Notifications extends React.Component {
  componentDidMount() {
    ee.on(EE_NOTIFICATION, this.onEvent);
  }
  onEvent(data: INotificationPayload) {
    message[data.type](data.content);
  }
  render(): null {
    return null;
  }
}

export default Notifications;
