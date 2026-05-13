import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../model';

@Injectable({
  providedIn: 'root',
})
export class PostMessageBridgeService implements OnDestroy {
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

  sendToIframe(iframeElement: HTMLIFrameElement, message: Message): void {
    iframeElement.contentWindow?.postMessage(message, '*');
  }
}
