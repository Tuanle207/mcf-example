import { Injectable, Provider } from '@angular/core';
import { Message } from '../model';

@Injectable()
export class PostMessageService {
  publish(message: Message): void {
    window.parent.postMessage(message, '*');
  }
}

export function provideMessageService(): Provider {
  return {
    provide: 'MESSAGE_SERVICE',
    useClass: PostMessageService,
  };
}
