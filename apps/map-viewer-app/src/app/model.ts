
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
