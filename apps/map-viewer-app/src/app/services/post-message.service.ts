import { Injectable, OnDestroy, Provider } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../model';

@Injectable()
export class PostMessageService implements OnDestroy {
  private readonly messageSource = new Subject<Message>();
  readonly message$ = this.messageSource.asObservable();

  private readonly messageHandler = (event: MessageEvent) => {
    if (event.data && event.data.messageType) {
      this.messageSource.next(event.data as Message);
    }
  };

  constructor() {
    window.addEventListener('message', this.messageHandler);
  }

  ngOnDestroy(): void {
    window.removeEventListener('message', this.messageHandler);
    this.messageSource.complete();
  }

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
