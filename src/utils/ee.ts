import EventEmitter from 'events';
import {EE_CONFIRM, EE_NOTIFICATION} from '@/constants/ee';
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
  ack(): void;
  noAck(): void;
}
class Confirm {
  constructor(private ee: EventEmitter, private event: string) {}
  ack() {
    this.ee.emit(this.event, true);
  }
  noAck() {
    this.ee.emit(this.event, false);
  }
}
class Emitter extends EventEmitter {
  confirm(payload: IConfirmPayload): Promise<boolean> {
    const uniqEvent = EE_CONFIRM + generateId();
    const confirmable = new Confirm(this, uniqEvent);
    this.emit(EE_CONFIRM, payload, confirmable);
    return new Promise(resolve => {
      this.once(uniqEvent, (response: boolean) => {
        resolve(response);
      });
    });
  }
  notify(payload: INotificationPayload) {
    this.emit(EE_NOTIFICATION, payload);
  }
}
const ee = new Emitter();
export default ee;
