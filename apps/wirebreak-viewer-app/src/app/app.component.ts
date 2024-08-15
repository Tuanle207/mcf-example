import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ApiService } from './apis/api.service';
import { WireBreak } from './apis/api.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, ScrollingModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class WirebreakListComponent {
  title = 'wirebreak-viewer-app';
  selectedItem: WireBreak | null = null;

  wirebreaks: WireBreak[] = []

  constructor(private readonly apiService: ApiService) {
    this.apiService.getWirebreaks().subscribe(
      (wirebreaksData) => {
        this.wirebreaks = wirebreaksData.items.filter(x => x.typeKey == 'WIRE-c');
      }
    );
  }
}
