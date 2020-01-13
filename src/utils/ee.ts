import EventEmitter from 'events';
import {EE_CONFIRM, EE_NOTIFICATION, EE_POLL} from '@/constants/ee';
import {generateId} from '@/utils';

export interface INotificationPayload {
  type: 'success' | 'error' | 'warning';
  content: string;
}
export interface IConfirmPayload {
  title: string;
  content: string;
}

export interface IConfirmable {
  ack(payload?: any): void;
  noAck(payload?: any): void;
}
export interface IPollPayload {
  title: string;
  okText: string;
  label: string;
  input: string;
}
class Confirm {
  constructor(private ee: EventEmitter, private event: string) {}
  ack(payload?: any) {
    this.ee.emit(this.event, typeof payload !== 'undefined' ? payload : true);
  }
  noAck() {
    this.ee.emit(this.event, false);
  }
}
class Emitter extends EventEmitter {
  private waitForResponse(event: string, payload: any) {
    const uniqEvent = event + generateId();
    const confirmable = new Confirm(this, uniqEvent);
    this.emit(event, payload, confirmable);
    return new Promise(resolve => {
      this.once(uniqEvent, (response: any) => {
        resolve(response);
      });
    });
  }
  confirm(payload: IConfirmPayload): Promise<boolean> {
    return this.waitForResponse(EE_CONFIRM, payload) as Promise<boolean>;
  }
  notify(payload: INotificationPayload) {
    this.emit(EE_NOTIFICATION, payload);
  }

  poll(payload: IPollPayload): Promise<any> {
    return this.waitForResponse(EE_POLL, payload);
  }
}
const ee = new Emitter();
export default ee;
