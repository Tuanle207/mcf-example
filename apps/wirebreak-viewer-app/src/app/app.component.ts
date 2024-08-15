import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ApiService } from './apis/api.service';
import { WireBreak } from './apis/api.dto';
import { CommonModule } from '@angular/common';
import { MessageService, MessageSource, MessageType } from './services/message.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, ScrollingModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  selectedItem: WireBreak | null = null;

  wirebreaks: WireBreak[] = []

  constructor(private readonly apiService: ApiService, private messageService: MessageService) {
    this.apiService.getWirebreaks().subscribe(
      (wirebreaksData) => {
        this.wirebreaks = wirebreaksData.items.filter(x => x.typeKey == 'WIRE-c');
      }
    );

    messageService.message$.subscribe((message) => {
      console.log('Received message:', message);
    })
  }

  onItemClick(selectedItem: WireBreak): void {
    this.selectedItem = selectedItem;
    this.messageService.publish({
      messageType: MessageType.SelectAWirebreak,
      payload: selectedItem,
      source: MessageSource.WirebreakViewer
    })
  }
}
