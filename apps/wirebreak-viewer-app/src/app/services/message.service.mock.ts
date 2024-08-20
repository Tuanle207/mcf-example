import { Injectable, Provider } from '@angular/core';
import { Message } from '../model';

@Injectable()
export class MockMessageService {
  publish(message: Message): void {
    console.log('MockMessageService: ', message);
  }
}

export function provideMessageService(): Provider {
  return {
    provide: 'MESSAGE_SERVICE',
    useClass: MockMessageService,
  };
}
