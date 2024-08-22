import { Component, Inject, Input, Optional } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ApiService } from './apis/api.service';
import { WireBreak } from './apis/api.dto';
import { CommonModule } from '@angular/common';
import { MessageSource, MessageType } from './model';

@Component({
  selector: 'wirebreak-list',
  standalone: true,
  imports: [CommonModule,RouterOutlet, ScrollingModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class WirebreakListComponent {
  title = 'wirebreak-viewer-app';
  selectedItem: WireBreak | null = null;

  wirebreaks: WireBreak[] = []

  constructor(private readonly apiService: ApiService, @Inject('MESSAGE_SERVICE') private messageService: any) {  
    this.apiService.getWirebreaks().subscribe(
      (wirebreaksData) => {
        this.wirebreaks = wirebreaksData.items.filter(x => x.typeKey == 'WIRE-c');
      }
    );

    throw new Error('Error in WirebreakListComponent');
  }

  onItemClick(selectedItem: WireBreak): void {
    this.selectedItem = selectedItem;
    this.messageService?.publish({
      messageType: MessageType.SelectAWirebreak,
      payload: selectedItem,
      source: MessageSource.WirebreakViewer
    })
  }
}
