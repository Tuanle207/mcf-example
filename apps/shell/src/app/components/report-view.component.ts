import { Component, OnInit } from '@angular/core';
import { RemoteComponentRendererDirective } from '../remote-component-renderer.directive';

@Component({
  selector: 'report-view',
  template: `
    <div class="map-container">
      <ng-container
        *remoteComponentRenderer="
          'MapViewComponent';
          module: 'map_viewer_app/MapViewComponent'
        "
      ></ng-container>
    </div>

    <div class="wirebreak-container">
      <ng-container
        *remoteComponentRenderer="
          'WirebreakListComponent';
          module: 'wirebreak_viewer_app/WirebreakListComponent'
        "
      ></ng-container>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }

      .map-container {
        display: block;
        width: calc(100% - 32px);
        height: calc(100% - 32px);
        border: 2px dashed skyblue;
        overflow: hidden;
        margin: 16px;
      }

      .wirebreak-container {
        display: block;
        position: absolute;
        z-index: 10000;
        width: 30%;
        height: 50%;
        padding: 8px;
        transform: translateY(-50%);
        top: 50%;
        left: 100px;
        background: white;
        border: 2px dashed slateblue;
      }
    `,
  ],
})
export class ReportViewComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
