import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';


export enum MessageType
{
  SelectAWirebreak = 'SelectAWirebreak'
}

export enum MessageSource {
  WirebreakViewer = 'WirebreakViewer',
  MapViewer = 'MapViewer'
}


export interface Message<T = any> {
  messageType: MessageType;
  payload?: T;
  source?: MessageSource;
  publishedAt?: Date
}


@Injectable({
  providedIn: 'root'
})
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