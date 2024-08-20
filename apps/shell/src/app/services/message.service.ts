import { Injectable, Provider } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Message } from '../model';



@Injectable()
export class MessageService {
  private _messages: Message[] = [];
  private _message$ = new ReplaySubject<Message>(1);
  readonly message$ = this._message$.asObservable();

  publish(message: Message): void {
    const publishedMessage = structuredClone(message);
    publishedMessage.publishedAt = new Date();
    this._messages.push(publishedMessage);
    this._message$.next(publishedMessage);
  }
}

export function provideMessageService(): Provider  {
  return {
    provide: 'MESSAGE_SERVICE',
    useClass: MessageService
  }
}