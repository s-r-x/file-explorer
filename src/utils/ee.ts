import EventEmitter from 'events';
import {EE_REPLACE_FILE_CONFIRM, EventEmitterEvent} from '@/constants/ee';
import {generateId} from '@/utils';

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
  private confirm(event: EventEmitterEvent, args: any): Promise<boolean> {
    const uniqEvent = event + generateId();
    const confirmable = new Confirm(this, uniqEvent);
    this.emit(event, args, confirmable);
    return new Promise(resolve => {
      this.once(uniqEvent, (response: boolean) => {
        resolve(response);
      });
    });
  }
  confirmFileReplace(filePath: string) {
    return this.confirm(EE_REPLACE_FILE_CONFIRM, filePath);
  }
}
const ee = new Emitter();
export default ee;
