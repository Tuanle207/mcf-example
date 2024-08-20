import { Injectable, Provider } from '@angular/core';
import { Message } from '../model';
import { of } from 'rxjs';

@Injectable()
export class MockMessageService {
  message$ = of();

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
