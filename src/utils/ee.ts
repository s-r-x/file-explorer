import EventEmitter from 'events';
import {EE_REPLACE_FILE_CONFIRM, EventEmitterEvent} from '@/constants/ee';

class Emitter extends EventEmitter {
  private process(event: EventEmitterEvent, args: any): Promise<any> {
    this.emit(event, args);
    // TODO handle error, topics etc.
    return new Promise(resolve => {
      const listener = (response: any) => {
        resolve(response);
      };
      this.once(`${event}__ack`, listener);
    });
  }
  ack(event: EventEmitterEvent, args: any) {
    this.emit(`${event}__ack`, args);
  }
  processFileReplaceConfirm(filePath: string): Promise<boolean> {
    return this.process(EE_REPLACE_FILE_CONFIRM, filePath);
  }
}
const ee = new Emitter();
export default ee;
