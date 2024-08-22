import { Component, OnInit } from '@angular/core';
import { RemoteComponentRendererDirective } from './remote-component-renderer.directive';
import { ErrorBoundaryComponent } from './component/error-boundary/error-boundary.component';

@Component({
  standalone: true,
  imports: [RemoteComponentRendererDirective, ErrorBoundaryComponent],
  selector: 'report-view',
  template: `
    <div class="map-container">
      <error-boundary [content]="mapContentTpl">
        <ng-template #mapContentTpl>
          <ng-container
            *remoteComponentRenderer="
              'MapViewComponent';
              module: 'map_viewer_app/MapViewComponent'
            "
          ></ng-container>
        </ng-template>
      </error-boundary>
    </div>

    <div class="wirebreak-container">
      <error-boundary [content]="wirebreakTpl">
        <ng-template #wirebreakTpl>
          <ng-container
            *remoteComponentRenderer="
              'WirebreakListComponent';
              module: 'wirebreak_viewer_app/WirebreakListComponent'
            "
          ></ng-container>
        </ng-template>
      </error-boundary>
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
